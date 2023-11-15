type Props = {
  data: any[];
  columns: { label: string; attribute: string }[];
};
const CustomTable = ({ data, columns }: Props) => {
  return (
    <div>
      <div className={`grid grid-cols-${columns.length} gap-4 mb-8 border-b border-color-black`}>
        {columns.map((column) => (
          <div key={column.attribute} className="text-2xl text-bold">{column.label}</div>
        ))}
      </div>
      {data.map((data) => (
        <div key={data._id} className={`grid grid-cols-${columns.length} gap-4 mb-4 border-b border-color-black`}>
          {columns.map((column) => (
            <div key={column.label}>{data[column.attribute]}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomTable;
