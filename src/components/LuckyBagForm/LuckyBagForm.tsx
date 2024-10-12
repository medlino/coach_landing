import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    getFingerPrint()
      .then((id) => {
        if (id) {
          setVisitorId(id);
        }
      })
      .catch((error) => {
        console.error(error);
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
      toast.error('Hiányzó validációs adatok!');
      return;
    }

    setLoading(true);
    try {
      await sendGift(qrId, email, visitorId);
      toast.success(
        'Az ajándékot sikeresen elküldtük! Amennyiben nem találod az emailt, kérlek ellenőrizd a spam mappádat!'
      );
    } catch (error: any) {
      console.log(error);
      if (error.message.includes('1-')) {
        toast.error('Ezt a típusú ajándékot csak egyszer nyerheted meg!');
        return;
      }
      if (error.message.includes('2-')) {
        toast.error('Ezt a típusú ajándékot csak egyszer nyerheted meg!');
        return;
      }
      if (error.message.includes('3-')) {
        toast.error('Sajnos ezt az ajándékot már valaki más megnyerte!');
        return;
      }

      toast.error(
        'Hiba történt az ajándék küldése közben! Kérlünk próbáld újra!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.luckyBagForm}>
      <h1>
        Kérlek add meg az email címed, hogy elküldhessük az esetleges
        nyereményt.
      </h1>
      <TextInputField
        label="Email"
        value={email}
        error={validationError}
        onChange={handleChange}
        errorMessage="Hibás email!"
      />
      <Button text="Küldés" onClick={handleRewardSend} loading={loading} />
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
