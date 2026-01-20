import SignatureBuilderClientOnly from "@/components/SignatureBuilderClientOnly";
import { Great_Vibes } from "next/font/google";



export const metadata = {
  title: "Signature Worksheet Generator",
  description:
    "Type or draw a signature, choose fonts, and generate practice worksheets, font samplers, and cut-out sheets. Download PDF or print.",
};

const brandFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});
export default function AppToolPage() {
  return (
    <main className="mainShell">
      <div className="topBar">
        <div className="brandBlock">
              <div className={`landingBrandName ${brandFont.className}`} style={{ fontSize: 26 }}>
  Signature Studio
</div>
          <div className="brandSubtitle">
            Create and practice a signature — then print or download worksheets.
          </div>
        </div>
      </div>

      <SignatureBuilderClientOnly />
    </main>
  );
}
