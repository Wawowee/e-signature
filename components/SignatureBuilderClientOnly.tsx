"use client";

import dynamic from "next/dynamic";

const SignatureBuilder = dynamic(() => import("./SignatureBuilder"), {
  ssr: false,
  // optional: show something while loading
  loading: () => <div>Loading…</div>,
});

export default function SignatureBuilderClientOnly() {
  return <SignatureBuilder />;
}
