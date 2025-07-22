import React from 'react';

interface MonospacedCopyBlockProps {
  text: string;
  onCopy?: () => void;
}

const MonospacedCopyBlock: React.FC<MonospacedCopyBlockProps> = ({ text, onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      if (onCopy) onCopy();
    });
  };

  return (
    <div className="relative bg-gray-900 text-green-400 font-mono p-4 rounded shadow-lg overflow-auto max-h-64">
      <pre className="whitespace-pre-wrap break-words">{text}</pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-green-700 hover:bg-green-600 text-green-100 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        aria-label="Copy to clipboard"
      >
        Copy
      </button>
    </div>
  );
};

export default MonospacedCopyBlock;
