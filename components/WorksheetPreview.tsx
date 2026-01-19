"use client";

import { FONT_OPTIONS, getFontClassName } from "@/lib/fonts";

type Signature =
  | { type: "typed"; text: string; fontKey: string }
  | { type: "handwritten"; dataUrl: string | null };

type WorksheetType = "practice" | "sampler" | "cutout";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function progressionOpacity(rowIndex: number, totalRows: number, baseOpacity: number) {
  if (totalRows <= 1) return baseOpacity;
  const t = rowIndex / (totalRows - 1);
  const eased = Math.pow(1 - t, 1.6);
  return baseOpacity * eased;
}

function TypedSig({
  text,
  fontKey,
  fontSize,
  opacity = 1,
}: {
  text: string;
  fontKey: string;
  fontSize: number;
  opacity?: number;
}) {
  return (
    <div
      className={getFontClassName(fontKey)}
      style={{
        fontSize,
        opacity,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </div>
  );
}

function HandSig({
  dataUrl,
  className,
  style,
}: {
  dataUrl: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <img src={dataUrl} alt="signature" className={className} style={style} />;
}

function getSignatureText(signature: Signature) {
  return signature.type === "typed" ? signature.text || "Your Signature" : "";
}

export default function WorksheetPreview({
  worksheetType = "practice",
  pageSize,
  rows,
  showGhost,
  ghostOpacity,
  progression,
  signature,
}: {
  worksheetType?: WorksheetType; // optional so your app doesn't break before you wire it up
  pageSize: "letter" | "a4";
  rows: number;
  showGhost: boolean;
  ghostOpacity: number;
  progression: boolean;
  signature: Signature;
}) {
  const title =
    worksheetType === "practice"
      ? "Signature Practice"
      : worksheetType === "sampler"
        ? "Signature Sampler"
        : "Signature Cut-Out";

  const subtitle =
    worksheetType === "practice"
      ? "Trace lightly, then try without the guide."
      : worksheetType === "sampler"
        ? "Try each style once and choose what feels most natural."
        : "Cut along the borders and keep the signature you want to use.";

  return (
    <div className={`worksheetPage ${pageSize}`}>
      <div className="worksheetHeader">
        <div className="worksheetTitle">{title}</div>
        <div className="worksheetSubtitle">{subtitle}</div>
      </div>

      {worksheetType === "practice" && (
        <PracticeRows
          rows={rows}
          showGhost={showGhost}
          ghostOpacity={ghostOpacity}
          progression={progression}
          signature={signature}
        />
      )}

      {worksheetType === "sampler" && <SamplerSheet signature={signature} />}

      {worksheetType === "cutout" && <CutoutSheet signature={signature} />}
    </div>
  );
}

/* ---------- Practice (your current worksheet) ---------- */

function PracticeRows({
  rows,
  showGhost,
  ghostOpacity,
  progression,
  signature,
}: {
  rows: number;
  showGhost: boolean;
  ghostOpacity: number;
  progression: boolean;
  signature: Signature;
}) {
  const ghost =
    signature.type === "typed" ? (
      <TypedSig
        text={getSignatureText(signature)}
        fontKey={signature.fontKey}
        fontSize={42}
      />
    ) : signature.dataUrl ? (
      <HandSig dataUrl={signature.dataUrl} className="ghostImg" />
    ) : (
      <div style={{ fontSize: 14, opacity: 0.8 }}>Draw a signature to use as the trace template.</div>
    );

  return (
    <>
      {Array.from({ length: rows }).map((_, i) => {
        const rowOpacity = !showGhost
          ? 0
          : progression
            ? progressionOpacity(i, rows, ghostOpacity)
            : ghostOpacity;

        const finalOpacity = clamp(rowOpacity, 0, 0.35);

        return (
          <div className="practiceRow" key={i}>
            {showGhost && finalOpacity > 0.001 && (
              <div className="ghost" style={{ opacity: finalOpacity }}>
                {ghost}
              </div>
            )}
            <div className="baseline" />
          </div>
        );
      })}
    </>
  );
}

/* ---------- Sampler (each font once) ---------- */

function SamplerSheet({ signature }: { signature: Signature }) {
  // Sampler is most meaningful for typed signatures (since fonts are the point),
  // but we still handle handwritten gracefully.
  const text = signature.type === "typed" ? getSignatureText(signature) : "";

  return (
    <div className="samplerGrid">
      {FONT_OPTIONS.map((f) => (
        <div className="samplerItem" key={f.key}>
          <div className="samplerLabel">{f.label}</div>

          {signature.type === "typed" ? (
            <TypedSig text={text} fontKey={f.key} fontSize={44} />
          ) : signature.dataUrl ? (
            <HandSig dataUrl={signature.dataUrl} className="samplerImg" />
          ) : (
            <div style={{ fontSize: 12, opacity: 0.75 }}>Draw a signature to preview.</div>
          )}

          {/* One practice line per font so they can try it once */}
          <div className="samplerPracticeRow">
            <div className="samplerBaseline" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Cut-out (repeat, normal opacity, evenly spaced) ---------- */

function CutoutSheet({ signature }: { signature: Signature }) {
  const text = signature.type === "typed" ? getSignatureText(signature) : "";

  // Change this number if you want more/less cutouts per page
  const count = 10;
  const items = Array.from({ length: count });

  return (
    <div className="cutoutGrid">
      {items.map((_, i) => (
        <div className="cutoutCell" key={i}>
          <div className="cutoutContent">
            {signature.type === "typed" ? (
              <TypedSig text={text} fontKey={signature.fontKey} fontSize={48} />
            ) : signature.dataUrl ? (
              <HandSig dataUrl={signature.dataUrl} className="cutoutImg" />
            ) : (
              <div style={{ fontSize: 12, opacity: 0.75 }}>Draw a signature first.</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
