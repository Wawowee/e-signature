import localFont from "next/font/local";

const Default = localFont({ src: "../public/fonts/allura.woff2", variable: "--sig-allura" });
const Fancy1  = localFont({ src: "../public/fonts/dancing-script.woff2",  variable: "--sig-dancing-script" });
const Fancy2  = localFont({ src: "../public/fonts/dr-sugiyama.woff2",  variable: "--sig-dr-sugiyama" });
const GrandHotel  = localFont({ src: "../public/fonts/grand-hotel.woff2",  variable: "--sig-grand-hotel" });
const Italianno  = localFont({ src: "../public/fonts/italianno.woff2",  variable: "--sig-italianno" });
const KolkerBrush  = localFont({ src: "../public/fonts/kolker-brush.woff2",  variable: "--sig-kolker-brush" });
const LoveLight  = localFont({ src: "../public/fonts/love-light.woff2",  variable: "--sig-love-light" });
const MarckScript  = localFont({ src: "../public/fonts/marck-script.woff2",  variable: "--sig-marck-script" });
const Pacifico  = localFont({ src: "../public/fonts/pacifico.woff2",  variable: "--sig-pacifico" });
const Parisienne  = localFont({ src: "../public/fonts/parisienne.woff2",  variable: "--sig-parisienne" });
const PatrickHand  = localFont({ src: "../public/fonts/patrick-hand.woff2",  variable: "--sig-patrick-hand" });
const PetitFormalScript  = localFont({ src: "../public/fonts/petit-formal-script.woff2",  variable: "--sig-petit-formal-script" });
const Sacramento  = localFont({ src: "../public/fonts/sacramento.woff2",  variable: "--sig-sacramento" });
const Satisfy  = localFont({ src: "../public/fonts/satisfy.woff2",  variable: "--sig-satisfy" });
const Yellowtail  = localFont({ src: "../public/fonts/yellowtail.woff2",  variable: "--sig-yellowtail" });

export const FONT_OPTIONS = [
  { key: "allura", label: "Graceful — Allura", className: Default.className },
  { key: "dancing-script", label: "Cheerful — Dancing Script", className: Fancy1.className },
  { key: "dr-sugiyama", label: "Dramatic — Dr. Sugiyama", className: Fancy2.className },
  { key: "grand-hotel", label: "Stylish — Grand Hotel", className: GrandHotel.className },
  { key: "italianno", label: "Classy — Italianno", className: Italianno.className },
  { key: "kolker-brush", label: "Experimental — Kolker Brush", className: KolkerBrush.className },
  { key: "love-light", label: "Quirky — Love Light", className: LoveLight.className },
  { key: "marck-script", label: "Minimalist — Marck Script", className: MarckScript.className },
  { key: "pacifico", label: "Confident — Pacifico", className: Pacifico.className },
  { key: "parisienne", label: "Romantic — Parisienne", className: Parisienne.className },
  { key: "patrick-hand", label: "Casual — Patrick Hand", className: PatrickHand.className },
  { key: "petit-formal-script", label: "Formal — Petit Formal Script", className: PetitFormalScript.className },
  { key: "sacramento", label: "Vintage — Sacramento", className: Sacramento.className },
  { key: "satisfy", label: "Relaxed — Satisfy", className: Satisfy.className },
  { key: "yellowtail", label: "Bold — Yellowtail", className: Yellowtail.className },
];

export function getFontClassName(key: string) {
  return FONT_OPTIONS.find(f => f.key === key)?.className ?? FONT_OPTIONS[0].className;
}
