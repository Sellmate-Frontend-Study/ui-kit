import { useState } from "react";
import STabContent from "./STabContent";

interface STabProps {
  name: string;
  label: string;
  badge?: string;
  selected?: boolean;
  onClick: () => void;
}

interface STapsProps {
  tabs: {
    name: string;
    label: string;
    badge?: string;
  }[];
}

const STab = ({ label, badge, selected = false, onClick }: STabProps) => {
  const tabClasses = [
    "px-10 py-4 cursor-pointer border border-b-0 rounded-t-md",
    selected
      ? "bg-white text-positive border-positive font-bold hover:bg-Blue_B_Lighten-6"
      : "bg-Grey_Lighten-5 text-Grey_Default border-Grey_Lighten-2 hover:bg-Grey_Lighten-4"
  ].join(" ");

  const badgeClasses = [
    "ml-2 text-white text-xs px-2 py-1 rounded",
    selected ? "bg-Blue_C_Default" : "bg-Blue_C_Lighten-1"
  ].join(" ");

  return (
    <div onClick={onClick} className={tabClasses}>
      <span>{label}</span>
      {badge && <span className={badgeClasses}>{badge}</span>}
    </div>
  );
};

const STabs = ({ tabs }: STapsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);

  const handleTabClick = (name: string) => {
    setSelectedTab(name);
  };

  return (
    <div className="flex flex-col">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <STab
            key={tab.name}
            name={tab.name}
            label={tab.label}
            badge={tab.badge}
            selected={selectedTab === tab.name}
            onClick={() => handleTabClick(tab.name)}
          />
        ))}
      </div>
      <div className="border-t border-positive">
        <STabContent name={selectedTab} />
      </div>
    </div>
  );
};

export default STabs;