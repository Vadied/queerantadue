type Props = {
  data: any[];
  actions?: string[];
  columns: { label: string; attribute: string }[];
};
const CustomTable = ({ data, actions = [], columns }: Props) => {
  const colsClass = `grid grid-cols-${
    columns.length + 1
  } gap-4 mb-4 border-b border-color-black`;
  return (
    <>
      <div className={colsClass}>
        {columns.map((column) => (
          <div key={column.attribute} className="text-2xl text-bold">
            {column.label}
          </div>
        ))}
        <div className="text-2xl text-bold">Azioni</div>
      </div>
      {data.map((data) => (
        <div key={data._id} className={colsClass}>
          {columns.map((column, i) => (
            <div key={i}>{data[column.attribute]}</div>
          ))}
        </div>
      ))}
    </>
  );
};

export default CustomTable;
