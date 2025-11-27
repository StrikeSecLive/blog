import { useState } from 'react';

export default function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4">
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded transition"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
