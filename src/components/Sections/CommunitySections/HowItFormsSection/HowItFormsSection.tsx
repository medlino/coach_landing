'use client';

import styles from './HowItFormsSection.module.scss';

const contents = [
  {
    title:
      '4 óra esszenciális tudásanyag, ami az alapját adja a változásodnak. ',
    content: <img />,
  },
  {
    title:
      'Rendszeres online előadásokat, ahol felteheted kérdéseidet és megoszthatod tapasztalataidat.',
    content: <img />,
  },
  {
    title:
      'Mester vendég előadók, akik bölcsességükkel, tudásukkal, szakértelmükkel támogatják a közösséget. ',
    content: <img />,
  },
  {
    title:
      'ÉLŐ TALÁLKOZÓK Magyarország legszebb és legkülönlegesebb helyein, mert amit tanulsz azt 1 dolog ‘megérteni’ és nagyon más dolog megélni. Ezt élni érdemes.',
    content: <img />,
  },
];

export const HowItFormsSection = () => {
  return (
    <section id="mikent-valosul-meg" className={styles.howItFormsSection}>
      <h1>Hogyan valósul meg ez a közösség és mit kínál számodra?</h1>
      <p>
        Hogyan valósul meg ez a közösség és mit kínál számodra? A képzés a
        DISCORD nevezetű közösségi felületen történik, amely egy rendszerezett,
        modern, egyszerűen használható applikáció, nem egy újabb Facebook vagy
        Messenger csoport.
      </p>
      <div className={styles.contentList}>
        {contents.map((content, index) => (
          <div key={index} className={styles.content}>
            <h2>{content.title}</h2>
            {content.content}
          </div>
        ))}
      </div>
      <p>
        Folyamatos kommunikáció, kérdezési lehetőség a közösség online
        felületén.
      </p>
      <p>Azonos gondolkodású emberekkel való kapcsolódás a közösségben.</p>
    </section>
  );
};
