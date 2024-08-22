import { Dropdown } from "../components/DropDown";

export const DropDownTest = () => {
  return (
    <div>
      <Dropdown
        label="엑셀 다운로드"
        options={["Option 1", "Option 2", "Option 3"]}
        color="blue"
        size="sm"
      />
      <Dropdown
        label="엑셀 다운로드"
        options={["Option 1", "Option 2", "Option 3"]}
        color="red"
        disabled={true}
        size="md"
      />
    </div>
  );
};