import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  displayCount: number;
  onPageChange: (page: number) => void;
}

const OrdersPagination: React.FC<OrdersPaginationProps> = ({
  currentPage,
  totalPages,
  total,
  displayCount,
  onPageChange,
}) => {
  // ✅ Compute page numbers directly inside useMemo (no missing dependency warnings)
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1); // Always show first page

    if (currentPage <= 3) {
      // Show first 5 pages and last
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Show first and last 5 pages
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, current-1, current, current+1, last
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <div className="text-sm text-gray-600">
        {total > 0 ? `Show ${displayCount} from ${total} orders` : `No orders found`}
      </div>

      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || totalPages === 0}
          className="h-8 w-8 p-0"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        {pageNumbers.map((p, idx) =>
          typeof p === 'number' ? (
            <Button
              key={`p-${p}`}
              variant={currentPage === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(p)}
              className={currentPage === p ? 'bg-[#201781] text-white h-8 min-w-8' : 'h-8 min-w-8'}
            >
              {p}
            </Button>
          ) : (
            <span key={`e-${idx}`} className="px-2 text-gray-400">
              …
            </span>
          ),
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages || totalPages === 0}
          className="h-8 w-8 p-0"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrdersPagination;
