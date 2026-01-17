import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface OrderActionsProps {
  orderShortId: string;
  onView: (orderShortId: string) => void;
  onDelete: (orderShortId: string) => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ orderShortId, onView, onDelete }) => {
  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(orderShortId)}
        className="h-8 w-8"
        title="Print"
      >
        <PrintIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(orderShortId)}
        className="h-8 w-8 text-red-600 hover:text-red-700"
        title="Delete Order"
      >
        <DeleteIcon className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="More options">
            <MoreVertIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(orderShortId)}>View Details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(orderShortId)}>Delete Order</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OrderActions;
