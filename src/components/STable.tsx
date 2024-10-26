interface Header {
  name: string;        
  label: string;       
  field: string;       
  class?: string;      
  align?: string;      
}

export interface STableProps {
  className?: string;
  headers: Header[];
  data: Record<string, any>[];
}

const STable = ({ headers, data }: STableProps) => {
  return (
    <table className={`min-w-full border rounded-l`}>
      <thead className="border-b">
        <tr>
          {headers.map((header) => (
            <th
              key={header.field}
              className={`${header.field} px-4 py-2 border ${header.class ?? ''}`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border">
            {headers.map((header) => (
              <td
                key={`$${header.field}-${rowIndex}`}
                className={`${header.field}-${rowIndex} px-4 py-2 border`}
              >
                {row[header.field] ||  '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default STable;
