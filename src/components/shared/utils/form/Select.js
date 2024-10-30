import RSelect from "react-select";
import { GrDown } from "react-icons/gr";
export default function Select({
  options = [{ value: "", label: "" }],
  value,
  onSelect,
  placeholder = "--선택--",
  isDisabled = false,
}) {
  const customStyles = {
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "gray" : "white",
      fontSize: "14px",
      borderColor: state.isSelected ? "grey" : "red",
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      display: "none",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "white",
      borderRadius: "8px",
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "black",
      fontSize: "14px",
    }),
  };
  function handleSelect(data) {
    console.log(data);
    onSelect(data);
  }
  const DropdownIndicator = () => {
    return <GrDown color="black" style={{ marginRight: "10px" }} />;
  };
  return (
    <div className="w-full">
      <RSelect
        components={{ DropdownIndicator }}
        noOptionsMessage={() => "더 이상 옵션이 없습니다"}
        isSearchable={false}
        options={options}
        onChange={handleSelect}
        value={value}
        styles={customStyles}
        placeholder={placeholder}
        isDisabled={isDisabled}
      />
    </div>
  );
}
