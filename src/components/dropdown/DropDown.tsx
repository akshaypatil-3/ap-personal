import { isPrimitive } from "../../utils/common";
import "./dropdown.scss";

interface IDropdownProps<T> {
  title?: string;
  dropdownData: T[];
  placeHolder?: string;
  onChange: (data: any) => void;
  value: string | undefined;
  isRequired?: boolean;
  labelFieldName?: string;
  valueFieldName?: string;
}

export const DropDown = <T extends any>(props: IDropdownProps<T>) => {
  let dropDownOptions;
  if (props?.dropdownData && props?.dropdownData.length > 0) {
    const isPrimitiveType = isPrimitive(props?.dropdownData[0]);
    dropDownOptions = props?.dropdownData?.map((data: any) => {
      if (isPrimitiveType) {
        return (
          <option className="dropdown-items" value={data} key={data}>
            {data}
          </option>
        );
      } else {
        return (
          <option
            className="dropdown-items"
            value={data[props.valueFieldName as keyof object]}
            key={data[props.valueFieldName as keyof object]}
          >
            {data[props.labelFieldName as keyof object]}
          </option>
        );
      }
    });
  }

  const onchangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="dropdown-container">
      {props?.title ? (
        <div>
          <label className="dropdown-labelTitle">
            {props?.title}
            {props?.isRequired ? <sup className="required">*</sup> : ""}
          </label>
        </div>
      ) : (
        ""
      )}
      <div>
        <select
          value={props?.value ?? []}
          name="dropdown"
          className="dropdown"
          placeholder={props?.placeHolder}
          onChange={onchangeHandler}
        >
          {dropDownOptions}
        </select>
      </div>
    </div>
  );
};
