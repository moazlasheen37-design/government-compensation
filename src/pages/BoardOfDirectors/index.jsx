import { CircleAlert } from 'lucide-react';
import { useI18n } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';
import { BOARD_COMPOSITION, CHAIRMAN } from '../../data/board';
import { BOARD_DECISIONS } from '../../data/documents';
import PageHero from '../../components/common/PageHero';
import { Reveal, SectionHeading } from '../../components/common/primitives';
import { DocumentCard, Portrait } from '../../components/cards/Cards';
import Icon from '../../components/common/Icon';

const boardImg = '/images/board/board1.jpg';

export default function BoardPage() {
  const { t, pick, L } = useI18n();
  usePageMeta(t('nav.board'));

  return (
    <>
      <PageHero
        variant="image"
        image={boardImg}
        imageAlt={L('قاعة اجتماعات مجلس الإدارة', 'Board meeting room')}
        kicker={L('القيادة المؤسسية', 'Institutional leadership')}
        title={t('nav.board')}
        subtitle={L('مجلس إدارة الصندوق الحكومي لتغطية الأضرار الناتجة عن بعض حوادث مركبات النقل السريع.', 'The Board of Directors of the Government Fund for Covering Damages Resulting from Certain Rapid Transport Vehicle Accidents.')}
        crumbs={[{ label: t('nav.board') }]}
      />

      {/* Chairman */}
      <section className="section section--white" aria-labelledby="chair-title">
        <div className="container">
          <Reveal as="article" className="chair-feature">
            <div className="chair-feature__portrait">
              <Portrait photo={CHAIRMAN.photo} position={CHAIRMAN.photoPosition} name={pick(CHAIRMAN.name)} size="lg" />
            </div>
            <div className="chair-feature__body">
              <span className="chip-gold">{pick(CHAIRMAN.position)}</span>
              <h2 id="chair-title" className="chair-feature__name">{pick(CHAIRMAN.name)}</h2>
              <p className="muted">{pick(CHAIRMAN.appointment)}</p>

              <h3 className="chair-feature__bio-title">{L('المؤهلات العلمية', 'Academic qualifications')}</h3>
              <ul className="ticks">
                {CHAIRMAN.qualifications.map((q) => <li key={q.ar}>{pick(q)}</li>)}
              </ul>

              <h3 className="chair-feature__bio-title">{L('المناصب السابقة', 'Previous positions')}</h3>
              <ul className="ticks">
                {CHAIRMAN.previousPositions.map((p) => <li key={p.ar}>{pick(p)}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Composition */}
      <section className="section" aria-labelledby="members-title">
        <div className="container">
          <SectionHeading
            id="members-title"
            kicker={L('التشكيل', 'Composition')}
            title={L('تشكيل مجلس الإدارة', 'Board composition')}
            subtitle={L('يُشكَّل مجلس الإدارة برئاسة الدكتور / عادل موسى، وعضوية كلٍّ من:', 'The Board is chaired by Dr. Adel Moussa, with the following members:')}
          />
          <div className="members">
            {BOARD_COMPOSITION.map((m, i) => (
              <Reveal as="article" key={m.id} className="member" delay={(i % 3) * 80}>
                <span className="objective__icon"><Icon name={m.id === 'chair' ? 'UserRound' : 'Users'} size={26} strokeWidth={1.5} /></span>
                <div className="member__body">
                  <span className="member__pos">{pick(m.role)}</span>
                  <h3>{pick(m.title)}</h3>
                  {m.note && <p className="member__note">{pick(m.note)}</p>}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="note-line"><CircleAlert size={16} aria-hidden="true" /> {L('يعرض هذا القسم التشكيل المنشور على الموقع الرسمي للصندوق، ويخضع للتحديث وفقاً لقرارات التشكيل الصادرة.', 'This section shows the composition published on the Fund’s official website and is subject to update under formation decrees.')}</p>

          <div className="board-docs">
            <h3 className="doc-group-list__title"><Icon name="Gavel" size={20} /> {L('قرارات تشكيل مجلس الإدارة', 'Board formation decisions')}</h3>
            <div className="doc-rows">
              {BOARD_DECISIONS.map((d) => <DocumentCard key={d.id} doc={d} layout="row" categoryLabel={L('قرار تشكيل', 'Formation decision')} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
