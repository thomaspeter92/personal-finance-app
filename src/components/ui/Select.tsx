import * as SelectUI from "@radix-ui/react-select";
import { Icons } from "./Icons";
import { useState } from "react";
import { useEffect } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  onChange: (sele: Option) => void;
  id: string;
  defaultValue?: string;
};

const Select = ({ options = [], onChange, id, defaultValue }: Props) => {
  const DownIcon = Icons["caretRight"];
  const initialDefaultValue =
    defaultValue || (options.length > 0 ? options[0].value : "");
  const [value, setValue] = useState(options[0].value);

  useEffect(() => {
    // Trigger the onChange handler with the initial default value
    const selectedOption = options.find(
      (option) => option.value === initialDefaultValue
    );
    if (selectedOption) {
      onChange(selectedOption);
    }
  }, [initialDefaultValue, onChange, options]);

  const handleChange = (selectedValue: string) => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setValue(selectedValue);
      onChange(selectedOption);
    }
  };

  return (
    <SelectUI.Root defaultValue={options[0].value} onValueChange={handleChange}>
      <SelectUI.Trigger
        id={id}
        className="SelectUITrigger rounded-lg border border-beige-500 px-4 py-2 flex items-center gap-3 w-fit"
      >
        <SelectUI.Value
          aria-label="values"
          placeholder="Pick an option"
          className="text-sm"
        >
          {value}
        </SelectUI.Value>

        <SelectUI.Icon>
          <DownIcon className="rotate-90" />
        </SelectUI.Icon>
      </SelectUI.Trigger>
      <SelectUI.Portal>
        <SelectUI.Content
          className="bg-white shadow w-[20ch] rounded-lg border border-beige-500"
          position="popper"
          sideOffset={5}
        >
          <SelectUI.Viewport className="w-full">
            {options.map((d, i) => (
              <SelectUI.Item
                className="py-2 px-1 outline-none "
                key={d.value + i}
                value={d.value}
              >
                {d.label}
              </SelectUI.Item>
            ))}
          </SelectUI.Viewport>
        </SelectUI.Content>
      </SelectUI.Portal>
    </SelectUI.Root>
  );
};

export default Select;
