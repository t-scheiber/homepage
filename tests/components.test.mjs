import assert from 'node:assert/strict';import test from 'node:test';import fs from 'node:fs';
import {applicationModule,render} from './component-harness.mjs';
const {default:Home}=await applicationModule('app/page.tsx');
const {default:PDFViewer}=await applicationModule('components/PDFViewer.tsx');
const {default:TileLink}=await applicationModule('components/TileLink.tsx');
const {default:CertificatesList}=await applicationModule('components/CertificatesList.tsx');
test('home opens its existing CV, offers exact local download and closes by Escape or backdrop',async t=>{
 const view=await render(t,Home);assert.equal(view.container.querySelectorAll('h1').length,1);assert.equal(view.container.querySelector('[role="dialog"]'),null);
 const opener=view.container.querySelector('button[aria-label*="CV"]');assert.ok(opener,'existing CV button');await view.click(opener);
 let dialog=view.container.querySelector('[role="dialog"]');assert.ok(dialog);assert.equal(dialog.getAttribute('aria-modal'),'true');assert.equal(view.document.body.style.overflow,'hidden');
 const download=dialog.querySelector('a[download]'),url=download.getAttribute('href');assert.ok(url.startsWith('/files/pdf/'));assert.ok(fs.existsSync('public'+url));assert.equal(dialog.querySelector('iframe').getAttribute('src'),url+'#view=FitH');
 await view.key('Escape');assert.equal(view.container.querySelector('[role="dialog"]'),null);assert.equal(view.document.body.style.overflow,'');
 await view.click(opener);dialog=view.container.querySelector('[role="dialog"]');await view.click(dialog);assert.equal(view.container.querySelector('[role="dialog"]'),null);
});
test('PDF viewer retains the document on inner clicks and closes only through its close control',async t=>{
 let closes=0;const view=await render(t,PDFViewer,{pdfUrl:'/files/pdf/fixture.pdf',fileName:'fixture.pdf',isOpen:true,onClose:()=>closes++});
 await view.click(view.container.querySelector('h2'));assert.equal(closes,0);await view.key('Enter');assert.equal(closes,0);await view.click(view.container.querySelector('button[aria-label="Close PDF viewer"]'));assert.equal(closes,1);
 await view.update({pdfUrl:'/files/pdf/fixture.pdf',isOpen:false,onClose:()=>closes++});assert.equal(view.container.childElementCount,0);await view.key('Escape');assert.equal(closes,1);
});
test('tile links preserve internal navigation, external isolation and direct downloads',async t=>{
 const common={label:'Fixture',imageSrc:'/files/fixture.png',imageAlt:'Fixture image',imageWidth:40,imageHeight:40};
 const view=await render(t,TileLink,{...common,href:'/certifications'});let link=view.container.querySelector('a');assert.equal(link.getAttribute('href'),'/certifications');assert.equal(link.getAttribute('target'),null);
 await view.update({...common,href:'https://example.invalid/',external:true});link=view.container.querySelector('a');assert.equal(link.getAttribute('target'),'_blank');assert.match(link.getAttribute('rel'),/noopener/);assert.match(link.getAttribute('rel'),/noreferrer/);
 await view.update({...common,href:'/files/pdf/fixture.pdf',download:'fixture.pdf'});link=view.container.querySelector('a');assert.equal(link.getAttribute('href'),'/files/pdf/fixture.pdf');assert.equal(link.getAttribute('download'),'fixture.pdf');
});
test('all existing certificate links point to preserved local PDFs',async t=>{
 const view=await render(t,CertificatesList),links=[...view.container.querySelectorAll('a')];assert.equal(links.length,10);
 for(const link of links){const href=link.getAttribute('href');assert.match(href,/^\/files\/pdf\/[A-Za-z0-9_-]+\.pdf$/);assert.ok(fs.existsSync('public'+href));assert.equal(link.getAttribute('target'),'_blank');assert.match(link.getAttribute('rel'),/noopener/);}
});
