import * as Select from "@radix-ui/react-select";
import React from "react";
import { Icons } from "./Icons";

type SelectItemProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
};
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, value, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={
          "cursor-pointer text-xs pt-3 text-gray-500 hover:text-gray-900 hover:font-semibold transition"
        }
        {...props}
        ref={forwardedRef}
        value={value}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

type SelectProps = {
  placeholder: string;
  options: { value: string; label: string }[];
  onChange?: (val: string) => void;
  label?: string;
};

const SelectElement = ({
  placeholder,
  options,
  onChange,
  label,
}: SelectProps) => {
  const ChevronDownIcon = Icons["caretRight"];
  return (
    <div>
      {label ? (
        <label className="font-bold text-xs text-gray-600 mb-1 block">
          {label}
        </label>
      ) : null}
      <Select.Root onValueChange={onChange}>
        <Select.Trigger className="w-full border border-gray-500 flex justify-between items-center py-3 rounded-lg bg-white px-[15px] text-[13px]">
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDownIcon className="rotate-90" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            sideOffset={0}
            position="popper"
            className=" selectTriggerWidth mt-2 px-3 pb-3 shadow-md w-full rounded-md bg-white"
          >
            <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white ">
              {/* <ChevronUpIcon /> */}
            </Select.ScrollUpButton>
            <Select.Viewport className="w-full divide-y space-y-3">
              {options.map((d, i) => (
                <SelectItem key={d.value + i} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="SelectScrollButton">
              {/* <ChevronDownIcon /> */}
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SelectElement;
