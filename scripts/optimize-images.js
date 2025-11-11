const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeBackgroundImage() {
  const inputPath = path.join(__dirname, '../public/files/abstract-background.jpg');
  const outputPath = path.join(__dirname, '../public/files/abstract-background-optimized.jpg');
  
  console.log('🖼️  Optimizing background image...');
  
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`📏 Original size: ${originalSize} MB`);
    
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 85,
        progressive: true,
        mozjpeg: true 
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✅ Optimized size: ${newSize} MB`);
    console.log(`💾 Savings: ${savings}% reduction`);
    console.log(`\n📝 To use the optimized version, rename:`);
    console.log(`   abstract-background-optimized.jpg → abstract-background.jpg`);
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
  }
}

optimizeBackgroundImage();

