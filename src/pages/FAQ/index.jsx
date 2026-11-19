import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Headset, Phone } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { CONTACT } from '../../data/site';
import { FAQ_CATEGORIES, FAQS } from '../../data/faq';
import { matches } from '../../utils/text';
import PageHero from '../../components/common/PageHero';
import { Button, EmptyState } from '../../components/common/primitives';
import { SearchField } from '../../components/common/ListControls';
import { FAQAccordion } from '../../components/sections/Sections';
import Icon from '../../components/common/Icon';
const heroImg = encodeURI('/images/hero/hero 1.jpeg');

export default function FAQPage() {
  const { t, pick, L } = useI18n();
  usePageMeta(t('nav.faq'));
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState('all');

  const counts = useMemo(() => Object.fromEntries(FAQ_CATEGORIES.map((c) => [c.id, FAQS.filter((f) => f.category === c.id).length])), []);
  const filtered = FAQS.filter((f) => (category === 'all' || f.category === category) && matches(query, f.q, f.a));
  const groups = FAQ_CATEGORIES.map((c) => ({ ...c, items: filtered.filter((f) => f.category === c.id) })).filter((g) => g.items.length);
  const answered = FAQS.filter((f) => !f.pending).length;

  return (
    <>
      <PageHero
        image={heroImg}
        imagePosition="center 75%"
        variant="center"
        kicker={L('مركز المساعدة', 'Help centre')}
        title={t('nav.faq')}
        subtitle={L('إجابات عن أكثر الأسئلة شيوعًا حول الصندوق وإجراءات التعويض.', 'Answers to the most common questions about the Fund and compensation procedures.')}
        crumbs={[{ label: t('nav.faq') }]}
      >
        <SearchField id="faq-search" value={query} onChange={setQuery} placeholder={L('اكتب سؤالك هنا…', 'Type your question…')} className="search-field--hero" />
      </PageHero>

      <section className="section">
        <div className="container faq-layout">
          <aside className="faq-layout__nav" aria-label={L('تصنيفات الأسئلة', 'Question categories')}>
            <ul className="faq-cats">
              <li>
                <button type="button" className={category === 'all' ? 'is-active' : ''} aria-pressed={category === 'all'} onClick={() => setCategory('all')}>
                  <Icon name="Layers" size={19} /><span>{t('common.all')}</span><span className="faq-cats__count ltr">{FAQS.length}</span>
                </button>
              </li>
              {FAQ_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button type="button" className={category === c.id ? 'is-active' : ''} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                    <Icon name={c.icon} size={19} /><span>{pick(c.label)}</span><span className="faq-cats__count ltr">{counts[c.id]}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="faq-help on-dark">
              <Headset size={30} aria-hidden="true" />
              <h2>{L('لم تجد إجابتك؟', 'Didn’t find your answer?')}</h2>
              <p>{L('تواصل مع الصندوق هاتفيًا.', 'Call the Fund.')}</p>
              <Button href={`tel:${CONTACT.phoneTel}`} size="sm" icon={<Phone size={16} aria-hidden="true" />}><span className="ltr">{CONTACT.phone}</span></Button>
            </div>
          </aside>

          <div className="faq-layout__main" aria-live="polite">
            {answered < FAQS.length && (
              <p className="faq-status">
                {L(`تمت الإجابة على ${answered} من ${FAQS.length} سؤالًا؛ والأسئلة المميزة بانتظار الإجابة الرسمية.`, `${answered} of ${FAQS.length} questions answered; marked questions await official answers.`)}
              </p>
            )}
            {groups.length === 0 ? (
              <EmptyState title={t('common.noResults')} hint={t('common.noResultsHint')} action={<Button to="/complaints?type=inquiry" size="sm" variant="secondary">{L('أرسل استفسارك', 'Send your question')}</Button>} />
            ) : (
              groups.map((g) => (
                <section key={g.id} className="faq-group" aria-labelledby={`faq-${g.id}`}>
                  <h2 id={`faq-${g.id}`} className="faq-group__title"><span><Icon name={g.icon} size={20} /></span>{pick(g.label)}</h2>
                  <FAQAccordion items={g.items} />
                </section>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
