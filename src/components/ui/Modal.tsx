import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "../../hooks/useModal";

type Props = {
  open: boolean;
  toggleOpen: () => void;
};

const Modal = ({ open, toggleOpen }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={toggleOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content className="bg-beige-100 p-5 fixed w-96 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <Dialog.Title>Modal</Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
