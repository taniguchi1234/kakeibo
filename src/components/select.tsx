//未使用
import * as React from 'react'
import { useState } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';

interface Props {
  category:string
  setCategory: (category: string) => void
}

type OptionType ={
  value: string;
  label: string;
}

const options: OptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const TypeScriptSelect: React.FC <Props>= (Props) => {
  const [category, setCategory] = useState<OptionType | null>(null);

  const handleChange = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setCategory(newValue);
    console.log('Selected option:', newValue);
    console.log('Action:', actionMeta.action);
  };

  return (
    <Select<OptionType>
      value={category}
      onChange={handleChange}
      options={options}
    />
  );
};

export default TypeScriptSelect;
