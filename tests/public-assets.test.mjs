import assert from 'node:assert/strict';import test from 'node:test';import fs from 'node:fs';import {createHash} from 'node:crypto';
test('every original document and public image keeps its exact bytes and Git blob',()=>{
 const assets=JSON.parse(fs.readFileSync('tests/public-assets.json'));assert.equal(assets.length,73);assert.equal(assets.filter(f=>f.path.endsWith('.pdf')).length,10);
 for(const asset of assets){assert.match(asset.path,/^public\/[A-Za-z0-9_./-]+$/);const bytes=fs.readFileSync(asset.path);assert.equal(bytes.length,asset.bytes,'public asset byte count');assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,'public asset SHA-256');assert.equal(createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex'),asset.gitBlob,'public asset Git blob');}
});
