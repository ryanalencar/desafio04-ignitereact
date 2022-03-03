import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";

interface IModalProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: () => void;
}
function Modal({ isOpen, children, setIsOpen }: IModalProps) {
  const [modalStatus, setModalStatus] = useState(isOpen);

  const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (prevIsOpen !== isOpen) {
      setModalStatus(isOpen);
    }
  }, [prevIsOpen, isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#F0F0F5",
          color: "#000000",
          borderRadius: "8px",
          width: "736px",
          border: "none",
        },
        overlay: {
          backgroundColor: "#121214e6",
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
