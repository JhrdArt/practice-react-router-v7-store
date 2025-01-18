interface Props {
  selectList: string[];
  setValue: (val: string) => void;
}

const Select: React.FC<Props> = ({ selectList, setValue }) => {
  const onChange = (value: string) => {
    setValue(value); 
  };
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">selecciona</option>
      {selectList.map((select, index) => (
        <option key={index} value={select}>
          {select}
        </option>
      ))}
    </select>
  );
};
export default Select;
