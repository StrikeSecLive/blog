
// components/CodeBlock.jsx
import { useRef, useState } from 'react';

export default function CodeBlock({ children, className = '' }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const copy = async () => {
    try {
      // Find the nested <code> inside the <pre>
      const codeEl = preRef.current?.querySelector('code');
      const text = codeEl?.textContent ?? preRef.current?.textContent ?? '';

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback for older browsers
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(preRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-4">
      <pre
        ref={preRef}
        className={`bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm ${className}`}
      >
        {/* Keep children as-is so Prism classes & markup are preserved */}
        {children}
      </pre>

      <button
        onClick={copy}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition"
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
