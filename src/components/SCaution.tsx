import { CautionIcon12 } from "../assets/CautionIcon";

interface SCautionProps {
  noIcon?: boolean;
  useModal?: boolean;
  useNotice?: boolean;
  liStyle?: string;
  label?: string;
  contents?: string[];
}

const SCaution = ({
  noIcon = false,
  useModal = false,
  useNotice = false,
  liStyle = '-',
  label,
  contents = []
} : SCautionProps ) => {

  return (
    <div
      className={`flex rounded-md p-0 m-4 overflow-hidden text-Grey_Darken-4
      ${useModal
          ? useNotice ? 'bg-Grey_Lighten-6' : 'bg-Red_Lighten-6'
          : 'bg-Red_Lighten-6 border border-Red_Lighten-3'
      }`} >

      {!noIcon && (
        <div className="flex flex-col justify-center items-center min-w-104pxr max-w-104pxr p-6 bg-Red_Lighten-1">
          <CautionIcon12 color="white"></CautionIcon12>
          <strong className="text-white block mt-2 font-bold text-16pxr">{label}</strong>
        </div>
      )}

      <div className="p-5 ml-6">
        <ul className="list-none space-y-2">
          {contents.map((item, index) => (
            <li key={index}>
              <span className="mr-3">{liStyle}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SCaution;