import { useState } from "react";

interface Props {
  children: React.ReactNode;
  setOnClose: (val: boolean) => void;
  onClose: boolean;
}

const Modal: React.FC<Props> = ({ children, setOnClose, onClose }) => {
  const handleModalClose = () => {
    setOnClose(!onClose);
  };
  return (
    <div
      className={`w-full h-full bg-blue-600 absolute z-10 top-0 left-0 space-y-10 flex justify-center ${
        onClose ? "flex" : "hidden"
      }`}
    >
      <div
        className="absolute right-5 cursor-pointer"
        onClick={handleModalClose}
      >
        cerrar
      </div>
      {children}
    </div>
  );
};
export default Modal;
