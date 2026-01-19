"use client";
import { FONT_OPTIONS } from "@/lib/fonts";

export default function FontPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginTop: 12 }}>
      <label>
        Font:
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ marginLeft: 8 }}>
          {FONT_OPTIONS.map(f => (
            <option key={f.key} value={f.key}>{f.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
