// lib/exportSignature.ts
import { toPng } from "html-to-image";

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export async function downloadTypedSignaturePng(opts: {
  el: HTMLElement;
  filename?: string;
  pixelRatio?: number;
}) {
  const { el, filename = "signature.png", pixelRatio = 3 } = opts;

  // Ensure fonts load first
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyDoc: any = document;
  if (anyDoc.fonts?.ready) {
    await anyDoc.fonts.ready;
  }

  // Transparent background by default (no backgroundColor)
  const dataUrl = await toPng(el, {
    cacheBust: true,
    pixelRatio,
    backgroundColor: "white",
    // If you want solid white instead, set backgroundColor: "white"
  });

  downloadDataUrl(dataUrl, filename);
}

export function downloadHandwrittenSignaturePng(opts: {
  dataUrl: string;
  filename?: string;
}) {
  const { dataUrl, filename = "signature.png" } = opts;
  downloadDataUrl(dataUrl, filename);
}

async function dataUrlToWhitePng(dataUrl: string): Promise<string> {
  const img = new Image();
  img.src = dataUrl;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d")!;
  // ✅ fill white first
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // then draw the transparent PNG on top
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL("image/png");
}

