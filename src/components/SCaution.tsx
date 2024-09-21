import { CautionIcon12 } from "../assets/CautionIcon";

export interface SCautionProps {
  noIcon?: boolean;
  useModal?: boolean;
  useNotice?: boolean;
  liStyle?: string;
  label?: string;
  contents: string[];
  className?: string;
}

const SCaution = ({
  noIcon = false,
  useModal = false,
  useNotice = false,
  liStyle = '-',
  label,
  contents = [],
  className
} : SCautionProps ) => {

  const defaultSCatuion = `flex rounded-md p-0 m-4 overflow-hidden text-Grey_Darken-4`
  const defaultIcon = `flex flex-col justify-center items-center min-w-104pxr max-w-104pxr p-6 bg-Red_Lighten-1`
  const defaultLabel = `text-white block mt-2 font-bold text-16pxr`
  const modal = useModal 
                  ? useNotice ? 'bg-Grey_Lighten-6' : 'bg-Red_Lighten-6' 
                  : 'bg-Red_Lighten-6 border border-Red_Lighten-3'

  return (
    <div className={[defaultSCatuion, modal, className].join(' ')}>

      {noIcon || (
        <div className={[defaultIcon].join(' ')}>
          <CautionIcon12 color="white"></CautionIcon12>
          <strong className={[defaultLabel].join(' ')}>{label}</strong>
        </div>
      )}

      <div className="p-5 ml-6">
        <ul className="list-none space-y-2">
          {contents.map((content, i) => (
            <li key={i}>
              <span className="mr-2">{liStyle}</span>
              {content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SCaution;