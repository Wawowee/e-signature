"use client";

import { RefObject, useState } from "react";
import { downloadWorksheetPdf } from "@/lib/exportWorksheetPdf";
import { downloadHandwrittenSignaturePng, downloadTypedSignaturePng } from "@/lib/exportSignature";

export default function PrintButtons({
  worksheetRef,
  pageSize,
  mode,
  handwrittenDataUrl,
  typedExportRef,
}: {
  worksheetRef: RefObject<HTMLDivElement | null>;
  pageSize: "letter" | "a4";
  mode: "typed" | "handwritten";
  handwrittenDataUrl: string | null;
  typedExportRef: RefObject<HTMLDivElement | null>;
}) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [savingSig, setSavingSig] = useState(false);

  return (
    <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button className="btnGhost" onClick={() => window.print()}>Print Worksheet</button>

      <button
       className="btnPrimary"
        disabled={downloadingPdf}
        onClick={async () => {
          const rootEl = worksheetRef.current;
          if (!rootEl) return;

          setDownloadingPdf(true);
          try {
            await downloadWorksheetPdf({
              rootEl,
              pageSize,
              filename: "signature-worksheet.pdf",
            });
          } finally {
            setDownloadingPdf(false);
          }
        }}
      >
        {downloadingPdf ? "Generating PDF…" : "Download Worksheet"}
      </button>

      <button
        className="btnSoft"
        disabled={savingSig}
        onClick={async () => {
          setSavingSig(true);
          try {
            if (mode === "handwritten") {
              if (!handwrittenDataUrl) return;
              await downloadHandwrittenSignaturePng({
                dataUrl: handwrittenDataUrl,
                filename: "signature.png",
              });
            } else {
              const el = typedExportRef.current;
              if (!el) return;
              await downloadTypedSignaturePng({
                el,
                filename: "signature.png",
                pixelRatio: 3,
              });
            }
          } finally {
            setSavingSig(false);
          }
        }}
      >
        {savingSig ? "Saving…" : "Save Signature"}
      </button>
    </div>
  );
}
