/**
 * OFFICIAL DOCUMENTS — files retrieved from the official website (iaf.gov.eg) and stored in /public/documents.
 * An entry with `file: null` could not be retrieved; its card shows the title without a download action.
 */
const doc = (id, file, ar, en, extra = {}) => ({
  id,
  title: { ar, en },
  description: null,
  date: null,
  type: 'PDF',
  size: null,
  file,
  ...extra,
});

export const LAW_GROUPS = [
  { id: 'laws', icon: 'Landmark', label: { ar: 'القوانين', en: 'Laws' } },
  { id: 'regulations', icon: 'Gavel', label: { ar: 'اللوائح والقرارات', en: 'Regulations & decisions' } },
];

export const LAW_DOCUMENTS = [
  doc('law-10-1981', '/documents/laws/law-10-1981.pdf', 'قانون رقم 10 لسنة 1981', 'Law No. 10 of 1981', {
    group: 'laws',
    kind: { ar: 'قانون', en: 'Law' },
    description: { ar: 'قانون الإشراف والرقابة على التأمين في مصر.', en: 'Law on insurance supervision and control in Egypt.' },
    size: '848 KB',
  }),
  doc('law-72-2007', '/documents/laws/law-72-2007.pdf', 'قانون رقم 72 لسنة 2007', 'Law No. 72 of 2007', {
    group: 'laws',
    kind: { ar: 'قانون', en: 'Law' },
    description: {
      ar: 'بشأن التأمين الإجباري عن المسؤولية المدنية الناشئة عن حوادث مركبات النقل السريع. مُلغى بموجب قانون التأمين الموحد رقم 155 لسنة 2024، ويُتاح كمرجع تاريخي.',
      en: 'On compulsory civil-liability insurance for motor vehicle accidents. Repealed by Unified Insurance Law No. 155 of 2024; kept as a historical reference.',
    },
    repealed: true,
    size: '1.2 MB',
  }),
  doc('law-98-2015', '/documents/laws/law-98-2015.pdf', 'قانون رقم 98 لسنة 2015', 'Law No. 98 of 2015', {
    group: 'laws',
    kind: { ar: 'قانون', en: 'Law' },
    description: { ar: 'بتعديل بعض أحكام قانون الإشراف والرقابة على التأمين الصادر بالقانون رقم 10 لسنة 1981.', en: 'Amending certain provisions of the Insurance Supervision and Control Law No. 10 of 1981.' },
    date: '2015-08-22',
    size: '123 KB',
  }),
  doc('law-155-2024', '/documents/laws/law-155-2024.pdf', 'قانون التأمين الموحد رقم 155 لسنة 2024', 'Unified Insurance Law No. 155 of 2024', {
    group: 'laws',
    kind: { ar: 'قانون', en: 'Law' },
    size: '913 KB',
  }),
  doc('law-10-1981-regulation', '/documents/laws/law-10-1981-executive-regulation.pdf', 'اللائحة التنفيذية للقانون رقم 10 لسنة 1981', 'Executive Regulation of Law No. 10 of 1981', {
    group: 'regulations',
    kind: { ar: 'لائحة تنفيذية', en: 'Executive regulation' },
    size: '1.4 MB',
  }),
  doc('decree-217-2007', '/documents/laws/decree-217-2007.pdf', 'قرار وزير الاستثمار رقم 217 لسنة 2007', 'Minister of Investment Decree No. 217 of 2007', {
    group: 'regulations',
    kind: { ar: 'قرار وزاري', en: 'Ministerial decree' },
    description: { ar: 'اللائحة التنفيذية لقانون التأمين الإجباري.', en: 'Executive regulation of the compulsory insurance law.' },
    size: '564 KB',
  }),
  doc('decree-1828-2007', null, 'قرار رئيس مجلس الوزراء رقم 1828 لسنة 2007', 'Prime Ministerial Decree No. 1828 of 2007', {
    group: 'regulations',
    kind: { ar: 'قرار رئيس مجلس الوزراء', en: 'Prime Ministerial decree' },
    description: { ar: 'بإصدار النظام الأساسي للصندوق الحكومي — النظام الأساسي القديم الذي تم تعديله.', en: 'Issuing the Fund’s statute — the former statute, since amended.' },
  }),
  doc('decree-2291-2018', '/documents/laws/decree-2291-2018.pdf', 'قرار رئيس مجلس الوزراء رقم 2291 لسنة 2018', 'Prime Ministerial Decree No. 2291 of 2018', {
    group: 'regulations',
    kind: { ar: 'قرار رئيس مجلس الوزراء', en: 'Prime Ministerial decree' },
    description: { ar: 'النظام الأساسي للصندوق الحكومي، والساري من ديسمبر 2018 وفقًا للموقع الرسمي.', en: 'The Fund’s statute, in effect since December 2018 according to the official website.' },
    date: '2018-10-30',
    size: '283 KB',
  }),
  doc('decision-2734-2018', '/documents/laws/decision-2734-2018.pdf', 'قرار رئيس الهيئة رقم 2734 لسنة 2018', 'FRA Chairman Decision No. 2734 of 2018', {
    group: 'regulations',
    kind: { ar: 'قرار', en: 'Decision' },
    description: { ar: 'لائحة النظام الأساسي لصندوق ضمان حملة الوثائق.', en: 'Statute of the Policyholders Protection Fund.' },
    size: '242 KB',
  }),
  doc('decision-252-2019', '/documents/laws/decision-252-2019.pdf', 'قرار رئيس الهيئة رقم 252 لسنة 2019', 'FRA Chairman Decision No. 252 of 2019', {
    group: 'regulations',
    kind: { ar: 'قرار', en: 'Decision' },
    description: { ar: 'لائحة النظام الأساسي للمجمعة المصرية للتأمين الإجباري.', en: 'Statute of the Egyptian Compulsory Insurance Pool.' },
    size: '337 KB',
  }),
];

/** Official application forms (Word documents) from the Procedures page of the official website. */
export const FORMS = [
  doc('form-request', '/documents/forms/compensation-request-form.doc', 'نموذج طلب التعويض', 'Compensation request form', {
    type: 'DOC',
    size: '63 KB',
    description: { ar: 'يُرفق بطلب التسوية الودية المقدَّم مباشرة إلى الصندوق.', en: 'Attached to an amicable-settlement request submitted directly to the Fund.' },
  }),
  doc('form-ruling', '/documents/forms/court-ruling-form.doc', 'نموذج الحكم', 'Court ruling form', {
    type: 'DOC',
    size: '44 KB',
    description: { ar: 'يُستخدم عند التقدم للصرف بموجب حكم قضائي صادر ضد الصندوق.', en: 'Used when applying for payment under a court ruling against the Fund.' },
  }),
];

/** Board formation decisions published on the official Board page. */
export const BOARD_DECISIONS = [
  ['القرار الأول', 'First decision', '647 KB'],
  ['تابع القرار الأول (⁦2-1⁩)', 'First decision (cont. 2-1)', '406 KB'],
  ['تابع القرار الأول (⁦3-1⁩)', 'First decision (cont. 3-1)', '490 KB'],
  ['القرار الثاني', 'Second decision', '955 KB'],
  ['القرار الثالث', 'Third decision', '577 KB'],
  ['تابع القرار الثالث (⁦2-3⁩)', 'Third decision (cont. 2-3)', '340 KB'],
  ['القرار الرابع', 'Fourth decision', '1.1 MB'],
  ['القرار الخامس', 'Fifth decision', '977 KB'],
  ['القرار السادس', 'Sixth decision', '490 KB'],
].map(([ar, en, size], i) => doc(`board-decision-${i + 1}`, `/documents/board/board-decision-${i + 1}.pdf`, ar, en, { size }));
