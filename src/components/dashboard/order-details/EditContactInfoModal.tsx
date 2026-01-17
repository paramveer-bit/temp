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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IOrderDetails } from '@/types/types';

interface EditContactInfoModalProps {
  open: boolean;
  onClose: () => void;
  order: IOrderDetails | null;
  onSave: (data: any) => Promise<void>;
}

const EditContactInfoModal: React.FC<EditContactInfoModalProps> = ({
  open,
  onClose,
  order,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    email: order?.customerInfo?.email || order?.address_details?.email || '',
    phone: order?.customerInfo?.phone || order?.address_details?.phone_number || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (order) {
      setFormData({
        email: order.customerInfo?.email || order.address_details?.email || '',
        phone: order.customerInfo?.phone || order.address_details?.phone_number || '',
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        address_details: {
          ...order?.address_details,
          email: formData.email,
          phone_number: formData.phone,
        },
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
          <DialogTitle>Edit Contact Information</DialogTitle>
          <DialogDescription>Update customer contact details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
                required
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

export default EditContactInfoModal;
