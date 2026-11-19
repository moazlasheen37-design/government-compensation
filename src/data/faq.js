/**
 * FAQ — every answer is based on content published on the official website (iaf.gov.eg).
 * `procedures: true` marks questions shown on the Compensation Procedures page.
 */
export const FAQ_CATEGORIES = [
  { id: 'general', icon: 'Info', label: { ar: 'معلومات عامة', en: 'General information' } },
  { id: 'eligibility', icon: 'ShieldCheck', label: { ar: 'حالات الاستحقاق', en: 'Eligibility' } },
  { id: 'documents', icon: 'Files', label: { ar: 'المستندات المطلوبة', en: 'Required documents' } },
  { id: 'procedures', icon: 'ClipboardList', label: { ar: 'إجراءات التقديم', en: 'Application procedures' } },
  { id: 'complaints', icon: 'MessageSquareText', label: { ar: 'الشكاوى والتواصل', en: 'Complaints & contact' } },
];

export const FAQS = [
  {
    id: 'what-is-fund',
    category: 'general',
    q: { ar: 'ما هو الصندوق الحكومي؟', en: 'What is the Government Fund?' },
    a: {
      ar: 'الصندوق الحكومي جهة ذات طبيعة خاصة تتمتع بالشخصية الاعتبارية المستقلة، أنشئ لتغطية الأضرار الناتجة عن بعض حوادث مركبات النقل السريع داخل جمهورية مصر العربية، وفقًا للأحكام القانونية والقرارات المنظمة.',
      en: 'The Government Fund is a body of a special nature with independent legal personality, established to cover damages resulting from certain rapid transport vehicle accidents in Egypt, in accordance with the governing laws and decisions.',
    },
  },
  {
    id: 'funding',
    category: 'general',
    q: { ar: 'كيف يتم تمويل الصندوق؟', en: 'How is the Fund financed?' },
    a: {
      ar: 'يتم تمويل الصندوق من خلال شركات التأمين العامة والخاصة المرخص لها بمزاولة نشاط التأمين الإجباري، وفقًا للنسبة والقرارات المنظمة، كما تتحمل هذه الشركات أي عجز مالي يواجه الصندوق.',
      en: 'The Fund is financed by public and private insurance companies licensed for compulsory insurance, according to the set ratio and governing decisions. These companies also bear any financial deficit the Fund faces.',
    },
  },
  {
    id: 'covered-cases',
    category: 'eligibility',
    q: { ar: 'ما الحالات التي يغطيها الصندوق؟', en: 'Which cases does the Fund cover?' },
    a: {
      ar: 'يغطي الصندوق الحالات التالية: عدم معرفة المركبة المسؤولة عن الحادث، وعدم وجود تأمين على المركبة لصالح الغير، وحوادث المركبات المعفاة من إجراءات الترخيص، وحالات إعسار شركات التأمين كليًا أو جزئيًا، والحالات الأخرى التي يصدر بشأنها قرار من مجلس إدارة الهيئة العامة للرقابة المالية.',
      en: 'The Fund covers: accidents where the responsible vehicle is unknown; vehicles with no third-party insurance; vehicles exempt from licensing procedures; full or partial insolvency of insurers; and other cases designated by the board of the Financial Regulatory Authority.',
    },
  },
  {
    id: 'who-can-apply',
    category: 'procedures',
    procedures: true,
    q: { ar: 'من يمكنه تقديم طلب التعويض؟', en: 'Who can submit a compensation request?' },
    a: {
      ar: 'يتقدم المستفيدون أو من ينوب عنهم بتوكيل رسمي بطلب صرف التعويض إلى الصندوق مباشرة. ويُصرف التعويض المستحق للورثة الشرعيين، أو للمستفيد في حالة الإصابة.',
      en: 'Beneficiaries, or a representative holding an official power of attorney, apply directly to the Fund. Compensation is paid to the legal heirs, or to the beneficiary in injury cases.',
    },
  },
  {
    id: 'settlement-documents',
    category: 'documents',
    procedures: true,
    q: { ar: 'ما المستندات المطلوبة للتسوية الودية؟', en: 'Which documents are needed for an amicable settlement?' },
    a: {
      ar: 'صورة رسمية من محضر الحادث، ونموذج (40) نيابة أو شهادة من الجدول، وشهادة الوفاة والرقم القومي للمتوفى وإعلام الوراثة في حالة الوفاة، وشهادة بيانات بآخر فترة تأمين قبل الحادث في حالة معرفة السيارة، وصورة شخصية مقاس 4×6 في حالة الإصابة فقط.',
      en: 'An official copy of the accident report; Prosecution Form (40) or a court-register certificate; the death certificate, national ID of the deceased and inheritance determination in death cases; an insurance statement showing the last insurance period before the accident where the vehicle is known; and a 4×6 photo in injury cases only.',
    },
  },
  {
    id: 'court-ruling',
    category: 'procedures',
    procedures: true,
    q: { ar: 'كيف يتم تقديم الطلب بموجب حكم قضائي؟', en: 'How do I apply under a court ruling?' },
    a: {
      ar: 'يتم الصرف بموجب حكم قضائي يصدر ضد الصندوق بعد استنفاد درجات التقاضي اللازمة، ويُقدَّم مع الطلب: صورة الصيغة التنفيذية والحكم والأصل للاطلاع عليه، وأصل الإعلام الشرعي، وصورة محضر الحادث ونموذج (40) نيابة أو شهادة من الجدول، والتقرير الطبي في حالة الإصابة، وصور بطاقات الرقم القومي للورثة وشهادات ميلاد القُصّر.',
      en: 'Payment is made under a court ruling against the Fund once the necessary levels of litigation are exhausted. Submit: copies of the enforceable writ and the ruling (original shown), the original inheritance determination, the accident report with Prosecution Form (40) or a court-register certificate, the medical report in injury cases, and the heirs’ national IDs and minors’ birth certificates.',
    },
  },
  {
    id: 'payment-documents',
    category: 'documents',
    procedures: true,
    q: { ar: 'ما المستندات المطلوبة يوم الصرف؟', en: 'What is required on payment day?' },
    a: {
      ar: 'أرقام حسابات بنكية أو كارت مدفوعات حكومية تابع للبريد، وأرقام حسابات القُصّر (إن وجدوا) معتمدة من النيابة الحسبية، وبطاقات رقم قومي سارية، ويلزم وجود ختم في حالة عدم إجادة الكتابة.',
      en: 'Bank account numbers or a postal government payment card; minors’ account numbers (if any) certified by the Guardianship Prosecution; valid national ID cards; and a personal seal for anyone unable to write.',
    },
  },
  {
    id: 'review',
    category: 'procedures',
    procedures: true,
    q: { ar: 'كيف تتم مراجعة الطلب؟', en: 'How is a request reviewed?' },
    a: {
      ar: 'تقوم اللجان المختصة بالصندوق بدراسة المطالبات المقدمة مرفقًا بها المستندات المطلوبة، وتصدر قرارها بشأنها.',
      en: 'The Fund’s competent committees study the claims submitted with the required documents and issue their decision on them.',
    },
  },
  {
    id: 'how-contact',
    category: 'complaints',
    q: { ar: 'كيف يمكنني التواصل مع الصندوق؟', en: 'How can I contact the Fund?' },
    a: {
      ar: 'يمكنكم التواصل هاتفيًا على 02 25775739 أو 02 25767828، أو عبر البريد الإلكتروني info@iaf.gov.eg، أو زيارة المقر الرئيسي (20 شارع عماد الدين — القاهرة) أو فرع طنطا، من الأحد إلى الخميس من 8:30 صباحًا حتى 1:30 ظهرًا.',
      en: 'Call 02 25775739 or 02 25767828, email info@iaf.gov.eg, or visit the head office (20 Emad El-Din Street, Cairo) or the Tanta branch, Sunday to Thursday, 8:30 AM – 1:30 PM.',
    },
  },
  {
    id: 'submit-complaint',
    category: 'complaints',
    q: { ar: 'كيف أقدم شكوى أو استفسارًا؟', en: 'How do I submit a complaint or inquiry?' },
    a: {
      ar: 'يمكن تقديم الشكوى أو الاستفسار من خلال صفحة الشكاوى والاستفسارات على الموقع، أو عبر البريد الإلكتروني info@iaf.gov.eg، أو بالتواصل هاتفيًا مع الصندوق.',
      en: 'Use the Complaints & Inquiries page on this website, email info@iaf.gov.eg, or call the Fund.',
    },
  },
];
