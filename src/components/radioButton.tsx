
//未使用
import * as React from 'react'
import { useState } from 'react';


interface Props {
  balance:string
  setBalance: (balance: string) => void
}

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const RadioButtonComponent: React.FC <Props> = (props) => {
  const [balance, setBalance]  = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.value);
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="radio"
              value={option.value}
              checked={balance === option.value}
              onChange={handleChange}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonComponent;
