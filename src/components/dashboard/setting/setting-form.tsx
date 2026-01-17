'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Building2,
  CreditCard,
  ShieldCheck,
  User2,
  PencilIcon,
  SaveIcon,
  XIcon,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sellerFormSchema, SellerFormValues } from '@/utils/validation';
import { PersonalTab } from './personal-tab';
import { BusinessTab } from './business-tab';
import { BankingTab } from './banking-tab';
import { VerificationTab } from './verification-tab';
import { useSellerUpdate } from '@/hooks/use-query';
import Header from './header';
import type { IUserDetails } from '@/types/types';

const SettingForm = ({ seller: initialSeller }: { seller: IUserDetails }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('personal');

  const form = useForm<SellerFormValues>({
    resolver: zodResolver(sellerFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      personal: {
        name: initialSeller.name,
        email: initialSeller.email,
        mobile_number: initialSeller.mobile_number,
        bio: initialSeller.bio || '',
        avatar: initialSeller.avatar || '',
      },
      business: {
        business_name: initialSeller.business_name,
        category: initialSeller.category,
        sub_category: initialSeller.sub_category,
        address: initialSeller.address,
        city: initialSeller.city,
        state: initialSeller.state,
        pin_code: initialSeller.pin_code || '',
        gst_number: initialSeller.gst_number?.trim() || '',
      },
      banking: {
        account_number: initialSeller.account_number,
        ifsc_code: initialSeller.ifsc_code?.trim() || '',
      },
    },
  });

  const { mutate, isPending } = useSellerUpdate(initialSeller._id as string);

  React.useEffect(() => {
    form.reset({
      personal: {
        name: initialSeller.name,
        email: initialSeller.email,
        mobile_number: initialSeller.mobile_number,
        bio: initialSeller.bio || '',
        avatar: initialSeller.avatar || '',
      },
      business: {
        business_name: initialSeller.business_name,
        category: initialSeller.category,
        sub_category: initialSeller.sub_category,
        address: initialSeller.address,
        city: initialSeller.city,
        state: initialSeller.state,
        pin_code: initialSeller.pin_code || '',
        gst_number: initialSeller.gst_number?.trim() || '',
      },
      banking: {
        account_number: initialSeller.account_number,
        ifsc_code: initialSeller.ifsc_code?.trim() || '',
      },
    });
  }, [initialSeller, form]);

  const onSubmit = (data: SellerFormValues) => {
    if (isPending) return;

    const submitData: any = {
      ...data.banking,
      ...data.business,
      ...data.personal,
    };

    if (submitData.bio === '') {
      submitData.bio = undefined;
    }
    if (submitData.avatar === '') {
      submitData.avatar = undefined;
    }

    if (submitData.gst_number) {
      const gst = String(submitData.gst_number).trim().toUpperCase();
      if (gst === '' || !/^[0-9A-Z]{15}$/.test(gst)) {
        submitData.gst_number = undefined;
        form.setValue('business.gst_number', '');
      } else {
        submitData.gst_number = gst;
      }
    } else {
      submitData.gst_number = undefined;
    }

    if (submitData.ifsc_code) {
      const ifsc = String(submitData.ifsc_code).trim().toUpperCase();
      if (ifsc === '' || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
        submitData.ifsc_code = undefined;
        form.setValue('banking.ifsc_code', '');
      } else {
        submitData.ifsc_code = ifsc;
      }
    } else {
      submitData.ifsc_code = undefined;
    }

    if (submitData.pin_code === '') {
      submitData.pin_code = undefined;
    }

    mutate(submitData as IUserDetails, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          const hasGstError = errors?.business?.gst_number;
          const hasIfscError = errors?.banking?.ifsc_code;
          const hasPinError = errors?.business?.pin_code;

          if (hasGstError) {
            form.setValue('business.gst_number', '');
          }
          if (hasIfscError) {
            form.setValue('banking.ifsc_code', '');
          }
          if (hasPinError) {
            form.setValue('business.pin_code', '');
          }

          const criticalErrors: string[] = [];
          if (errors.personal?.name) criticalErrors.push('Name is required');
          if (errors.personal?.email) criticalErrors.push('Email is invalid');
          if (errors.personal?.mobile_number) criticalErrors.push('Mobile number is invalid');
          if (errors.business?.business_name) criticalErrors.push('Business name is required');
          if (errors.business?.category) criticalErrors.push('Category is required');
          if (errors.business?.address) criticalErrors.push('Address is required');
          if (errors.business?.city) criticalErrors.push('City is required');
          if (errors.business?.state) criticalErrors.push('State is required');
          if (errors.banking?.account_number) criticalErrors.push('Account number is required');

          if (criticalErrors.length === 0 && (hasGstError || hasIfscError || hasPinError)) {
            form
              .trigger(['business.gst_number', 'banking.ifsc_code', 'business.pin_code'])
              .then(() => {
                setTimeout(() => form.handleSubmit(onSubmit)(), 200);
              });
            return;
          }

          if (criticalErrors.length > 0) {
            toast.error(criticalErrors.join(', '), {
              style: {
                background: '#ffebe6',
                color: '#fd381d',
              },
            });
          }
        })}
        className="space-y-6"
      >
        <Header data={initialSeller} form={form} isEditing={isEditing} />
        <Tabs
          defaultValue="personal"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2 bg-[#faf9fb]">
            <TabsTrigger
              value="personal"
              className={`${activeTab === 'personal' && 'bg-linear text-white'}`}
            >
              <User2
                className={`mr-2 h-4 w-4 hidden md:block ${activeTab === 'personal' && ' text-white'}`}
              />
              <p className={`${activeTab === 'personal' && ' text-white'}`}>Personal</p>
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className={`${activeTab === 'business' && 'bg-linear text-white'}`}
            >
              <Building2
                className={`mr-2 h-4 w-4 hidden md:block ${activeTab === 'business' && ' text-white'}`}
              />
              <p className={`${activeTab === 'business' && ' text-white'}`}>Business</p>
            </TabsTrigger>
            <TabsTrigger
              value="banking"
              className={`${activeTab === 'banking' && 'bg-linear text-white'}`}
            >
              <CreditCard
                className={`mr-2 h-4 w-4 hidden md:block ${activeTab === 'banking' && ' text-white'}`}
              />
              <p className={`${activeTab === 'banking' && ' text-white'}`}>Banking</p>
            </TabsTrigger>
            <TabsTrigger
              value="verification"
              className={`${activeTab === 'verification' && 'bg-linear text-white'}`}
            >
              <ShieldCheck
                className={`mr-2 h-4 w-4 hidden md:block ${activeTab === 'verification' && ' text-white'}`}
              />
              <p className={`${activeTab === 'verification' && ' text-white'}`}>Status</p>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalTab form={form} isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="business">
            <BusinessTab form={form} isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="banking">
            <BankingTab form={form} isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="verification">
            <VerificationTab category={form.watch('business.category')} />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <TooltipProvider>
            {!isEditing ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-linear hover:bg-linear"
                  >
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Edit Settings
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to edit your settings</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  <XIcon className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button disabled={isPending} className="bg-linear hover:bg-linear">
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <SaveIcon className="mr-2 h-4 w-4" />
                  )}
                  {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </TooltipProvider>
        </div>
      </form>
    </Form>
  );
};

export default SettingForm;
