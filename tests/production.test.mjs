import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import http from 'node:http';
import {setTimeout as delay} from 'node:timers/promises';
import {test} from 'node:test';

test('the production server serves all pages, exact original PDFs, assets, health and portrait optimization', {timeout: 120000}, async t => {
  assert.ok(existsSync('.next/BUILD_ID'), 'production build exists');
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '4328'], {
    env: {PATH: process.env.PATH, HOME: '/tmp', NODE_ENV: 'production', NEXT_TELEMETRY_DISABLED: '1', HOSTNAME: '127.0.0.1', PORT: '4328'},
    stdio: 'ignore',
  });
  const closed = once(server, 'close');
  t.after(async () => {
    server.kill('SIGTERM');
    const timer = setTimeout(() => server.kill('SIGKILL'), 3000);
    try {await closed;} finally {clearTimeout(timer);}
  });
  function get(url, maxBytes = 2 * 1024 * 1024) {
    assert.ok(maxBytes <= 12500000);
    assert.ok(url.startsWith('/') && !url.startsWith('//') && !/[\r\n]/.test(url));
    return new Promise((resolve, reject) => {
      const request = http.get({hostname: '127.0.0.1', port: 4328, path: url, timeout: 3000}, response => {
        const parts = []; let size = 0;
        response.on('data', chunk => {size += chunk.length; if (size > maxBytes) response.destroy(Error('Response exceeds test budget')); else parts.push(chunk);});
        response.on('end', () => resolve({status: response.statusCode, headers: response.headers, bytes: Buffer.concat(parts)}));
        response.on('error', reject);
      });
      request.on('timeout', () => request.destroy(Error('Loopback request timed out')));
      request.on('error', reject);
    });
  }
  let home;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw Error('Production server exited before readiness');
    try {home = await get('/'); break;} catch {await delay(100);}
  }
  assert.equal(home?.status, 200);
  const html = home.bytes.toString();
  assert.match(html, /<h1\b/);
  const health = await get('/api/health');
  assert.equal(health.status, 200);assert.match(health.headers['content-type'], /application\/json/);
  assert.deepEqual(JSON.parse(health.bytes), {status:'ok', message:'App is up and running'});
  assert.equal(home.headers['x-powered-by'], undefined);
  const assets = new Set([...html.matchAll(/(?:src|href)="([^"<>]+)"/g)].map(match => match[1].replaceAll('&amp;', '&')).filter(url => url.startsWith('/_next/')));
  assert.ok(assets.size >= 3, 'production page references bundled scripts and styles');
  for (const asset of assets) {
    const response = await get(asset);
    assert.equal(response.status, 200, 'bundled asset is served');
    assert.ok(response.bytes.length > 0);
    assert.doesNotMatch(response.headers['content-type'] || '', /text\/html/);
  }
  const assetsManifest=JSON.parse(readFileSync('tests/public-assets.json','utf8'));
  const documents=assetsManifest.filter(asset=>asset.path.endsWith('.pdf'));assert.equal(documents.length,10);
  for(const document of documents){
    const response=await get(encodeURI(document.path.slice(6)),4000000);
    assert.equal(response.status,200,'original PDF is served');assert.match(response.headers['content-type'],/application\/pdf/);
    assert.equal(response.bytes.length,document.bytes);assert.equal(createHash('sha256').update(response.bytes).digest('hex'),document.sha256,'served PDF byte identity');
  }
  for(const route of ['/certifications','/codingprojects','/otherprojects']){
    const page=await get(route);assert.equal(page.status,200);assert.match(page.headers['content-type'],/text\/html/);assert.ok(page.bytes.includes(Buffer.from('<main')));
    const localReferences=[...page.bytes.toString().matchAll(/(?:src|href)="([^"<>]+)"/g)].map(match=>match[1].replaceAll('&amp;','&')).filter(url=>url.startsWith('/_next/')||url.startsWith('/files/'));
    assert.ok(localReferences.length>2&&localReferences.length<100);
    for(const reference of new Set(localReferences)){const response=await get(reference,4000000);assert.equal(response.status,200,'route asset is served');assert.ok(response.bytes.length>0);}
  }
  const portrait=assetsManifest.find(asset=>asset.path==='public/files/portrait.jpg'),served=await get('/files/portrait.jpg',4000000);
  assert.equal(served.status,200);assert.equal(createHash('sha256').update(served.bytes).digest('hex'),portrait.sha256);
  const optimized=await get('/_next/image?url='+encodeURIComponent('/files/portrait.jpg')+'&w=640&q=75');
  assert.equal(optimized.status,200);assert.match(optimized.headers['content-type'],/image\/(?:jpeg|webp|avif)/);assert.ok(optimized.bytes.length>0);
  assert.equal((await get('/maintenance-missing-route')).status, 404);
});
