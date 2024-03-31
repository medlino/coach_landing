'use client';

import { Button } from '../../Button';

import { stripeCheckout } from '@/clientAPI/checkout';

import styles from './WhatInProg.module.scss';
import { InProgItem } from './InProgItem/InProgItem';

const inProgItems = [
  {
    id: 'mentality',
    imgSrc: '/icons/mentality.png',
    title: 'Gondolkozásmód',
    desc: (
      <p>
        Bevezetés az elme és a gondolat jelentésébe.
        <br />
        A gondolat, mint idegi kapcsolat. A tudat és tudatalatti elme működése
        és átprogramozása.
        <br />
        Neuroplaszticitás - Tényleg képes változni az agyunk? Retikuláris
        <br />
        Aktiváló Rendszer - A tudatod kapuőre.
        <br />
        Hitrendszerek, korlátozó hiedelmek - újravenni
      </p>
    ),
  },
  {
    id: 'creation',
    imgSrc: '/icons/creation.png',
    title: 'Teremtés',
    desc: (
      <p>
        Mit jelent a tudatos teremtés?
        <br />
        A teremtésről dokiktól, akik kezdetben szkeptikusok voltak.
        <br />
        Hogyan kapcsolódik a gondolkodás és a képzelet a valóságod
        megteremtéséhez.
        <br />
        A saját történeted megteremtése.
        <br />
        Tévhitek a teremtéssel kapcsolatban.
        <br />A teremtés tudományos háttere: érzelmek, rezgések, frekvenciák.
      </p>
    ),
  },
  {
    id: 'habits',
    imgSrc: '/icons/habits.png',
    title: 'Bónusz: Szokások',
    desc: (
      <p>
        Hogyan alakíts ki olyan szokásokat, amik egy életen át szolgálnak?
        <br />
        Mi az akaraterő és miért fontos?
        <br />
        Mindenki tudja mit kellene tennie, de miért nem tesszük? (Miértek, célok
        megfogalmazása)
        <br />
        Hálaadás - Az egyik legmagasabb rezgésű érzés. Egyik legjobb
        szorongáscsökkentő.
        <br />
        Légzéstechnika - Kapcsolódj a legmélyebb éneddel, hüllőagy aktiválása.
        <br />
        Hidegterápia - Az egyik legjobb gyógymód, hogy egészséges maradj.
        <br />
        Mik a lelki és biológiai következményei ezekek a szokásoknak?
      </p>
    ),
  },
];

export const WhatInProgSection = () => {
  return (
    <section className={styles.whatInProgSection}>
      <h1>Mit tartalmaz a program?</h1>
      <p>
        Amit a legkevesebben tudnak irányítani az az elme, viszont az egyetlen
        dolog, amit irányíthatsz az az elméd. Megtanítunk az elméd
        átprogramozására, hogy hogyan alakíts ki új idegpályákat a céljaid
        elérése érdekében. Amikor megérted az elméd működését, akkor lehetőséged
        nyílik megteremteni azt a valóságot, amit szeretnél. Esélyt kaphatsz
        arra, hogy túllépj a múltbeli tapasztalataid korlátain és alakítsd a
        saját jövőd.
      </p>
      <div className={styles.inProgList}>
        {inProgItems.map((iP) => (
          <InProgItem key={iP.id} {...iP} />
        ))}
      </div>
      <Button text="CSATLAKOZOM" onClick={stripeCheckout} />
    </section>
  );
};
