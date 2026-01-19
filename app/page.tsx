import SignatureBuilderClientOnly from "@/components/SignatureBuilderClientOnly";
import { Great_Vibes } from "next/font/google";

const brandFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

export default function Page() {
  return (
    <main className="mainShell">
      <div className="topBar">
        <div className="brandBlock">
          <div className={`brandTitle ${brandFont.className}`}>Signature Studio</div>
          <div className="brandSubtitle">Generate a handwritten signature — then practice tracing it.</div>
        </div>

      </div>

      <SignatureBuilderClientOnly />
    </main>
  );
}
