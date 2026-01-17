import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { SearchIcon } from 'lucide-react';
import React from 'react';

const Search = ({ table }: { table: Table<any> }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" strokeWidth={2} />
      </div>
      <Input
        id="product-search"
        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
        placeholder="Search products..."
        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
        type="search"
      />
    </div>
  );
};

export default Search;
