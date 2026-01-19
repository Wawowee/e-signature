// lib/exportWorksheetPdf.ts
import { toPng } from "html-to-image";
import { PDFDocument } from "pdf-lib";

type PageSize = "letter" | "a4";

function getPdfPageDims(size: PageSize) {
  // PDF points: 72 points per inch
  if (size === "letter") return { w: 612, h: 792 }; // 8.5 x 11
  // A4: 210mm x 297mm
  return { w: 595.28, h: 841.89 };
}

function downloadBytes(bytes: Uint8Array, filename: string) {
  // Force a copy into an ArrayBuffer-backed Uint8Array (not SharedArrayBuffer-typed)
  const safe = new Uint8Array(bytes.byteLength);
  safe.set(bytes);

  const blob = new Blob([safe.buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}



export async function downloadWorksheetPdf(opts: {
  rootEl: HTMLElement;
  pageSize: PageSize;
  filename?: string;
}) {
  const { rootEl, pageSize, filename = "signature-worksheet.pdf" } = opts;

  // Ensure fonts are loaded before capture (important for signature fonts)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyDoc: any = document;
  if (anyDoc.fonts?.ready) {
    await anyDoc.fonts.ready;
  }

  const pages = Array.from(rootEl.querySelectorAll<HTMLElement>(".worksheetPage"));
  const targets = pages.length ? pages : [rootEl];

  const pdfDoc = await PDFDocument.create();
  const { w: pdfW, h: pdfH } = getPdfPageDims(pageSize);

  for (const el of targets) {
    // Convert each page DOM -> PNG
    const dataUrl = await toPng(el, {
      cacheBust: true,
      pixelRatio: 2,              // increase for sharper output
      backgroundColor: "white",   // avoid transparent/black backgrounds
      style: {
        // remove shadows so the PDF looks like paper
        boxShadow: "none",
      },
    });

    const png = await pdfDoc.embedPng(dataUrl);
    const imgW = png.width;
    const imgH = png.height;

    const scale = Math.min(pdfW / imgW, pdfH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    const x = (pdfW - drawW) / 2;
    const y = (pdfH - drawH) / 2;

    const page = pdfDoc.addPage([pdfW, pdfH]);
    page.drawImage(png, { x, y, width: drawW, height: drawH });
  }

  const bytes = await pdfDoc.save();
  downloadBytes(bytes, filename);
}
