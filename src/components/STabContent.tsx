interface TabContentProps {
  name: string;
}

const STabContent = ({ name }: TabContentProps) => { 
  let content;

  switch (name) {
    case 'tab1':
      content = <div>tab1</div>;
      break;
    case 'tab2':
      content = <div>tab2</div>;
      break;
    case 'tab3':
      content = <div>tab3</div>;
      break;
    case 'tab4':
      content = <div>tab4</div>;
      break;
    default:
      content = <div>default</div>;
  }

  return <div className="p-4">{content}</div>;
};

export default STabContent;