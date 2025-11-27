
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

  const language = className?.replace(/language-/, '') || 'text';
  const prismClass = `language-${language}`;
  const baseClasses =
    'relative bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm';
  const mergedClasses = className ? `${baseClasses} ${className}` : baseClasses;

  if (inline) {
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
      className={`copy-btn ${copied ? 'copied' : ''}`}
      aria-label="Copy code to clipboard"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        className="icon"
      >
        <path d="M19 21H9V7h10v14zm-2-2V9H11v10h6zM5 3h10v2H5v14H3V5h2V3z" />
      </svg>
      {copied ? 'Copied!' : 'Copy Code'}
    </button>

    </div>
  );
}
