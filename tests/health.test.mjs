import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';import test from 'node:test';import ts from 'typescript';
test('health returns readiness without logging request credentials or query strings',async t=>{
 const directory=path.resolve('tests/.compiled-health');fs.mkdirSync(directory,{recursive:true});t.after(()=>fs.rmSync(directory,{recursive:true,force:true}));
 const source=fs.readFileSync('app/api/health/route.ts','utf8'),code=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replaceAll('"next/server"','"next/server.js"');
 const file=path.join(directory,'health.mjs');fs.writeFileSync(file,code);const {GET}=await import(pathToFileURL(file));
 const messages=[],log=console.log;console.log=(...args)=>messages.push(args);let response;
 try{response=await GET(new Request('http://127.0.0.1/api/health?synthetic=should-not-be-logged',{headers:{authorization:'Bearer synthetic-test-value',cookie:'synthetic-cookie=value'}}));}finally{console.log=log;}
 assert.equal(response.status,200);assert.deepEqual(await response.json(),{status:'ok',message:'App is up and running'});assert.equal(messages.length,0,'health must not log any request contents');
});
