'use client';

import { Button } from '../../Button';
import styles from './WhatInProg.module.scss';

export const WhatInProgSection = () => {
  return (
    <section className={styles.whatInProgSection}>
      <h1>Életre szóló program azoknak akik</h1>
      <p>
        Amit a legkevesebben tudnak irányítani az az elme, viszont az egyetlen
        dolog, amit irányíthatsz az az elméd. Megtanítunk az elméd
        átprogramozására, hogy hogyan alakíts ki új idegpályákat a céljaid
        elérése érdekében. Amikor megérted az elméd működését, akkor lehetőséged
        nyílik megteremteni azt a valóságot, amit szeretnél. Esélyt kaphatsz
        arra, hogy túllépj a múltbeli tapasztalataid korlátain és alakítsd a
        saját jövőd.
      </p>
      <Button text="CSATLAKOZOM" />
    </section>
  );
};
