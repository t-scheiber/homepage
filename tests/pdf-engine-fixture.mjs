// Deliberate PDF.js fixture: test loading, sizing, zoom and cleanup without browser workers.
export const GlobalWorkerOptions = {};
export const calls = { loads: [], renders: [], destroyed: 0, cancelled: 0 };
export function reset() {
  calls.loads.length = 0; calls.renders.length = 0;
  calls.destroyed = 0; calls.cancelled = 0;
}
export function getDocument({ url }) {
  calls.loads.push(url);
  return {
    promise: url.includes('missing') ? Promise.reject(Error('Missing PDF')) : Promise.resolve({
      numPages: 2,
      getPage: async pageNumber => ({
        getViewport: ({ scale }) => ({ width: 600 * scale, height: 840 * scale, scale }),
        render: parameters => {
          calls.renders.push({ pageNumber, ...parameters });
          return { promise: Promise.resolve(), cancel: () => calls.cancelled++ };
        },
        streamTextContent: () => 'Document text for page ' + pageNumber,
      }),
    }),
    destroy: async () => { calls.destroyed++; },
  };
}
export class TextLayer {
  constructor({ container, textContentSource }) { this.container = container; this.content = textContentSource; }
  async render() { this.container.textContent = this.content; }
  cancel() {}
}
