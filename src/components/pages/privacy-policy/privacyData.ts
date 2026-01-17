export interface SidebarSection {
  title: string;
  items: string[];
}

export const sidebarSections: SidebarSection[] = [
  {
    title: 'Getting started',
    items: ['Overview'],
  },
  {
    title: 'Privacy',
    items: ['Substance Privacy Policy', 'Privacy FAQ'],
  },
  {
    title: 'Data Requests',
    items: ['Data Request Overview', 'Data Request Policy', 'Transparency Report'],
  },
  {
    title: 'Compliance',
    items: [
      'Cookie Policy',
      "Substance's GDPR Commitment",
      'California Consumer Privacy Act (CCPA) FAQ',
      'FERPA Compliance',
    ],
  },
  {
    title: 'Security',
    items: ['Overview'],
  },
];

export const tableOfContentsItems: string[] = [
  'Applicability of this Privacy Policy',
  'Information We Collect and Receive',
  'How We Use Information',
  'Data Retention',
  'How We Share and Disclose Information',
  'Security',
  'Age Limitations',
  'Changes to this Privacy Policy',
  'International Data Transfers',
  'Data Protection Officer',
  'Identifying the Data Controller and Processor',
  'Your Rights',
  'California Privacy Rights',
  'Data Protection Authority',
  'Contacting Us',
];

export const effectiveDate = 'October 5, 2020';
