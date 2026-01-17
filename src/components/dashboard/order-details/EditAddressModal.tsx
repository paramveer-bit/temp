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

interface EditAddressModalProps {
  open: boolean;
  onClose: () => void;
  order: IOrderDetails | null;
  addressType: 'shipping' | 'billing';
  onSave: (data: any) => Promise<void>;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  open,
  onClose,
  order,
  addressType,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    flat_No: order?.address_details?.flat_No || '',
    area: order?.address_details?.area || '',
    city: order?.address_details?.city || '',
    state: order?.address_details?.state || '',
    pincode: order?.address_details?.pincode?.toString() || '',
    country: order?.address_details?.country || 'India',
    name: order?.address_details?.name || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (order) {
      setFormData({
        flat_No: order.address_details?.flat_No || '',
        area: order.address_details?.area || '',
        city: order.address_details?.city || '',
        state: order.address_details?.state || '',
        pincode: order.address_details?.pincode?.toString() || '',
        country: order.address_details?.country || 'India',
        name: order.address_details?.name || '',
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
          flat_No: formData.flat_No,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: parseInt(formData.pincode) || 0,
          country: formData.country,
          name: formData.name,
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit {addressType === 'shipping' ? 'Shipping' : 'Billing'} Address
          </DialogTitle>
          <DialogDescription>Update {addressType} address details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="flat_No">Flat/House No.</Label>
              <Input
                id="flat_No"
                value={formData.flat_No}
                onChange={(e) => setFormData({ ...formData, flat_No: e.target.value })}
                placeholder="Enter flat/house number"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="area">Area/Street</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="Enter area/street"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  type="number"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="Enter pincode"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Enter country"
                  required
                />
              </div>
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

export default EditAddressModal;
