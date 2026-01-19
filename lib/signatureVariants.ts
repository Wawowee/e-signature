// lib/signatureVariants.ts

const SUFFIXES = new Set([
  "jr", "jr.", "sr", "sr.", "ii", "iii", "iv", "v",
  "md", "phd", "esq"
]);

const PARTICLES = new Set([
  "da", "de", "del", "della", "der", "di", "du",
  "la", "le", "van", "von", "st", "st.", "bin", "al"
]);

function normalizeName(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[，,]+/g, " ") // commas -> spaces
    .trim();
}

function stripSuffix(words: string[]): { words: string[]; suffix?: string } {
  if (words.length <= 1) return { words };
  const last = words[words.length - 1].toLowerCase();
  if (SUFFIXES.has(last)) {
    return { words: words.slice(0, -1), suffix: words[words.length - 1] };
  }
  return { words };
}

function isWordLike(w: string) {
  // keep letters, apostrophes, hyphens
  return w.length > 0;
}

function capInitial(word: string): string {
  const c = word.trim()[0] ?? "";
  return c ? c.toUpperCase() : "";
}

function lastNameWithParticles(words: string[]): string {
  // e.g. "Ludwig van Beethoven" -> "van Beethoven"
  if (words.length === 1) return words[0];

  const last = words[words.length - 1];
  const prev = words[words.length - 2]?.toLowerCase();

  if (prev && PARTICLES.has(prev)) {
    return `${words[words.length - 2]} ${last}`;
  }
  return last;
}

function uniqueKeepOrder(arr: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const a of arr) {
    const key = a.toLowerCase();
    if (!a.trim()) continue;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(a);
    }
  }
  return out;
}

export type Variant = {
  label: string;
  text: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

function difficultyOf(text: string): Variant["difficulty"] {
  // Simple heuristic: length + punctuation
  const letters = text.replace(/[^A-Za-z]/g, "").length;
  const complexity = (text.match(/[-'.]/g) ?? []).length;

  const score = letters + complexity * 2;

  if (score <= 12) return "Easy";
  if (score <= 18) return "Medium";
  return "Hard";
}

export function generateSignatureVariants(input: string): Variant[] {
  const clean = normalizeName(input);
  if (!clean) return [];

  const rawWords = clean.split(" ").filter(isWordLike);
  if (rawWords.length === 0) return [];

  const { words } = stripSuffix(rawWords);

  // If user typed something like a single word ("Prince")
  if (words.length === 1) {
    const base = words[0];
    const variants = uniqueKeepOrder([
      base,
      `${base[0].toUpperCase()}.`,
    ]);

    return variants.map((t, idx) => ({
      label: idx === 0 ? "Full" : "Initial",
      text: t,
      difficulty: difficultyOf(t),
    }));
  }

  const first = words[0];
  const last = lastNameWithParticles(words);

  const middleWords = words.slice(1, -1); // excludes first & last word (particle last handled above)
  const middleInitials = middleWords
    .map(w => capInitial(w))
    .filter(Boolean);

  const firstI = capInitial(first);
  const lastI = capInitial(last.replace(/\s.+$/, "")); // initial from last main word

  const initialsAll = [firstI, ...middleInitials, lastI].filter(Boolean).join("");

  const candidates = uniqueKeepOrder([
    `${first} ${last}`,                 // Full name (shortened to first+last)
    `${first} ${lastI}.`,               // First + last initial
    `${firstI}. ${last}`,               // First initial + last
    `${firstI}${lastI}`,                // Monogram-ish
    `${firstI}.${last}`,                // Tight initial+last
    initialsAll,                        // All initials
    `${last}`,                          // Last only (sometimes very practiceable)
  ]);

  // Labels map (best-effort)
  const labeled: Variant[] = candidates.map((t) => {
    let label = "Variant";
    if (t === `${first} ${last}`) label = "First + Last";
    else if (t === `${first} ${lastI}.`) label = "First + Last initial";
    else if (t === `${firstI}. ${last}`) label = "First initial + Last";
    else if (t === `${last}`) label = "Last name only";
    else if (/^[A-Z]{2,4}$/.test(t)) label = "Initials";
    else if (t === `${firstI}.${last}`) label = "Compact initial + Last";
    else if (t === `${firstI}${lastI}`) label = "Monogram";

    return { label, text: t, difficulty: difficultyOf(t) };
  });

  // Prefer the most “signature-like” ones near top
  const order = [
    "First + Last",
    "First + Last initial",
    "First initial + Last",
    "Compact initial + Last",
    "Initials",
    "Monogram",
    "Last name only",
    "Variant",
  ];

  labeled.sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label));
  return labeled;
}
