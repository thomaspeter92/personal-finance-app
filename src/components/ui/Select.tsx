import React from "react";
import * as SelectUI from "@radix-ui/react-select";

type Props = {};

const Select = ({}: Props) => {
  return (
    <SelectUI.Root>
      <SelectUI.Trigger className="SelectUITrigger">
        <SelectUI.Value placeholder="Pick an option" />
        <SelectUI.Icon />
      </SelectUI.Trigger>
      <SelectUI.Portal>
        <SelectUI.Content position="popper" sideOffset={5}>
          <SelectUI.Viewport>
            <SelectUI.Item value="hello">Hello</SelectUI.Item>
          </SelectUI.Viewport>
        </SelectUI.Content>
      </SelectUI.Portal>
    </SelectUI.Root>
  );
};

export default Select;
