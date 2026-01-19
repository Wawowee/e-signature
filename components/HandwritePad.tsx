"use client";

import { useEffect, useRef, useState } from "react";
import { cropSignatureDataUrl } from "@/lib/imageCrop";

export default function HandwritePad({
  onChange,
}: {
  onChange: (dataUrl: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<any>(null);

  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const SignaturePad = (await import("signature_pad")).default;
      if (!isMounted) return;

      const canvas = canvasRef.current!;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);

      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;

      const ctx = canvas.getContext("2d")!;
      ctx.scale(ratio, ratio);

      const pad = new SignaturePad(canvas, { minWidth: 1, maxWidth: 2.5 });
      padRef.current = pad;

      const update = async () => {
        if (pad.isEmpty()) {
          onChange(null);
          return;
        }
        setIsCropping(true);
        try {
          const raw = pad.toDataURL("image/png");
          const cropped = await cropSignatureDataUrl(raw, {
            padding: 18,
            alphaThreshold: 8,
            maxScanSize: 700,
          });
          onChange(cropped);
        } finally {
          setIsCropping(false);
        }
      };

      canvas.addEventListener("pointerup", update);
      canvas.addEventListener("touchend", update);

      return () => {
        canvas.removeEventListener("pointerup", update);
        canvas.removeEventListener("touchend", update);
        pad.off();
      };
    })();

    return () => {
      isMounted = false;
      padRef.current = null;
    };
  }, [onChange]);

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>Draw your signature:</div>
        {isCropping && <div style={{ fontSize: 12, opacity: 0.7 }}>Cropping…</div>}
      </div>

<canvas ref={canvasRef} className="padCanvas" />


      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          onClick={() => {
            padRef.current?.clear();
            onChange(null);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
