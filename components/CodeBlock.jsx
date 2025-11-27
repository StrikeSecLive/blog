import { useRef, useState } from 'react';

export default function CodeBlock({ children, className = '', ...rest }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const copy = async () => {
    const codeEl = preRef.current?.querySelector('code');
    const text = codeEl?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Copy failed');
    }
  };

  // Extract language from className or fallback to 'text'
  const language = className?.replace(/language-/, '') || 'text';
  const prismClass = `language-${language}`;

  const baseClasses =
    'relative bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm';
  const mergedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  const isInline = rest?.inline || false;

  if (isInline) {
    return (
      <code className={`px-1 py-0.5 rounded bg-gray-800 ${prismClass}`}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative group">
      <pre ref={preRef} className={mergedClasses}>
        <code className={prismClass}>{children}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
