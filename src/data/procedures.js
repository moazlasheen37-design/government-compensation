// Generic stages of a request — used by the Coverage Cases page ("related procedures").
export const PROCESS_STEPS = [
  {
    id: 'prepare',
    icon: 'FolderCheck',
    title: { ar: 'تجهيز المستندات', en: 'Prepare documents' },
    text: {
      ar: 'يجمع المستفيد أو من ينوب عنه بتوكيل رسمي المستندات المطلوبة وفقًا لطريقة التقديم.',
      en: 'The beneficiary, or a representative holding an official power of attorney, gathers the documents required for the chosen route.',
    },
  },
  {
    id: 'submit',
    icon: 'FileUp',
    title: { ar: 'تقديم الطلب', en: 'Submit the request' },
    text: {
      ar: 'يُقدَّم الطلب مباشرة إلى الصندوق مرفقًا به المستندات المطلوبة، أو بموجب حكم قضائي صادر ضد الصندوق.',
      en: 'The request is filed directly with the Fund with the required documents, or under a court ruling against the Fund.',
    },
  },
  {
    id: 'review',
    icon: 'FileSearch',
    title: { ar: 'دراسة الطلب', en: 'Request review' },
    text: {
      ar: 'تقوم اللجان المختصة بدراسة المطالبة المقدمة وإصدار القرار بشأنها.',
      en: 'The competent committees study the claim and issue a decision on it.',
    },
  },
  {
    id: 'approve',
    icon: 'Stamp',
    title: { ar: 'اعتماد قرار التعويض', en: 'Compensation decision' },
    text: {
      ar: 'يصدر القرار بشأن المطالبة وفقًا للقوانين والقرارات المنظمة لعمل الصندوق.',
      en: 'A decision on the claim is issued in line with the laws and decisions regulating the Fund.',
    },
  },
  {
    id: 'disburse',
    icon: 'HandCoins',
    title: { ar: 'صرف التعويض', en: 'Disbursement' },
    text: {
      ar: 'يُصرف التعويض المستحق للورثة الشرعيين أو للمستفيد في حالة الإصابة بعد استيفاء مستندات الصرف.',
      en: 'Compensation is paid to the legal heirs, or to the beneficiary in injury cases, once the payment documents are complete.',
    },
  },
];

/** Cases covered by the Fund — Article 20 of Law 72/2007 as published on the official website. */
export const ELIGIBILITY_CASES = [
  { id: 'unknown-vehicle', icon: 'CircleHelp', title: { ar: 'عدم معرفة المركبة المسؤولة', en: 'The responsible vehicle is unknown' }, text: { ar: 'الحوادث التي لا تُعرف فيها المركبة المسؤولة عن الحادث.', en: 'Accidents in which the vehicle responsible is not identified.' } },
  { id: 'uninsured', icon: 'ShieldOff', title: { ar: 'عدم وجود تأمين على المركبة لصالح الغير', en: 'No third-party insurance on the vehicle' }, text: { ar: 'الحوادث التي تقع من مركبة غير مؤمَّن عليها لصالح الغير.', en: 'Accidents caused by a vehicle with no third-party insurance.' } },
  { id: 'exempt', icon: 'Car', title: { ar: 'المركبات المعفاة من إجراءات الترخيص', en: 'Vehicles exempt from licensing procedures' }, text: { ar: 'حوادث المركبات المعفاة من إجراءات الترخيص.', en: 'Accidents involving vehicles exempt from licensing procedures.' } },
  { id: 'insolvency', icon: 'Building2', title: { ar: 'إعسار شركات التأمين كليًا أو جزئيًا', en: 'Full or partial insolvency of insurers' }, text: { ar: 'حالات إعسار شركات التأمين إعسارًا كليًا أو جزئيًا.', en: 'Cases where an insurance company is fully or partially insolvent.' } },
  { id: 'fra-decision', icon: 'Gavel', title: { ar: 'حالات أخرى بقرار من الهيئة العامة للرقابة المالية', en: 'Other cases set by the Financial Regulatory Authority' }, text: { ar: 'الحالات الأخرى التي يصدر بشأنها قرار من مجلس إدارة الهيئة العامة للرقابة المالية.', en: 'Other cases designated by decision of the FRA board of directors.' } },
];

/** Required documents — from the official Procedures page charts (iaf.gov.eg). */
export const DOCUMENT_GROUPS = [
  {
    id: 'settlement',
    icon: 'Handshake',
    title: { ar: 'مستندات التسوية الودية', en: 'Amicable settlement documents' },
    items: [
      { ar: 'صورة رسمية من محضر الحادث.', en: 'An official copy of the accident police report.' },
      { ar: 'نموذج (40) نيابة أو شهادة من الجدول.', en: 'Prosecution Form (40) or a certificate from the court register.' },
      { ar: 'شهادة الوفاة والرقم القومي للمتوفى (في حالة الوفاة).', en: 'Death certificate and national ID of the deceased (in case of death).' },
      { ar: 'إعلام وراثة (في حالة الوفاة).', en: 'Inheritance determination (in case of death).' },
      { ar: 'شهادة بيانات يُذكر بها آخر فترة تأمين قبل الحادث، وعدم وجود تأمين في تاريخ الحادث (في حالة معرفة السيارة).', en: 'A statement showing the last insurance period before the accident and that no insurance existed on the accident date (where the vehicle is known).' },
      { ar: 'صورة شخصية مقاس 4×6 (في حالة الإصابة فقط).', en: 'A 4×6 personal photo (injury cases only).' },
    ],
  },
  {
    id: 'ruling',
    icon: 'Scale',
    title: { ar: 'المستندات المطلوبة في حالة الحكم القضائي', en: 'Documents for a court ruling' },
    items: [
      { ar: 'صورة الصيغة التنفيذية والحكم المستأنف، والأصل للاطلاع عليه عند التقديم.', en: 'Copies of the enforceable writ and the appeal ruling, with the original shown on submission.' },
      { ar: 'أصل الإعلام الشرعي.', en: 'The original legal inheritance determination.' },
      { ar: 'صورة من محضر الحادث ونموذج (40) نيابة أو شهادة من الجدول.', en: 'A copy of the accident report and Prosecution Form (40) or a court-register certificate.' },
      { ar: 'صورة التقرير الطبي (في حالة الإصابة).', en: 'A copy of the medical report (injury cases).' },
      { ar: 'صور بطاقات الرقم القومي للورثة وشهادات ميلاد القُصّر.', en: 'Copies of the heirs’ national IDs and minors’ birth certificates.' },
    ],
  },
  {
    id: 'payment',
    icon: 'Wallet',
    title: { ar: 'المطلوب يوم الصرف', en: 'Required on payment day' },
    items: [
      { ar: 'أرقام حسابات بنكية أو كارت مدفوعات حكومية تابع للبريد.', en: 'Bank account numbers or a postal government payment card.' },
      { ar: 'أرقام حسابات القُصّر (إن وجدوا) معتمدة من النيابة الحسبية.', en: 'Minors’ account numbers (if any) certified by the Guardianship Prosecution.' },
      { ar: 'في حالة عدم إجادة الكتابة يلزم وجود ختم.', en: 'A personal seal is required for anyone unable to write.' },
      { ar: 'بطاقات الرقم القومي سارية.', en: 'Valid national ID cards.' },
    ],
  },
];
