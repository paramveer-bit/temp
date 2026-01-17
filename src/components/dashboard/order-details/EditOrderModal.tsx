import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { IOrderDetails } from '@/types/types';

interface EditOrderModalProps {
  open: boolean;
  onClose: () => void;
  order: IOrderDetails | null;
  onSave: (data: any) => Promise<void>;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({ open, onClose, order, onSave }) => {
  const [formData, setFormData] = useState({
    status: order?.status || 'Pending',
    paymentStatus: (order as any)?.paymentStatus || 'Pending',
    status_info: order?.status_info || '',
    orderNotes: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (order) {
      setFormData({
        status: order.status || 'Pending',
        paymentStatus: (order as any)?.paymentStatus || 'Pending',
        status_info: order.status_info || '',
        orderNotes: '',
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        status: formData.status,
        paymentStatus: formData.paymentStatus,
        status_info: formData.status_info,
        ...(formData.orderNotes && {
          orderNotes: [
            ...((order as any)?.orderNotes || []),
            {
              note: formData.orderNotes,
              addedBy: 'seller',
              noteByModel: 'Seller',
              createdAt: new Date(),
            },
          ],
        }),
      });
      onClose();
    } catch (error) {
      // Error is handled by the onSave callback
    } finally {
      setIsSaving(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>Update order status and information</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Order Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approval">Approval</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Payment">Payment</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Ordered">Ordered</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value) => setFormData({ ...formData, paymentStatus: value })}
              >
                <SelectTrigger id="paymentStatus">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status_info">Status Information</Label>
              <Textarea
                id="status_info"
                value={formData.status_info}
                onChange={(e) => setFormData({ ...formData, status_info: e.target.value })}
                placeholder="Enter status information..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="orderNotes">Add Order Note</Label>
              <Textarea
                id="orderNotes"
                value={formData.orderNotes}
                onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                placeholder="Add a note to this order..."
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="bg-[#F87D3F] hover:bg-[#e66d2f]">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderModal;
