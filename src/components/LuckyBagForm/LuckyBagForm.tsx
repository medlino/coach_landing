import { useEffect, useState } from 'react';

import { isValidEmail } from '@/utils/validation';
import { getFingerPrint } from '@/clientAPI/getFingerPrint';
import { sendGift } from '@/clientAPI/sendGift';

import { TextInputField } from '../TextInputField/TextInputField';
import { Button } from '../Button/Button';

import styles from './LuckyBagForm.module.scss';

interface LuckyBagFormProps {
  qrId: string | null;
  gift: {
    name: string;
    giftId: string;
  };
}

export const LuckyBagForm: React.FC<LuckyBagFormProps> = ({ qrId, gift }) => {
  const [visitorId, setVisitorId] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getFingerPrint()
      .then((id) => {
        if (id) {
          setVisitorId(id);
        }
      })
      .catch((error) => {
        setError('Hiba történt az oldal betöltése közben!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRewardSend = async () => {
    setValidationError(false);

    if (email === '' || !isValidEmail(email)) {
      setValidationError(true);
      return;
    }

    if (!qrId || !visitorId) {
      setError('Hiányzó validációs adatok!');
      return;
    }

    setLoading(true);
    try {
      await sendGift(qrId, email, visitorId);
    } catch (error) {
      setError('Hiba történt az ajándék küldése közben!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.luckyBagForm}>
      <h1>
        Gratulálunk, nyertél! Nyereméd a {gift.name} ajándékai közül való.
        Kérlek add meg az email címed, hogy elküldhessük neked a nyereményt!
      </h1>
      <TextInputField
        label="Email"
        value={email}
        error={validationError}
        onChange={handleChange}
        errorMessage="Hibás email!"
      />
      <Button text="Küldés" onClick={handleRewardSend} />

      {/* <p>
        A csendben találod meg az igazi válaszokat, melyeket a zajos világ
        elrejt előled. Ahogy a víz tisztává válik, amikor megáll, úgy a lelked
        is tisztul, amikor elengeded a feszültséget és meghallod a belső hangot.
        Az igazi bölcsesség nem a hangos szavakban rejlik, hanem abban a
        pillanatban, amikor felismered: a béke benned van.
      </p> */}
    </div>
  );
};
