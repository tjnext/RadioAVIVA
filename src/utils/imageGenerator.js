/**
 * Generates a square image (1080x1080) for sharing on social media.
 * Combines a background image, verse text, biblical reference, and logo.
 */
export async function generateVerseImage(verse) {
  if (!verse) return null;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 1080;
  canvas.width = size;
  canvas.height = size;

  const basePath = import.meta.env.BASE_URL || '/';

  // 1. Load the background image
  const bgImg = new Image();
  bgImg.src = `${basePath}assets/fundobiblia.jpg`; // Using the established background
  await new Promise((resolve) => {
    bgImg.onload = resolve;
    bgImg.onerror = () => {
      console.error('Failed to load background image, using fallback color');
      resolve();
    };
  });

  // 2. Load the Logo
  const logoImg = new Image();
  logoImg.src = `${basePath}assets/RavivaSF.png`;
  await new Promise((resolve) => {
    logoImg.onload = resolve;
    logoImg.onerror = resolve;
  });

  // 3. Ensure fonts are loaded
  await document.fonts.ready;

  // 4. Draw Background (Cover centering)
  if (bgImg.complete && bgImg.naturalWidth > 0) {
    const scale = Math.max(size / bgImg.width, size / bgImg.height);
    const x = (size / 2) - (bgImg.width / 2) * scale;
    const y = (size / 2) - (bgImg.height / 2) * scale;
    ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);
  } else {
    ctx.fillStyle = '#001a38';
    ctx.fillRect(0, 0, size, size);
  }

  // 5. Add Overlay for contrast (lighter than before to see the image)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, size, size);

  // 6. Config Typography
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  
  // -- Verse Text (Georgia Bold Italic for a more classic, premium look)
  const margin = 80;
  const maxWidth = size - (margin * 2);
  let fontSize = 70;
  ctx.font = `bold italic ${fontSize}px "Georgia", serif`;
  
  // Wrap Text Function
  const lines = wrapText(ctx, `"${verse.text}"`, maxWidth);
  
  // Vertical positioning calculation (Centered in the upper 70% of the image)
  const lineHeight = fontSize * 1.3;
  const totalTextHeight = (lines.length * lineHeight) + 120; // Text + spacing + reference
  let startY = (size / 2) - (totalTextHeight / 2) - 100; // Offset slightly up to show the bible at bottom

  // Draw lines with shadows for readability
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, size / 2, startY + (index * lineHeight));
  });

  // -- Biblical Reference (Dancing Script)
  ctx.shadowBlur = 8;
  ctx.font = '700 90px "Dancing Script"';
  const referenceY = startY + (lines.length * lineHeight) + 60;
  ctx.fillText(verse.reference, size / 2, referenceY);

  // 7. Draw Logo (Bottom Right - Small and subtle)
  ctx.shadowBlur = 0;
  if (logoImg.complete && logoImg.naturalWidth > 0) {
    const logoSize = 100;
    ctx.globalAlpha = 0.8;
    ctx.drawImage(logoImg, size - logoSize - 40, size - logoSize - 40, logoSize, logoSize);
    ctx.globalAlpha = 1.0;
  }

  // 8. Return as File
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], 'versiculo-radio-aviva.jpg', { type: 'image/jpeg' });
      resolve(file);
    }, 'image/jpeg', 0.9);
  });
}

// Utility to wrap text on canvas
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}
