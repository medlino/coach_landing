'use client';

import styles from './HowItFormsSection.module.scss';

const contents = [
  {
    title:
      '4 óra esszenciális tudásanyag, ami az alapját adja a változásodnak. ',
    content: (isLeft: boolean) => (
      <div className={isLeft ? styles.left : ''}>
        <img src="/com-1.png" alt="com-1" />
      </div>
    ),
  },
  {
    title:
      'Rendszeres online előadásokat, ahol felteheted kérdéseidet és megoszthatod tapasztalataidat.',
    content: (isLeft: boolean) => (
      <div className={isLeft ? styles.left : ''}>
        <img src="/com-2.png" alt="com-2" />
      </div>
    ),
  },
  {
    title:
      'Mester vendég előadók, akik bölcsességükkel, tudásukkal, szakértelmükkel támogatják a közösséget. ',
    content: (isLeft: boolean) => (
      <div className={isLeft ? styles.left : ''}>
        <img src="/com-3.1.png" alt="com-3.1" />
        {/* <img src="/com-3.2.png" alt="com-3.2" />{} */}
      </div>
    ),
  },
  {
    title:
      'ÉLŐ TALÁLKOZÓK Magyarország legszebb és legkülönlegesebb helyein, mert amit tanulsz azt 1 dolog ‘megérteni’ és nagyon más dolog megélni. Ezt élni érdemes.',
    content: (isLeft: boolean) => (
      <div className={isLeft ? styles.left : ''}>
        <img src="/com-4.png" alt="com-4" />
      </div>
    ),
  },
];

export const HowItFormsSection = () => {
  return (
    <section id="mikent-valosul-meg" className={styles.howItFormsSection}>
      <div className={styles.introWrapper}>
        <h1>Hogyan valósul meg ez a közösség és mit kínál számodra?</h1>
        <p>Hogyan valósul meg ez a közösség és mit kínál számodra?</p>
        <p>
          A képzés a DISCORD nevezetű közösségi felületen történik, amely egy
          rendszerezett, modern, egyszerűen használható applikáció, nem egy
          újabb Facebook vagy Messenger csoport.
        </p>
      </div>

      <div className={styles.contentList}>
        {contents.map((content, index) => (
          <div key={index} className={styles.content}>
            <h2>{content.title}</h2>
            {content.content(index % 2 === 0)}
          </div>
        ))}
      </div>

      <div className={styles.closingDesc}>
        <p>
          Folyamatos kommunikáció, kérdezési lehetőség a közösség online
          felületén.
        </p>
        <p>Azonos gondolkodású emberekkel való kapcsolódás a közösségben.</p>
      </div>
    </section>
  );
};
