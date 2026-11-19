// Central institutional information — verified against the official website (iaf.gov.eg, November 2026).
export const CONTACT = {
  // Main phone shown in the official website header.
  phone: '02 25775739',
  phoneTel: '+20225775739',
  email: 'info@iaf.gov.eg',
  location: { ar: '20 شارع عماد الدين — القاهرة', en: '20 Emad El-Din Street — Cairo' },
  workingHours: { ar: 'الأحد – الخميس: 8:30 ص – 1:30 م', en: 'Sunday – Thursday: 8:30 AM – 1:30 PM' },
  branches: [
    {
      id: 'cairo',
      name: { ar: 'المقر الرئيسي — القاهرة', en: 'Head office — Cairo' },
      address: {
        ar: '20 شارع عماد الدين — أمام مسرح نجيب الريحاني — القاهرة',
        en: '20 Emad El-Din Street, opposite Naguib El-Rihani Theatre, Cairo',
      },
      phone: '02 25767828',
      phoneTel: '+20225767828',
      map: 'https://www.google.com/maps?q=30.0562391,31.2485811',
    },
    {
      id: 'tanta',
      name: { ar: 'فرع طنطا', en: 'Tanta branch' },
      address: {
        ar: 'تقاطع شارع الجلاء مع شارع البحر — برج نايل الرواد — أمام مبنى مصر للتأمين ومول رنين — الدور الثالث',
        en: 'Corner of El-Galaa St. and El-Bahr St., Nile El-Rowad Tower (opposite Misr Insurance building and Raneen Mall), 3rd floor',
      },
      phone: '040 3330234',
      phoneTel: '+20403330234',
    },
  ],
};

/** Social accounts: official URLs were not published. Set `url` when approved; icons stay non-clickable until then. */
export const SOCIAL = [
  { id: 'facebook', label: 'Facebook', url: null },
  { id: 'x', label: 'X', url: null },
];

/** Primary navigation. `children` render as dropdowns on desktop and accordions on mobile. */
export const NAVIGATION = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'procedures', to: '/compensation-procedures' },
  { key: 'coverage', to: '/coverage-cases' },
  { key: 'laws', to: '/laws-and-regulations' },
  { key: 'board', to: '/board-of-directors' },
  { key: 'news', to: '/news' },
  {
    key: 'complaintsGroup',
    to: '/complaints',
    children: [
      { key: 'complaints', descKey: 'complaints', to: '/complaints', icon: 'MessageSquareText' },
      { key: 'contact', descKey: 'contact', to: '/contact', icon: 'PhoneCall' },
      { key: 'faq', descKey: 'faq', to: '/faq', icon: 'CircleHelp' },
    ],
  },
];
