import { useRef, useState } from 'react';

export default function CodeBlock({ children, className = '', inline = false, ...rest }) {
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

  // Determine language class for Prism (optional)
  const language = className?.replace(/language-/, '') || 'text';
  const prismClass = `language-${language}`;
  const baseClasses =
    'relative bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm';
  const mergedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  if (inline) {
    // Render inline code without a container
    return <code className={prismClass} {...rest}>{children}</code>;
  }

  return (
    <div className="group">
      <pre ref={preRef} className={mergedClasses}>
        <code className={prismClass}>{children}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-2 rounded bg-gray-700 px-2 py-1 text-xs text-gray-100 hover:bg-gray-600"
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
