import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface IPaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: IPaginationProps<TData>) {
  const [defaultPage, setDefaultPage] = useState(50);

  React.useEffect(() => {
    if (table.getState().pagination.pageSize !== defaultPage) {
      table.setPageSize(defaultPage);
    }
  }, [defaultPage, table]);
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const startRow = totalRows > 0 ? pageIndex * pageSize + 1 : 0;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-2 border-t border-gray-200">
      <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
        {totalRows > 0 ? (
          <span>
            Showing <span className="font-medium text-gray-900">{startRow}</span> to{' '}
            <span className="font-medium text-gray-900">{endRow}</span> of{' '}
            <span className="font-medium text-gray-900">{totalRows}</span> products
          </span>
        ) : (
          <span className="text-gray-500">No products</span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto order-1 sm:order-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Rows per page:</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: any) => {
              const newPageSize = Number(value);
              setDefaultPage(newPageSize);
              table.setPageSize(newPageSize);
            }}
          >
            <SelectTrigger className="h-9 w-[75px] sm:w-[85px] text-sm border-gray-300">
              <SelectValue placeholder={table.getState().pagination.pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
            Page{' '}
            <span className="font-medium text-gray-900">
              {table.getState().pagination.pageIndex + 1}
            </span>{' '}
            of <span className="font-medium text-gray-900">{table.getPageCount() || 1}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex border-gray-300 hover:bg-gray-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-300 hover:bg-gray-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-300 hover:bg-gray-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex border-gray-300 hover:bg-gray-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
