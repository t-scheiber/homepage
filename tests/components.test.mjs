import assert from 'node:assert/strict';import test from 'node:test';import fs from 'node:fs';
import {applicationModule,render} from './component-harness.mjs';
const {default:Home}=await applicationModule('app/page.tsx');
const {default:PDFViewer}=await applicationModule('components/PDFViewer.tsx');
const {default:TileLink}=await applicationModule('components/TileLink.tsx');
const {default:CertificatesList}=await applicationModule('components/CertificatesList.tsx');
test('home opens its existing CV, offers exact local download and closes by Escape or backdrop',async t=>{
 const view=await render(t,Home);assert.equal(view.container.querySelectorAll('h1').length,1);assert.equal(view.document.querySelector('[role="dialog"]'),null);
 const opener=view.container.querySelector('button[aria-label*="CV"]');assert.ok(opener,'existing CV button');opener.focus();await view.click(opener);
 let dialog=view.document.querySelector('[role="dialog"]');assert.ok(dialog);assert.equal(dialog.getAttribute('aria-modal'),'true');assert.equal(view.document.body.style.overflow,'hidden');
 assert.equal(view.document.activeElement, dialog.querySelector('button[aria-label="Close PDF viewer"]'));assert.equal(view.container.inert,true,'background is inert while the viewer is open');
 const download=dialog.querySelector('a[download]'),url=download.getAttribute('href');assert.ok(url.startsWith('/files/pdf/'));assert.ok(fs.existsSync('public'+url));assert.equal(dialog.querySelector('iframe'),null); const open=dialog.querySelector('a[target="_blank"]');assert.equal(open.getAttribute('href'),url);assert.match(open.getAttribute('rel'),/noopener/);
 await view.key('Escape');assert.equal(view.document.querySelector('[role="dialog"]'),null);assert.equal(view.document.body.style.overflow,'');assert.equal(view.document.activeElement,opener,'closing returns focus to the CV control');assert.ok(!view.container.inert,'background interaction is restored');
 await view.click(opener);dialog=view.document.querySelector('[role="dialog"]');await view.click(dialog);assert.equal(view.document.querySelector('[role="dialog"]'),null);
});
test('PDF viewer retains the document on inner clicks and closes only through its close control',async t=>{
 let closes=0;const view=await render(t,PDFViewer,{pdfUrl:'/files/pdf/fixture.pdf',fileName:'fixture.pdf',isOpen:true,onClose:()=>closes++});
 await view.click(view.document.querySelector('h2'));assert.equal(closes,0);await view.key('Enter');assert.equal(closes,0);await view.click(view.document.querySelector('button[aria-label="Close PDF viewer"]'));assert.equal(closes,1);
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


test('PDF pages fit a phone, resize after rotation, zoom and reset to fit', async t => {
 const {calls, reset} = await import('./pdf-engine-fixture.mjs'); reset();
 const {default:PDFPages} = await applicationModule('components/PDFPages.tsx');
 const view = await render(t, PDFPages, {pdfUrl:'/files/pdf/ScheiberThomasCV.pdf'});
 assert.deepEqual(calls.loads, ['/files/pdf/ScheiberThomasCV.pdf']);
 let pages = [...view.container.querySelectorAll('.pdf-page')];
 assert.equal(pages.length, 2); assert.equal(pages[0].style.width, '366px');
 assert.match(pages[0].textContent, /Document text for page 1/);
 assert.equal(view.container.querySelector('[aria-label="Zoom out"]').disabled, true);
 await view.click(view.container.querySelector('[aria-label="Zoom in"]'));
 assert.equal(pages[0].style.width, '457.5px');
 assert.equal(view.container.querySelector('[aria-label="Fit PDF to screen width"]').textContent, '125%');
 await view.click(view.container.querySelector('[aria-label="Fit PDF to screen width"]'));
 assert.equal(pages[0].style.width, '366px');
 await view.resize(844); assert.equal(pages[0].style.width, '820px');
 await view.resize(320); assert.equal(pages[0].style.width, '296px');
 assert.equal(view.container.querySelector('[aria-busy]').getAttribute('aria-busy'), 'false');
 assert.ok(calls.cancelled > 0, 'obsolete page renders are cancelled on resize or zoom');
 await view.unmount(); assert.equal(calls.destroyed, 1, 'closing releases the PDF worker');
});

test('PDF loading failures leave the original open and download links available', async t => {
 const view = await render(t, PDFViewer, {pdfUrl:'/files/pdf/missing.pdf',isOpen:true,onClose:()=>{}});
 const dialog = view.document.querySelector('[role="dialog"]');
 assert.match(dialog.querySelector('[role="alert"]').textContent, /Open PDF or Download/);
 assert.equal(dialog.querySelector('[aria-busy]').getAttribute('aria-busy'), 'false');
 assert.equal(dialog.querySelector('a[download]').getAttribute('href'), '/files/pdf/missing.pdf');
 assert.equal(dialog.querySelector('a[target="_blank"]').getAttribute('href'), '/files/pdf/missing.pdf');
});

test('PDF dialog traps keyboard focus and restores the page position and prior styles', async t => {
 const view = await render(t, Home);
 const body = view.document.body; body.style.overflow='auto';
 view.window.scrollTo({top:480});
 const opener = view.container.querySelector('button[aria-label="View CV"]'); opener.focus();
 await view.click(opener);
 assert.equal(body.style.position,'fixed'); assert.equal(body.style.top,'-480px');
 const dialog = view.document.querySelector('[role="dialog"]');
 const first = dialog.querySelector('a'), last = dialog.querySelector('[tabindex="0"]');
 last.focus(); await view.key('Tab'); assert.equal(view.document.activeElement, first);
 first.focus();
 const {act} = await import('./component-harness.mjs');
 await act(async () => view.window.dispatchEvent(new view.window.KeyboardEvent('keydown',{key:'Tab',shiftKey:true})));
 assert.equal(view.document.activeElement,last);
 await view.key('Escape');
 assert.equal(body.style.position,''); assert.equal(body.style.top,''); assert.equal(body.style.overflow,'auto');
 assert.equal(view.window.scrollY,480); assert.equal(view.document.activeElement,opener);
});


test('PDF zoom has bounds and limits canvas memory on large screens', async t => {
 const {default:PDFPages} = await applicationModule('components/PDFPages.tsx');
 const view = await render(t, PDFPages, {pdfUrl:'/files/pdf/ScheiberThomasCV.pdf'});
 await view.resize(2000);
 const zoomIn=view.container.querySelector('[aria-label="Zoom in"]');
 for(let step=0;step<8;step++) await view.click(zoomIn);
 assert.equal(zoomIn.disabled,true);
 assert.equal(view.container.querySelector('.pdf-page').style.width,'3000px');
 for(const canvas of view.container.querySelectorAll('canvas')) {
  assert.ok(canvas.width*canvas.height<4_010_000,'raster allocation stays bounded even at maximum zoom');
 }
 await view.click(view.container.querySelector('[aria-label="Fit PDF to screen width"]'));
 assert.equal(view.container.querySelector('[aria-label="Zoom out"]').disabled,true);
});
