import { useState } from 'react';
import { TextInputField } from '../TextInputField/TextInputField';
import { Button } from '../Button/Button';

import styles from './LuckyValidationForm.module.scss';

const SOLUTION = 'dokik';

interface LuckyValidationFormProps {
  setResult: (result: boolean) => void;
}

export const LuckyValidationForm: React.FC<LuckyValidationFormProps> = ({
  setResult,
}) => {
  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleValidation = () => {
    const sanitizedValue = value.trim().toLocaleLowerCase();
    const result = sanitizedValue === SOLUTION;
    setValidationError(!result);
    setResult(result);
  };

  return (
    <div className={styles.luckyValidationForm}>
      <h1>
        Ahhoz, hogy részt vehess játékunkban kérlek válaszold meg a következő
        kérdést. Mi a csatornánk neve?
      </h1>
      <TextInputField
        className={styles.input}
        value={value}
        error={validationError}
        onChange={handleChange}
        errorMessage="Nem ez a megoldás!"
      />
      <Button text="Tovább" onClick={handleValidation} />
    </div>
  );
};
