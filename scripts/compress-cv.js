const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const PDF_PATH = path.join(__dirname, '../public/files/pdf/ScheiberThomasCV.pdf');
const MAX_SIZE_MB = 2;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

async function compressCV() {
  console.log('\n🔍 Checking CV PDF size...');
  
  try {
    // Check if file exists
    if (!fs.existsSync(PDF_PATH)) {
      console.log('⚠️  CV PDF not found - skipping compression check\n');
      return;
    }

    // Check current size
    const stats = fs.statSync(PDF_PATH);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log(`📄 Current size: ${sizeMB} MB`);

    if (stats.size <= MAX_SIZE_BYTES) {
      console.log(`✅ PDF is under ${MAX_SIZE_MB}MB - optimized!\n`);
      return;
    }

    console.log(`⚠️  PDF is ${sizeMB} MB (over ${MAX_SIZE_MB}MB limit)`);
    console.log('🗜️  Attempting automatic compression...\n');

    // Load and compress PDF
    const existingPdfBytes = fs.readFileSync(PDF_PATH);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Try compression
    const compressedPdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
      updateFieldAppearances: false,
    });

    const newSizeMB = (compressedPdfBytes.length / 1024 / 1024).toFixed(2);
    const savings = ((1 - compressedPdfBytes.length / stats.size) * 100).toFixed(1);

    if (compressedPdfBytes.length < stats.size && savings > 0.1) {
      // Create backup if not exists
      const backupPath = PDF_PATH + '.original';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(PDF_PATH, backupPath);
      }
      
      fs.writeFileSync(PDF_PATH, compressedPdfBytes);
      console.log(`✅ Compressed to ${newSizeMB} MB (saved ${savings}%)`);
      
      if (compressedPdfBytes.length > MAX_SIZE_BYTES) {
        console.log(`\n⚠️  Still over ${MAX_SIZE_MB}MB - manual optimization recommended:`);
        printCompressionGuide();
      } else {
        console.log('✅ Now under size limit!\n');
      }
    } else {
      console.log(`ℹ️  Automatic compression not effective (${savings}% savings)`);
      console.log('\n💡 For image-heavy PDFs, manual compression works best:');
      printCompressionGuide();
    }

  } catch (error) {
    console.error('❌ Compression error:', error.message);
    console.log('\n💡 Manual compression recommended:');
    printCompressionGuide();
  }
}

function printCompressionGuide() {
  console.log('\n📖 Compression Options:');
  console.log('   1. ILovePDF: https://www.ilovepdf.com/compress_pdf (Free)');
  console.log('   2. Smallpdf: https://smallpdf.com/compress-pdf (Free)');
  console.log('   3. Adobe Acrobat: File → Optimize PDF');
  console.log('   4. Preview (Mac): Export → Reduce File Size');
  console.log('\n   Then replace: public/files/pdf/ScheiberThomasCV.pdf\n');
}

compressCV();
