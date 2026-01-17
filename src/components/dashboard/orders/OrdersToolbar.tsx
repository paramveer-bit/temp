import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface OrdersToolbarProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onExport: () => void;
}

const OrdersToolbar: React.FC<OrdersToolbarProps> = ({
  searchInput,
  onSearchChange,
  onRefresh,
  onExport,
}) => {
  return (
    <div className="flex items-center gap-3 flex-1 justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <GridViewIcon className="h-4 w-4" />
            <KeyboardArrowDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>List View</DropdownMenuItem>
          <DropdownMenuItem>Grid View</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative flex-1 max-w-md">
        <Input
          type="text"
          placeholder="Search orders.."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 shadow-sm"
        />
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="icon" title="Refresh" onClick={onRefresh}>
          <RefreshIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="default"
          size="icon"
          title="Export"
          onClick={onExport}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90"
        >
          <FileDownloadIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrdersToolbar;
