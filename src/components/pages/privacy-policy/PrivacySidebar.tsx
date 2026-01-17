'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarSection {
  title: string;
  items: string[];
}

interface PrivacySidebarProps {
  sections: SidebarSection[];
  selectedSection?: string;
  onSectionChange?: (section: string) => void;
}

const PrivacySidebar: React.FC<PrivacySidebarProps> = ({
  sections,
  selectedSection,
  onSectionChange,
}) => {
  const [selected, setSelected] = useState(selectedSection || 'Getting started: Overview');

  const handleSelectChange = (value: string) => {
    setSelected(value);
    onSectionChange?.(value);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-1/4 border-r border-gray-200 pr-6">
        <div className="sticky top-24">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2 text-base">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-600 hover:text-blue-700 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectChange(`${section.title}: ${item}`);
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Dropdown */}
      <div className="lg:hidden w-full mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Section</label>
        <select
          className="w-full border border-gray-300 rounded-md p-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selected}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          {sections.map((section) =>
            section.items.map((item) => (
              <option key={item} value={`${section.title}: ${item}`}>
                {section.title}: {item}
              </option>
            )),
          )}
        </select>
      </div>
    </>
  );
};

export default PrivacySidebar;
