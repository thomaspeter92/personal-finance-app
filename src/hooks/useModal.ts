import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  return {
    open,
    toggleModal,
  };
};
