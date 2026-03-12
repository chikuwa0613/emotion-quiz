"use client";

import { useState } from "react";

interface ShareButtonProps {
  text: string;
}

export default function ShareButton({ text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // フォールバック
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="btn-gold w-full"
      style={{
        transition: "all 0.3s",
        background: copied
          ? "linear-gradient(135deg, #27ae60, #2ecc71)"
          : undefined,
      }}
    >
      {copied ? "✅ コピーしました！" : "📋 結果をSNSにシェア（コピー）"}
    </button>
  );
}
