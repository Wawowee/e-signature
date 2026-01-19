"use client";

import { useMemo, useState } from "react";
import { getFontClassName } from "@/lib/fonts";
import { generateSignatureVariants } from "@/lib/signatureVariants";

export default function TypedSignature({
  value,
  onChange,
  fontKey,
}: {
  value: string;
  onChange: (v: string) => void;
  fontKey: string;
}) {
  const fontClass = getFontClassName(fontKey);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const variants = useMemo(() => generateSignatureVariants(value), [value]);

  return (
    <div style={{ marginTop: 12 }}>
      <label>
        Signature text:
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: 6 }}
        />
      </label>

      <div style={{ marginTop: 12 }}>
        
        <div>Preview:</div>
        <div className="sigPreviewBox">
        <div className={fontClass} style={{ fontSize: 44, padding: 12, border: "1px solid #ddd" }}>
          {value || "Your Signature"}
        </div>
        </div>
      </div>

      {/* Stroke simplifier suggestions */}
      <div style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <strong>Suggested practice versions</strong>
          <label style={{ fontSize: 12, opacity: 0.85 }}>
            <input
              type="checkbox"
              checked={showSuggestions}
              onChange={(e) => setShowSuggestions(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Show
          </label>
        </div>

        {showSuggestions && (
          <>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
              Shorter versions are usually easier to repeat consistently. Click one to apply.
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {variants.slice(0, 8).map((v) => (
                <button
                  key={v.label + v.text}
                  onClick={() => onChange(v.text)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 999,
                    padding: "6px 10px",
                    background: v.text.toLowerCase() === value.trim().toLowerCase() ? "#f2f2f2" : "white",
                    cursor: "pointer",
                  }}
                  title={`Difficulty: ${v.difficulty}`}
                >
                  <span style={{ fontWeight: 600 }}>{v.label}</span>
                  <span style={{ opacity: 0.75 }}> · {v.difficulty}</span>
                </button>
              ))}
            </div>

            {/* Optional: show the selected variant in signature font as a “goal” */}
            {variants.length > 0 && (
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
                Tip: Start with an <strong>Easy</strong> version. Once it feels automatic, add complexity.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
