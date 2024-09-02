import { useState } from 'react';
import SRadio from './components/SRadio';
import STabs from './components/STab';

const App = () => {
  const [singleChecked, setSingleChecked] = useState(false);
  const [singleDisableChecked, setSingleDisableChecked] = useState(false);
  const [groupChecked, setGroupChecked] = useState('어제');

  const handleSingleClick = () => {
    setSingleChecked(!singleChecked);
  };

  const handleSingleDisableClick = () => {
    setSingleDisableChecked(!singleDisableChecked);
  };

  const handleGroupClick = (value: string) => {
    setGroupChecked(value);
  };

  const tabs = [
    { name: 'tab1', label: 'tab1', badge: '대기 1', content: <div>tab1</div> },
    { name: 'tab2', label: 'tab2', badge: '대기 2', content: <div>tab2</div> },
    { name: 'tab3', label: 'tab3', content: <div>tab3</div> },
    { name: 'tab4', label: 'tab4', content: <div>tab4</div> },
  ];

  return (
    <>
      <div className="p-8">
        <SRadio
          label="single"
          value="single"
          name="singleRadio"
          onClick={handleSingleClick}
          checked={singleChecked}
          color="Red_Default"
        />
        <SRadio
          label="singleDisabled"
          value="singleDisabled"
          name="singleDisableRadio"
          onClick={handleSingleDisableClick}
          checked={singleDisableChecked}
          disabled={true}
        />
      <div className='flex'>
        <SRadio
          label="어제"
          value="어제"
          checked={groupChecked === '어제'}
          onClick={() => handleGroupClick('어제')}
          name="radioGroup"
        />
        <SRadio
          label="일주일"
          value="일주일"
          checked={groupChecked === '일주일'}
          onClick={() => handleGroupClick('일주일')}
          name="radioGroup"
        />
        <SRadio
          label="한달"
          value="한달"
          checked={groupChecked === '한달'}
          onClick={() => handleGroupClick('한달')}
          name="radioGroup"
        />
      </div>
      
      </div>
      <div className='p-8'>
        <STabs tabs={tabs} />
      </div>
    </>
  );
};

export default App;