import Link from "next/link";
import { FileDown, PenLine, Sparkles, PencilRuler, Type, Scissors } from "lucide-react";
import { Great_Vibes } from "next/font/google";
const brandFont = Great_Vibes({ weight: "400", subsets: ["latin"] });


export const metadata = {
  title: "Signature Studio — Signature Practice Worksheets & Generator",
  description:
    "Learn to create a signature you can actually repeat. Generate practice worksheets, a font sampler, and cut-out signature sheets. Download PDF or print.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Signature Studio",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "Create and practice signatures with printable worksheets, font samplers, and cut-out sheets.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function HomePage() {
  return (
        <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <main className="appleLanding">
      <header className="landingTop">
  <div className="landingBrand">
    <div className={`landingBrandName ${brandFont.className}`} style={{ fontSize: 26 }}>
  Signature Studio
</div>
    <div className="landingBrandTagline">Signature practice worksheets</div>
  </div>
</header>

      {/* HERO */}
      <section className="appleHero">
        <div className="appleHeroGrid">
          <div>
            <div className="appleKicker">Signature practice, simplified</div>

<h1 className="appleH1">
  Build a signature you can <span className="heroHighlight">learn</span> and repeat.
</h1>


            <p className="appleLead">
              Signature Studio is a learning-first signature generator. Type or draw your signature,
              explore styles, and create worksheets designed for consistent practice.
            </p>

            <div className="appleCtas">
              <Link className="appleBtn appleBtnPrimary" href="/app">
                Open the tool <PenLine size={18} />
              </Link>


            </div>

            <div className="appleNote">
              No signup required. Download PDF worksheets or save a signature PNG.
            </div>
          </div>

          {/* Minimal preview mock */}
          <div className="applePreview" aria-hidden="true">
            <div className="applePreviewTop">
              <div className="appleDots">
                <div className="appleDot" />
                <div className="appleDot" />
                <div className="appleDot" />
              </div>
              Preview
            </div>

            <div className="applePreviewBody">
              <div className="appleSheetMock">
                <div className="appleSheetTitle">Signature Practice</div>
                <div className="appleSheetSub">Trace → fade guide → build consistency</div>

                <div className="appleMockRows">
                  <div className="appleMockRow">
                    <div className="appleGhostBar" style={{ opacity: 0.22 }} />
                  </div>
                  <div className="appleMockRow">
                    <div className="appleGhostBar" style={{ opacity: 0.14 }} />
                  </div>
                  <div className="appleMockRow">
                    <div className="appleGhostBar" style={{ opacity: 0.08 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="appleDivider" />
      </section>

      {/* WHY IT WORKS (less blocky, with Lucide icons) */}
      <section className="appleSection">
        <div className="appleSectionHeader">
          <h2 className="appleH2">Why it works</h2>
        </div>

        <div className="appleWhyGrid">
          <div className="appleWhyItem">
            <div className="appleWhyIcon">
              <PenLine size={18} />
            </div>
            <div className="appleWhyTitle">Built for practice</div>
            <p className="appleWhyText">
              Trace guides and fade progression help you develop consistency before removing the guide.
            </p>
          </div>

          <div className="appleWhyItem">
            <div className="appleWhyIcon">
              <Sparkles size={18} />
            </div>
            <div className="appleWhyTitle">Find what feels natural</div>
            <p className="appleWhyText">
              Use the sampler sheet to try every style once and pick the one you can repeat comfortably.
            </p>
          </div>

          <div className="appleWhyItem">
            <div className="appleWhyIcon">
              <FileDown size={18} />
            </div>
            <div className="appleWhyTitle">Export-ready</div>
            <p className="appleWhyText">
              Download a clean PDF worksheet, or save your signature as a PNG with a white background.
            </p>
          </div>
        </div>
      </section>

      {/* WORKSHEETS */}
<section className="appleSection" id="worksheets">
  <div className="appleSectionHeader">
    <h2 className="appleH2">Worksheet types</h2>
    <Link className="appleBtn" href="/app">
      Generate now <FileDown size={18} />
    </Link>
  </div>

  <div className="appleList">
<div className="appleListItem">
  <div className="appleListIcon">
    <PencilRuler size={20} />
  </div>
  <div>
    <div className="appleListTitle">Practice</div>
    <div className="appleListText">
      Trace a light guide, then fade it out down the page to build muscle memory.
    </div>
  </div>
</div>

<div className="appleListItem">
  <div className="appleListIcon">
    <Type size={20} />
  </div>
  <div>
    <div className="appleListTitle">Signature Sampler</div>
    <div className="appleListText">
      One sample per font so you can test everything once and choose the best fit.
    </div>
  </div>
</div>

<div className="appleListItem">
  <div className="appleListIcon">
    <Scissors size={20} />
  </div>
  <div>
    <div className="appleListTitle">Cut-out Sheet</div>
    <div className="appleListText">
      Evenly spaced signatures at normal opacity, formatted for trimming.
    </div>
  </div>
</div>

  </div>
</section>


      {/* FINAL CTA */}
      <section className="appleSection">
        <div className="appleHero" style={{ padding: "28px 28px" }}>
          <div className="appleSectionHeader">
            <h2 className="appleH2">Ready to start?</h2>
            <Link className="appleBtn appleBtnPrimary" href="/app">
              Open the tool <PenLine size={18} />
            </Link>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={18} /> Sampler + practice + cut-out
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <FileDown size={18} /> Download PDF
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Scissors size={18} /> Cut-out format
            </span>
          </div>
        </div>
      </section>

      <footer className="appleFooter">
        © {new Date().getFullYear()} Signature Studio
      </footer>
    </main>
    </>
  );
}
