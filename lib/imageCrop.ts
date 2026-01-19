// lib/imageCrop.ts
export type CropOptions = {
  padding?: number;        // pixels of padding around the tight crop
  alphaThreshold?: number; // 0-255; consider pixels with alpha > threshold as "ink"
  maxScanSize?: number;    // downscale for faster scanning (optional)
};

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

export async function cropSignatureDataUrl(
  dataUrl: string,
  opts: CropOptions = {}
): Promise<string> {
  const padding = opts.padding ?? 16;
  const alphaThreshold = opts.alphaThreshold ?? 8;
  const maxScanSize = opts.maxScanSize ?? 800;

  const img = await loadImage(dataUrl);

  // Draw original to an offscreen canvas
  const srcCanvas = document.createElement("canvas");
  const srcCtx = srcCanvas.getContext("2d")!;
  srcCanvas.width = img.naturalWidth;
  srcCanvas.height = img.naturalHeight;
  srcCtx.clearRect(0, 0, srcCanvas.width, srcCanvas.height);
  srcCtx.drawImage(img, 0, 0);

  // For faster scanning, optionally downscale to a smaller "scan canvas"
  const scanScale = Math.min(1, maxScanSize / Math.max(srcCanvas.width, srcCanvas.height));
  const scanCanvas = document.createElement("canvas");
  const scanCtx = scanCanvas.getContext("2d")!;
  scanCanvas.width = Math.max(1, Math.floor(srcCanvas.width * scanScale));
  scanCanvas.height = Math.max(1, Math.floor(srcCanvas.height * scanScale));
  scanCtx.drawImage(srcCanvas, 0, 0, scanCanvas.width, scanCanvas.height);

  const { width: w, height: h } = scanCanvas;
  const imageData = scanCtx.getImageData(0, 0, w, h).data;

  let minX = w, minY = h, maxX = -1, maxY = -1;

  // Find bounding box of "ink" pixels by alpha channel
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const a = imageData[idx + 3];
      if (a > alphaThreshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  // If empty (no ink), return original
  if (maxX < 0 || maxY < 0) return dataUrl;

  // Convert scan coords back to source coords
  const inv = 1 / scanScale;
  let cropX = Math.floor(minX * inv);
  let cropY = Math.floor(minY * inv);
  let cropW = Math.ceil((maxX - minX + 1) * inv);
  let cropH = Math.ceil((maxY - minY + 1) * inv);

  // Apply padding
  cropX = Math.max(0, cropX - padding);
  cropY = Math.max(0, cropY - padding);
  cropW = Math.min(srcCanvas.width - cropX, cropW + padding * 2);
  cropH = Math.min(srcCanvas.height - cropY, cropH + padding * 2);

  // Draw cropped area to output canvas
  const outCanvas = document.createElement("canvas");
  const outCtx = outCanvas.getContext("2d")!;
  outCanvas.width = cropW;
  outCanvas.height = cropH;
  outCtx.clearRect(0, 0, cropW, cropH);
  outCtx.drawImage(srcCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

  return outCanvas.toDataURL("image/png");
}
