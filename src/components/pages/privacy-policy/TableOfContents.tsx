import React from 'react';

interface TableOfContentsProps {
  items: string[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const scrollToSection = (item: string) => {
    const id = item.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Table of Contents:</h2>

      <ul className="list-disc ml-6 space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => scrollToSection(item)}
              className="text-blue-700 hover:text-blue-800 hover:underline text-sm transition-colors"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
