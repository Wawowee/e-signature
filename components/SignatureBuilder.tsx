"use client";

import { useMemo, useRef, useState } from "react";
import TypedSignature from "./TypedSignature";
import HandwritePad from "./HandwritePad";
import FontPicker from "./FontPicker";
import WorksheetPreview from "./WorksheetPreview";
import PrintButtons from "./PrintButtons";
import { getFontClassName } from "@/lib/fonts";


type Mode = "typed" | "handwritten";
type WorksheetType = "practice" | "sampler" | "cutout";

export default function SignatureBuilder() {
  const [mode, setMode] = useState<Mode>("typed");

  // Signature inputs
  const [typedText, setTypedText] = useState("John Smith");
  const [selectedFont, setSelectedFont] = useState("default");
  const [handwrittenDataUrl, setHandwrittenDataUrl] = useState<string | null>(null);

  // Worksheet settings
  const [rows, setRows] = useState(12);
  const [showGhost, setShowGhost] = useState(true);
  const [pageSize, setPageSize] = useState<"letter" | "a4">("letter");

  // NEW: learning controls
  const [ghostOpacity, setGhostOpacity] = useState(0.14); // 0.00–0.30 is a nice range
  const [progression, setProgression] = useState(true);

  const worksheetRef = useRef<HTMLDivElement>(null);
  const typedExportRef = useRef<HTMLDivElement>(null);
  const [worksheetType, setWorksheetType] = useState<WorksheetType>("practice");

  const signatureKind = useMemo(() => {
    return mode === "typed"
      ? { type: "typed" as const, text: typedText, fontKey: selectedFont }
      : { type: "handwritten" as const, dataUrl: handwrittenDataUrl };
  }, [mode, typedText, selectedFont, handwrittenDataUrl]);

return (
  <div className="layout">
    <section className="panel appUI">
      <div className="panelInner">
        <h1 style={{ margin: "2px 0 10px", fontSize: 18, fontWeight: 900 }}>
          Signature Generator
        </h1>

        {/* 1) Create */}
        <div className="sectionTitle">1) Create your signature</div>
        <div className="card">
          <div className="segmented" style={{ marginTop: 2 }}>
            <button
              className="segBtn"
              onClick={() => setMode("typed")}
              aria-pressed={mode === "typed"}
              type="button"
            >
              Typed
            </button>
            <button
              className="segBtn"
              onClick={() => setMode("handwritten")}
              aria-pressed={mode === "handwritten"}
              type="button"
            >
              Handwritten
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            {mode === "typed" ? (
              <>
                <TypedSignature value={typedText} onChange={setTypedText} fontKey={selectedFont} />
                <FontPicker value={selectedFont} onChange={setSelectedFont} />
              </>
            ) : (
              <HandwritePad onChange={setHandwrittenDataUrl} />
            )}
          </div>
        </div>

        <div className="hr" />

        {/* 2) Worksheet */}
        <div className="sectionTitle">2) Worksheet</div>
        <div className="card">
          <label style={{ display: "block", marginTop: 10 }}>
  Worksheet type
  <select
    value={worksheetType}
    onChange={(e) => setWorksheetType(e.target.value as WorksheetType)}
    style={{ marginTop: 6 }}
  >
    <option value="practice">Practice</option>
    <option value="sampler" disabled={mode === "handwritten"}>
  Signature Sampler (Only for typed signatures)
</option>
    <option value="cutout">Signature Cut-Out</option>
  </select>
</label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 10 }}>
            <label style={{ alignSelf: "end" }}>Rows (Only for Practice Worksheet)</label>
            <input
              type="number"
              min={4}
              max={30}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
            />
          </div>

          <div className="checkboxRow">
            <input
              type="checkbox"
              checked={showGhost}
              onChange={(e) => setShowGhost(e.target.checked)}
            />
            <span>Show trace (ghost) signature</span>
          </div>

          {/* Ghost opacity slider */}
          <div style={{ marginTop: 10, opacity: showGhost ? 1 : 0.5 }}>
            <label style={{ display: "block" }}>
              Ghost strength: <strong>{Math.round(ghostOpacity * 100)}%</strong>
            </label>
            <input
              type="range"
              min={0}
              max={30}
              value={Math.round(ghostOpacity * 100)}
              onChange={(e) => setGhostOpacity(Number(e.target.value) / 100)}
              disabled={!showGhost}
              aria-label="Ghost strength"
            />
            <div className="smallHint">Tip: 10–18% is usually traceable without being too dark.</div>
          </div>

          {/* Progression toggle */}
          <div className="checkboxRow" style={{ opacity: showGhost ? 1 : 0.5 }}>
            <input
              type="checkbox"
              checked={progression}
              onChange={(e) => setProgression(e.target.checked)}
              disabled={!showGhost}
            />
            <span>Progression (guide fades out down the page)</span>
          </div>


          <div style={{ marginTop: 10 }}>
            <label>
              Page size
              <select value={pageSize} onChange={(e) => setPageSize(e.target.value as any)}>
                <option value="letter">Letter</option>
                <option value="a4">A4</option>
              </select>
            </label>
          </div>
                    {/* Practice tip callout */}
<div
  className="card"
  style={{
    marginTop: 12,
    background: "rgba(79,70,229,0.06)",
    borderColor: "rgba(79,70,229,0.22)",
  }}
>
  <div style={{ fontWeight: 800, marginBottom: 6 }}>Practice tip</div>
  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.4 }}>
    Consistency leads to confidence. Practice your signature until it is consistent before adding flourishes.
  </div>
</div>
        </div>

        <div className="hr" />

        {/* 3) Export */}
        <div className="sectionTitle">3) Export</div>
        <div className="card">
          <PrintButtons
            worksheetRef={worksheetRef}
            pageSize={pageSize}
            mode={mode}
            handwrittenDataUrl={handwrittenDataUrl}
            typedExportRef={typedExportRef}
          />
          <div className="smallHint">
            Worksheets are downloaded as PDFs. Electronic signature is saved as PNG.
          </div>
        </div>

        {/* Hidden typed signature export target (keep it in panelInner) */}
        <div
          style={{
            position: "fixed",
            left: -10000,
            top: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <div
            ref={typedExportRef}
            className={mode === "typed" ? getFontClassName(selectedFont) : ""}
            style={{
              fontSize: 96,
              padding: 8,
              whiteSpace: "nowrap",
              display: "inline-block",
              background: "white",
            }}
          >
            {typedText || "Your Signature"}
          </div>
        </div>
      </div>
    </section>

    {/* Preview */}
    <section className="printArea">
      <div ref={worksheetRef}>
        <WorksheetPreview
          worksheetType={worksheetType}
          pageSize={pageSize}
          rows={rows}
          showGhost={showGhost}
          ghostOpacity={ghostOpacity}
          progression={progression}
          signature={signatureKind}
        />
      </div>
    </section>
  </div>
);

}
