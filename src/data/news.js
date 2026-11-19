/**
 * OFFICIAL NEWS — items, titles and publication dates taken from the official website (iaf.gov.eg/News).
 * Images are the supplied official images (public/images/news) or the image published with the item.
 */
const img = (path) => encodeURI(path);

export const NEWS = [
  {
    slug: 'executive-director-vacancy-2026',
    date: '2026-04-21',
    image: img('/images/news/وظائف.jpg'),
    title: { ar: 'إعلان عن طلب مدير تنفيذي بالصندوق', en: 'Vacancy announcement: Executive Director of the Fund' },
    excerpt: {
      ar: 'يعلن الصندوق الحكومي عن طلب مدير تنفيذي، مرفقًا بالشروط المطلوبة للتقدم للوظيفة.',
      en: 'The Government Fund announces a vacancy for an Executive Director, together with the requirements for applying.',
    },
    body: {
      ar: [
        'يعلن الصندوق الحكومي لتغطية الأضرار الناتجة عن بعض حوادث مركبات النقل السريع عن طلب مدير تنفيذي بالصندوق.',
        'وقد نُشرت الشروط المطلوبة للتقدم للوظيفة مرفقةً بالإعلان على الموقع الرسمي للصندوق.',
      ],
      en: [
        'The Government Fund for Covering Damages Resulting from Certain Rapid Transport Vehicle Accidents announces a vacancy for an Executive Director.',
        'The requirements for applying were published with the announcement on the Fund’s official website.',
      ],
    },
  },
  {
    slug: 'disbursement-of-2024-settlements',
    date: '2025-09-08',
    image: img('/images/news/1684179173_news-larg-1.jpg'),
    title: { ar: 'بدء صرف تعويضات الحوادث المتخالص عليها في عام 2024', en: 'Payment begins for accident compensation settled in 2024' },
    excerpt: {
      ar: 'أعلن الصندوق بقيادة الدكتور عادل أحمد موسى بدء صرف تعويضات الحوادث المتخالص عليها في عام 2024.',
      en: 'The Fund, led by Dr. Adel Ahmed Moussa, announced the start of payments for accident compensation settled in 2024.',
    },
    body: {
      ar: [
        'أعلن الصندوق الحكومي، بقيادة السيد الدكتور / عادل أحمد موسى رئيس مجلس الإدارة، عن بدء صرف تعويضات الحوادث المتخالص عليها في عام 2024.',
        'وأفاد سيادته بأنه سيتم بنهاية العام الجاري صرف جميع التعويضات واجبة النفاذ لمستحقيها.',
        'كما دعا الصندوق المتضررين الذين وقّعوا على التخالص قبل عام 2024 ولم يتم صرف مستحقاتهم إلى التوجه إلى مقر الصندوق لصرفها.',
      ],
      en: [
        'The Government Fund, led by Chairman Dr. Adel Ahmed Moussa, announced the start of payments for accident compensation settled in 2024.',
        'He stated that all enforceable compensation would be paid to those entitled by the end of the current year.',
        'The Fund also invited claimants who signed a settlement before 2024 and have not yet been paid to visit the Fund’s office to collect their dues.',
      ],
    },
  },
  {
    slug: 'alaa-elzoheiry-renewal',
    date: '2025-09-07',
    image: img('/images/news/علاء الزهيرى.jpg'),
    title: { ar: 'تجديد الثقة للسيد الأستاذ / علاء الزهيري', en: 'Renewed confidence in Mr. Alaa El-Zoheiry' },
    excerpt: {
      ar: 'يتقدم رئيس مجلس إدارة الصندوق وكافة العاملين به بأصدق التهاني للأستاذ علاء الزهيري رئيس الاتحاد المصري للتأمين.',
      en: 'The Fund’s Chairman and staff congratulate Mr. Alaa El-Zoheiry, Chairman of the Insurance Federation of Egypt.',
    },
    body: {
      ar: [
        'يتقدم السيد الدكتور / عادل أحمد موسى رئيس مجلس إدارة الصندوق الحكومي وكافة العاملين به بأصدق التهاني للسيد الأستاذ / علاء الزهيري رئيس الاتحاد المصري للتأمين، لتجديد ثقة القيادة السياسية وفخامة السيد رئيس الجمهورية لسيادته.',
        'متمنين لسيادته مزيدًا من النجاح والتوفيق لخدمة قطاع التأمين والأسواق المالية غير المصرفية.',
      ],
      en: [
        'Dr. Adel Ahmed Moussa, Chairman of the Government Fund, and all of the Fund’s staff extend their sincere congratulations to Mr. Alaa El-Zoheiry, Chairman of the Insurance Federation of Egypt, on the renewed confidence of the political leadership and the President of the Republic.',
        'They wish him continued success in serving the insurance sector and the non-banking financial markets.',
      ],
    },
  },
  {
    slug: 'dr-adel-moussa-appointed-chairman',
    date: '2025-01-09',
    image: img('/images/chairman/عادل موسى.jpeg'),
    title: { ar: 'الدكتور عادل موسى رئيسًا لمجلس إدارة الصندوق', en: 'Dr. Adel Moussa appointed Chairman of the Fund' },
    excerpt: {
      ar: 'أصدر رئيس مجلس الوزراء القرار رقم 4525 لسنة 2024 بتعيين الدكتور عادل موسى رئيسًا لمجلس إدارة الصندوق الحكومي.',
      en: 'The Prime Minister issued Decree No. 4525 of 2024 appointing Dr. Adel Moussa Chairman of the Government Fund.',
    },
    body: {
      ar: [
        'أصدر الدكتور مصطفى مدبولي، رئيس مجلس الوزراء، قرارًا بتعيين الدكتور عادل موسى رئيسًا لمجلس إدارة الصندوق الحكومي لتغطية الأضرار الناتجة عن بعض حوادث مركبات النقل السريع.',
        'وتضمن القرار رقم 4525 لسنة 2024 تعيينه للمدة المتبقية لمجلس الإدارة الصادر بتشكيله قرار رئيس مجلس الوزراء لسنة 2021.',
      ],
      en: [
        'Prime Minister Dr. Mostafa Madbouly issued a decree appointing Dr. Adel Moussa Chairman of the Board of the Government Fund for Covering Damages Resulting from Certain Rapid Transport Vehicle Accidents.',
        'Decree No. 4525 of 2024 appoints him for the remaining term of the Board formed by the 2021 Prime Ministerial decree.',
      ],
    },
  },
  {
    slug: 'unified-insurance-law-155-2024',
    date: '2024-08-04',
    image: img('/images/news/official/law-155-2024.jpg'),
    title: { ar: 'صدور قانون التأمين الموحد رقم 155 لسنة 2024', en: 'Unified Insurance Law No. 155 of 2024 issued' },
    excerpt: {
      ar: 'صدر قانون التأمين الموحد الذي جمع التشريعات المرتبطة بأنشطة التأمين وإعادة التأمين في مصر.',
      en: 'The Unified Insurance Law was issued, consolidating the legislation governing insurance and reinsurance in Egypt.',
    },
    body: {
      ar: [
        'هنّأ الصندوق الحكومي جموع الشعب المصري على صدور قانون التأمين الموحد رقم 155 لسنة 2024، وتقدّم بالتحية إلى قيادات الهيئة العامة للرقابة المالية على ما بذلوه من جهد في سبيل إعداد نصوص القانون حتى إقراره والتصديق عليه.',
        'ويتضمن القانون التشريعات المرتبطة بأنشطة التأمين وإعادة التأمين في مصر، من خلال جمع ودمج وتعديل القرارات والتشريعات، ومنها: قانون صناديق التأمين الخاصة، وقانون الإشراف والرقابة على أنشطة التأمين وإعادة التأمين، وقانون التأمين الإلزامي عن المسؤولية المدنية الناشئة عن حوادث مركبات النقل السريع داخل جمهورية مصر العربية.',
      ],
      en: [
        'The Government Fund congratulated the Egyptian people on the issuance of Unified Insurance Law No. 155 of 2024, and thanked the leadership of the Financial Regulatory Authority for their efforts in preparing the law through to its approval and ratification.',
        'The law brings together the legislation governing insurance and reinsurance activities in Egypt by consolidating and amending earlier laws, including the private insurance funds law, the insurance supervision and control law, and the compulsory civil-liability insurance law for motor vehicle accidents.',
      ],
    },
  },
];

export const sortedNews = () => [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
export const getNewsBySlug = (slug) => NEWS.find((n) => n.slug === slug);
