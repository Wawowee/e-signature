import localFont from "next/font/local";

const Default = localFont({ src: "../public/fonts/Default.woff2", variable: "--sig-default" });
const Fancy1  = localFont({ src: "../public/fonts/Fancy1.woff2",  variable: "--sig-fancy1" });
const Fancy2  = localFont({ src: "../public/fonts/Fancy2.woff2",  variable: "--sig-fancy2" });
const Amita  = localFont({ src: "../public/fonts/Amita.woff2",  variable: "--sig-Amita" });

export const FONT_OPTIONS = [
  { key: "default", label: "Default", className: Default.className },
  { key: "fancy1", label: "Fancy 1", className: Fancy1.className },
  { key: "fancy2", label: "Fancy 2", className: Fancy2.className },
  { key: "Amita", label: "Amita", className: Amita.className },
];

export function getFontClassName(key: string) {
  return FONT_OPTIONS.find(f => f.key === key)?.className ?? FONT_OPTIONS[0].className;
}
