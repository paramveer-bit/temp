import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trash } from 'lucide-react';
import { useDeleteProduct } from '@/hooks/use-query';

const Submit = ({
  isCreating,
  isUpdating,
  id,
}: {
  isCreating: boolean;
  isUpdating: boolean;
  id: string | undefined;
}) => {
  const { mutate, isPending } = useDeleteProduct();
  return (
    <div className="bg-white shadow-xs rounded-sm p-4 flex justify-end max-w-4xl gap-4">
      {id && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                aria-label="Add new item"
                className="bg-[#ffebe6] hover:bg-[#ffebe6]"
                disabled={isPending}
                onClick={() => mutate(id)}
              >
                <Trash size={16} strokeWidth={2} aria-hidden="true" color="#fd381d" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Completely remove this product
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <Button className="rounded-sm bg-linear text-white" disabled={isCreating || isUpdating}>
        Save Product
      </Button>
    </div>
  );
};

export default Submit;
