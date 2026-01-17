'use client';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShieldCheck, Camera, Loader2, Trash2, MoreVertical } from 'lucide-react';
import { uploadMedia } from '@/hooks/use-query';
import { SellerFormValues } from '@/utils/validation';

interface HeaderProps {
  data: import('@/types/types').IUserDetails;
  form?: UseFormReturn<SellerFormValues>;
  isEditing?: boolean;
}

const Header = ({ data, form, isEditing = false }: HeaderProps) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const avatar = form?.watch('personal.avatar') || data.avatar;
  const bio = form?.watch('personal.bio') || data.bio;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const uploadAbortControllerRef = React.useRef<AbortController | null>(null);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file || !form) {
      return;
    }

    if (isUploading) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    if (uploadAbortControllerRef.current) {
      uploadAbortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    uploadAbortControllerRef.current = abortController;

    setIsUploading(true);
    event.target.value = '';

    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await uploadMedia(fd, abortController.signal);

      if (abortController.signal.aborted) {
        return;
      }

      if (res !== undefined && res[0]?.url) {
        form.setValue('personal.avatar', res[0].url);
      }
    } catch (error: any) {
      if (error.name === 'AbortError' || error.name === 'CanceledError') {
        return;
      }

      alert('Failed to upload image. Please try again.');
    } finally {
      if (uploadAbortControllerRef.current === abortController) {
        setIsUploading(false);
        uploadAbortControllerRef.current = null;
      }
    }
  };

  const handleDeleteAvatar = () => {
    if (form) {
      form.setValue('personal.avatar', '');
      setShowDeleteDialog(false);
    }
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (form) {
      form.setValue('personal.bio', e.target.value);
    }
  };

  const getAvatarSrc = () => {
    if (avatar && avatar.trim() !== '') {
      return avatar;
    }
    return `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`;
  };

  const hasAvatar = !!(avatar && avatar.trim() !== '');

  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex items-center gap-4 w-full">
        <div className="relative group flex-shrink-0">
          <Avatar className="h-20 w-20 border-2 border-gray-200">
            <AvatarImage src={getAvatarSrc()} alt={data.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {data.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <>
              {/* Hover overlay with camera icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                {isUploading ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </div>

              {/* Dropdown menu for more options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background border-2 border-background shadow-md hover:bg-muted"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleChangePhoto} disabled={isUploading}>
                    <Camera className="mr-2 h-4 w-4" />
                    {hasAvatar ? 'Change Photo' : 'Upload Photo'}
                  </DropdownMenuItem>
                  {hasAvatar && (
                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Photo
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Hidden file input - used by both dropdown and click */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={isUploading}
              />

              {/* Click on avatar to upload directly */}
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={(e) => {
                  if (!isUploading && fileInputRef.current) {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }
                }}
              />
            </>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>

          {/* Bio Section - Always visible */}
          <div className="mt-4">
            {isEditing ? (
              <>
                <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
                <Textarea
                  placeholder="Write a short bio about yourself..."
                  value={bio || ''}
                  onChange={handleBioChange}
                  className="min-h-[80px] resize-none w-full"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {bio?.length || 0}/500 characters
                </p>
              </>
            ) : (
              <div className="mt-2">
                <label className="text-sm font-medium text-foreground mb-1 block">Bio</label>
                {bio && bio.trim() ? (
                  <p
                    className="text-muted-foreground max-w-2xl leading-relaxed"
                    suppressHydrationWarning
                  >
                    {bio}
                  </p>
                ) : (
                  <p
                    className="text-muted-foreground italic text-sm max-w-2xl leading-relaxed py-2"
                    suppressHydrationWarning
                  >
                    No bio added yet. Click &quot;Edit Settings&quot; to add a bio.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            <Badge variant="success">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Verified Seller
            </Badge>
            <Badge variant="outline">{data.category}</Badge>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Profile Picture?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove your profile picture? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAvatar}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
