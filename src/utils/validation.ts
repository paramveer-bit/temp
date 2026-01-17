import * as z from 'zod';

const validateUrl = (val: string) => {
  if (!val || val === '') return true;
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};

const validateGst = (val: string) => {
  if (!val || val.trim() === '') return true;
  const cleaned = val.trim().toUpperCase();
  return /^[0-9A-Z]{15}$/.test(cleaned);
};

const validateIfsc = (val: string) => {
  if (!val || val.trim() === '') return true;
  const cleaned = val.trim().toUpperCase();
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleaned);
};

export const sellerFormSchema = z.object({
  personal: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    mobile_number: z.string().regex(/^\d{10,12}$/, 'Mobile number must be between 10-12 digits'),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional().or(z.literal('')),
    avatar: z
      .string()
      .refine(validateUrl, { message: 'Invalid avatar URL' })
      .optional()
      .or(z.literal('')),
  }),
  business: z.object({
    business_name: z.string().min(2, 'Business name must be at least 2 characters'),
    category: z.string().min(1, 'Category is required'),
    sub_category: z.array(z.string()),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pin_code: z
      .string()
      .optional()
      .refine((val) => !val || val === '' || /^\d{6}$/.test(val), { message: 'Invalid pincode' })
      .or(z.literal('')),
    gst_number: z
      .string()
      .refine(validateGst, { message: 'Invalid GST number (must be 15 alphanumeric characters)' })
      .optional()
      .or(z.literal('')),
  }),
  banking: z.object({
    account_number: z.string().min(9, 'Invalid account number'),
    ifsc_code: z
      .string()
      .refine(validateIfsc, { message: 'Invalid IFSC code (format: AAAA0XXXXX)' })
      .optional()
      .or(z.literal('')),
  }),
});

export const seoSchema = z.object({
  meta_title: z.string(),
  meta_keyword: z.string(),
  meta_image_url: z.string().url(),
  robot_tag: z.string(),
  slug: z.string(),
  meta_description: z.string(),
});

export const selectedCast = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    description: z.string(),
  }),
);

export const influencerSchema = z.object({
  title: z.string(),
  description: z.string(),
  medias: z.string(),
  properties: z.object({
    platform: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
    instagramUsername: z.string().optional(),
    instagramFollowers: z.coerce.number().optional(),
    instagramReelCommercial: z.coerce.number().optional(),
    instagramImagePostCommercial: z.coerce.number().optional(),
    instagramStoryCommercial: z.coerce.number().optional(),
    facebookUsername: z.string().optional(),
    facebookFollowers: z.coerce.number().optional(),
    facebookPostCommercial: z.coerce.number().optional(),
    youtubeUsername: z.string().optional(),
    youtubeSubscribers: z.coerce.number().optional(),
    youtubeVideoCommercial: z.coerce.number().optional(),
    youtubeShortsCommercial: z.coerce.number().optional(),
    twitterUsername: z.string().optional(),
    twitterFollowers: z.coerce.number().optional(),
    twitterTweetsCommercial: z.coerce.number().optional(),
    location: z.string(),
    gender: z.string(),
    tag: z.object({
      category: z.string(),
      subCategory: z.string(),
    }),
    brand: z
      .object({
        brandName: z.string(),
        brandImage: z.string().url(),
      })
      .array()
      .optional(),
    carousel: z.string().array(),
  }),
});
export const oohSchema = z.object({
  title: z.string(),
  description: z.string(),
  medias: z.string(),

  properties: z.object({
    mediaType: z.enum(['Image', 'Video']),
    price: z.coerce.number(),
    lighting: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
    location: z.string(),
    coordination: z.string(),
    adType: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one add type .',
    }),
    carousel: z.string().array(),
    size: z.string(),
    subLocation: z.string(),
  }),
});
export const newspaperSchema = z.object({
  title: z.string(),
  description: z.string(),
  medias: z.string(),

  properties: z.object({
    section: z.string(),
    language: z.string(),
    adType: z.string(),
    carousel: z.string().array(),
    printCirculation: z.string(),
    circulationLocation: z.array(
      z.object({
        location: z.string(),
        count: z.coerce.number(),
      }),
    ),
    adDimenions: z.array(
      z.object({
        title: z.string(),
        price: z.string(),
        image: z.array(z.string()),
      }),
    ),
  }),
});
export const magazineSchema = z.object({
  title: z.string(),
  description: z.string(),
  medias: z.string(),

  properties: z.object({
    category: z.string(),
    language: z.string(),
    adType: z.string(),
    carousel: z.string().array(),
    printCirculation: z.string(),
    circulationLocation: z.array(
      z.object({
        location: z.string(),
        count: z.coerce.number(),
      }),
    ),
    adDimenions: z.array(
      z.object({
        title: z.string(),
        price: z.string(),
        image: z.array(z.string()),
      }),
    ),
  }),
});
export const radioSchema = z.object({
  title: z.string(),
  description: z.string(),
  medias: z.string(),
  properties: z.object({
    listener: z.string(),
    timeSlot: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one Time slot',
    }),
    station: z.string(),
    frequency: z.string(),
    adUnit: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
    priceRadioJingleAds: z.coerce.number().optional(),
    durationRadioJingleAds: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one duration',
      })
      .optional(),
    priceRJMentions: z.coerce.number().optional(),
    durationRJMentions: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one duration',
      })
      .optional(),
    priceRadioInterview: z.coerce.number().optional(),
    durationRadioInterview: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one duration',
      })
      .optional(),
    priceProgramSponsorships: z.coerce.number().optional(),
    durationProgramSponsorships: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one duration',
      })
      .optional(),
    carousel: z.string().array(),
    cast: selectedCast,
  }),
});
export const tvSchema = z.object({
  title: z.string(),
  description: z.string(),
  medias: z.string(),
  properties: z.object({
    viewership: z.string(),
    timeSlot: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one Time slot',
    }),
    channel: z.string(),
    adUnit: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
    priceAstonBands: z.coerce.number().optional(),
    durationAstonBands: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one duration',
      })
      .optional(),
    priceLBands: z.coerce.number().optional(),
    durationLBands: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one duration',
      })
      .optional(),
    priceTVAdBreak: z.coerce.number().optional(),
    durationTVAdBreak: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'You have to select at least one duration',
      })
      .optional(),
    carousel: z.string().array(),
    cast: selectedCast,
  }),
});

export type SellerFormValues = z.infer<typeof sellerFormSchema>;
export type InfluencerFormValues = z.infer<typeof influencerSchema>;
export type OOHFormValues = z.infer<typeof oohSchema>;
export type NewspaperFormValues = z.infer<typeof newspaperSchema>;
export type MagazineFormValues = z.infer<typeof magazineSchema>;
export type RadioFormValues = z.infer<typeof radioSchema>;
export type TVFormValues = z.infer<typeof tvSchema>;
export type CastFormValues = z.infer<typeof selectedCast>;
