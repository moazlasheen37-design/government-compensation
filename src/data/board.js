// Source: official website (iaf.gov.eg — Board page and news of 9 January 2025).
const chairmanPhoto = encodeURI('/images/chairman/عادل موسى.jpeg');

export const CHAIRMAN = {
  id: 'chairman',
  photo: chairmanPhoto,
  photoPosition: '80% 28%',
  name: { ar: 'الدكتور / عادل أحمد موسى', en: 'Dr. Adel Ahmed Moussa' },
  position: { ar: 'رئيس مجلس إدارة الصندوق الحكومي', en: 'Chairman of the Board, Government Fund' },
  appointment: {
    ar: 'صدر قرار رئيس مجلس الوزراء رقم 4525 لسنة 2024 بتعيينه رئيسًا لمجلس إدارة الصندوق الحكومي.',
    en: 'Appointed Chairman of the Board of the Government Fund by Prime Ministerial Decree No. 4525 of 2024.',
  },
  qualifications: [
    { ar: 'بكالوريوس تجارة – شعبة تجارة خارجية – كلية التجارة وإدارة الأعمال – جامعة حلوان، عام 1977.', en: 'B.Com., Foreign Trade — Faculty of Commerce and Business Administration, Helwan University, 1977.' },
    { ar: 'دبلوم الدراسات الإسلامية – معهد الدراسات الإسلامية، عام 1980.', en: 'Diploma in Islamic Studies — Institute of Islamic Studies, 1980.' },
    { ar: 'دبلوم الدراسات العليا تأمينات عامة – جامعة القاهرة، عام 1984.', en: 'Postgraduate Diploma in General Insurance — Cairo University, 1984.' },
    { ar: 'ماجستير في الاقتصاد والتجارة الخارجية، تخصص اقتصاديات التجارة الخارجية، عام 2000.', en: 'M.A. in Economics and Foreign Trade (Foreign Trade Economics), 2000.' },
    { ar: 'دكتوراه في الاقتصاد والتجارة الخارجية، تخصص اقتصاديات التجارة الخارجية، عام 2006.', en: 'Ph.D. in Economics and Foreign Trade (Foreign Trade Economics), 2006.' },
  ],
  previousPositions: [
    { ar: 'رئيس مجلس الإدارة والعضو المنتدب السابق لشركة مصر للتأمين، إحدى الشركات التابعة لمجموعة مصر القابضة للتأمين.', en: 'Former Chairman and Managing Director of Misr Insurance, a subsidiary of Misr Insurance Holding Group.' },
    { ar: 'رئيس مجلس الإدارة والعضو المنتدب السابق لشركة الدلتا للتأمين.', en: 'Former Chairman and Managing Director of Delta Insurance.' },
  ],
};

/**
 * Board composition as published on the official website (positions only — no names were published
 * for members). This is the published composition and may require updating after later formation decrees.
 */
export const BOARD_COMPOSITION = [
  { id: 'chair', role: { ar: 'رئيس مجلس الإدارة', en: 'Chairman' }, title: { ar: 'الدكتور / عادل موسى', en: 'Dr. Adel Moussa' } },
  { id: 'ifeg', role: { ar: 'عضو', en: 'Member' }, title: { ar: 'رئيس الاتحاد المصري للتأمين', en: 'Chairman of the Insurance Federation of Egypt' } },
  { id: 'misr', role: { ar: 'عضو', en: 'Member' }, title: { ar: 'رئيس مجلس إدارة شركة مصر للتأمين', en: 'Chairman of Misr Insurance' } },
  { id: 'royal', role: { ar: 'عضو', en: 'Member' }, title: { ar: 'العضو المنتدب لشركة رويال للتأمين – مصر', en: 'Managing Director of Royal Insurance – Egypt' } },
  { id: 'saudi', role: { ar: 'عضو', en: 'Member' }, title: { ar: 'العضو المنتدب لشركة بيت التأمين المصري السعودي', en: 'Managing Director of Egyptian Saudi Insurance House' } },
  {
    id: 'interior',
    role: { ar: 'عضو', en: 'Member' },
    title: { ar: 'ممثل وزارة الداخلية', en: 'Representative of the Ministry of Interior' },
    note: { ar: 'لم يتم التعيين حتى الآن (وفقًا للموقع الرسمي).', en: 'Not yet appointed (per the official website).' },
  },
];
