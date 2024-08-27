import { useState } from 'react';
import './css/App.css';
import { useState } from 'react';
import SCheckbox from './components/SCheckbox';

const App = () => {
  const [data, setData] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const handleSelect = (id: number) => {
    setData((prev) =>
      prev.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : { ...checkbox, checked: false }
      )
    );
  };

  return (
    <div className="p-8">
      <h2 className="mt-8">Single</h2>
      <SCheckbox
        checked={data[0].checked}
        label={data[0].label}
        onClick={() => handleSelect(data[0].id)}
      />

      <h2 className="mt-8">disabled</h2>
      <SCheckbox  disabled={true} label="Disabled Checkbox" />

      <h2 className="mt-8">Multiple</h2>
      {data.map((checkbox) => (
        <SCheckbox
          key={checkbox.id}
          label={checkbox.label}
          checked={checkbox.checked}
          onClick={() => handleSelect(checkbox.id)}
        />
      ))}
    </div>
  );
};

export default App;