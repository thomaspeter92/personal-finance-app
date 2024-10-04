import React, { Children } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "../../hooks/useModal";
import { Icons } from "./Icons";

type Props = {
  open: boolean;
  toggleOpen: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ open, toggleOpen, title, children }: Props) => {
  const CloseIcon = Icons["closeModal"];
  return (
    <Dialog.Root open={open} onOpenChange={toggleOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content className="bg-beige-100 p-5 fixed w-[500px] max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-full rounded-xl">
          <Dialog.Title className="text-lg mb-3 font-bold flex justify-between items-center">
            {title}
            <Dialog.Close>
              <CloseIcon className="fill-gray-500" />
            </Dialog.Close>
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
