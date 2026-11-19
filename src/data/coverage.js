// High-resolution photographs (Pexels licence — free to use, no attribution required):
// medical: RDNE Stock project #6129158 · partial disability: #20860622 · death/total disability: Ivan S #8127503
const imgMedical = '/images/coverage/medical-expenses.jpg';
const imgDisability = '/images/coverage/permanent-partial-disability.jpg';
const imgDeath = '/images/coverage/death-or-total-disability.jpg';

// Case titles and short descriptions are taken from the approved homepage concept.
// Eligibility rules, documents and amounts were NOT supplied and are rendered as pending.
export const COVERAGE_CASES = [
  {
    id: 'medical-expenses',
    icon: 'BedDouble',
    image: imgMedical,
    title: { ar: 'المصاريف الطبية', en: 'Medical Expenses' },
    summary: {
      ar: 'تغطية المصاريف الطبية المقررة للمصابين في الحادث.',
      en: 'Coverage of the prescribed medical expenses for those injured in the accident.',
    },
    description: {
      ar: 'تشمل هذه الحالة تغطية المصاريف الطبية المقررة للمصابين في حوادث مركبات النقل السريع، وذلك وفقًا لأحكام القانون والقرارات المنظمة لعمل الصندوق.',
      en: 'This case covers the prescribed medical expenses of people injured in rapid transport vehicle accidents, in accordance with the law and the decisions regulating the Fund.',
    },
  },
  {
    id: 'permanent-partial-disability',
    icon: 'Accessibility',
    image: imgDisability,
    title: { ar: 'العجز الجزئي الدائم', en: 'Permanent Partial Disability' },
    summary: {
      ar: 'في حالة الإصابة التي تؤدي إلى عجز جزئي دائم.',
      en: 'Where the injury results in a permanent partial disability.',
    },
    description: {
      ar: 'تشمل هذه الحالة الإصابات الناتجة عن حوادث مركبات النقل السريع والتي تؤدي إلى عجز جزئي دائم، وذلك وفقًا لأحكام القانون والقرارات المنظمة.',
      en: 'This case covers injuries from rapid transport vehicle accidents that result in a permanent partial disability, in accordance with the law and regulating decisions.',
    },
  },
  {
    id: 'death-or-total-disability',
    icon: 'HeartHandshake',
    image: imgDeath,
    title: { ar: 'الوفاة أو العجز الكلي', en: 'Death or Total Disability' },
    summary: {
      ar: 'في حالة الإصابة التي تؤدي إلى الوفاة أو العجز الكلي.',
      en: 'Where the injury results in death or total disability.',
    },
    description: {
      ar: 'تشمل هذه الحالة الإصابات الناتجة عن حوادث مركبات النقل السريع والتي تؤدي إلى الوفاة أو العجز الكلي، وذلك وفقًا لأحكام القانون والقرارات المنظمة.',
      en: 'This case covers injuries from rapid transport vehicle accidents that result in death or total disability, in accordance with the law and regulating decisions.',
    },
  },
];
