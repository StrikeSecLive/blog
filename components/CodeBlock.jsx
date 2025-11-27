
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
        className="
          absolute top-2 right-2
          rounded-md bg-gray-700 hover:bg-gray-600
          text-xs text-white font-medium
          px-3 py-1
          transition-colors duration-200
          shadow-sm
        "        
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
