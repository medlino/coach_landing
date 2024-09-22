import { useState } from 'react';

import { TextInputField } from '../TextInputField/TextInputField';
import { Button } from '../Button/Button';
import { isValidEmail } from '@/utils/validation';

import styles from './LuckyBagForm.module.scss';

interface LuckyBagFormProps {
  giftId: string;
}

export const LuckyBagForm: React.FC<LuckyBagFormProps> = ({ giftId }) => {
  const [email, setEmail] = useState<string>('');
  const [validationError, setValidationError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRewardSend = () => {
    setValidationError(false);

    if (email === '' || !isValidEmail(email)) {
      setValidationError(true);
      return;
    }
  };

  return (
    <div className={styles.luckyBagForm}>
      <h2>Amennyiben nem ismersz minket...</h2>
      <h1>
        Gratulálunk, nyertél! Nyereményed átvételéhez kérlek add meg az email
        címed és kattints a küldés gombra
      </h1>
      <TextInputField
        label="Email"
        value={email}
        error={validationError}
        onChange={handleChange}
        errorMessage="Hibás email!"
      />
      <Button text="Küldés" onClick={handleRewardSend} />

      <p>
        A csendben találod meg az igazi válaszokat, melyeket a zajos világ
        elrejt előled. Ahogy a víz tisztává válik, amikor megáll, úgy a lelked
        is tisztul, amikor elengeded a feszültséget és meghallod a belső hangot.
        Az igazi bölcsesség nem a hangos szavakban rejlik, hanem abban a
        pillanatban, amikor felismered: a béke benned van.
      </p>
    </div>
  );
};
