import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { LAW_DOCUMENTS, LAW_GROUPS } from '../../data/documents';
import PageHero from '../../components/common/PageHero';
import { DocumentCard } from '../../components/cards/Cards';
import Icon from '../../components/common/Icon';
import buildingImg from '../../assets/images/building.jpg';

export default function LawsPage() {
  const { t, pick, L } = useI18n();
  usePageMeta(t('nav.laws'));

  const groups = LAW_GROUPS.map((g) => ({ ...g, docs: LAW_DOCUMENTS.filter((d) => d.group === g.id) }));

  return (
    <>
      <PageHero
        image={buildingImg}
        imagePosition="center"
        variant="emblem"
        emblem="Scale"
        kicker={L('المرجعية التشريعية', 'Legal framework')}
        title={L('القوانين والتشريعات', 'Laws & Regulations')}
        subtitle={L('يمكنك الاطلاع على القوانين والقرارات واللوائح المنظمة لعمل الصندوق من خلال مكتبة التشريعات الرسمية.', 'Browse the laws, decisions and regulations governing the Fund through the official legislation library.')}
        crumbs={[{ label: t('nav.laws') }]}
      />

      <section className="section section--white library" aria-label={L('مكتبة التشريعات', 'Legislation library')}>
        <div className="container">
          {groups.map((g) => (
            <div key={g.id} className="doc-group-list">
              <h2 className="doc-group-list__title"><Icon name={g.icon} size={20} /> {pick(g.label)}</h2>
              <div className="doc-rows">
                {g.docs.map((d) => <DocumentCard key={d.id} doc={d} layout="row" categoryLabel={pick(d.kind)} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
