import React, { ReactNode, useRef } from "react";
import Modal from "react-modal";

export const customStyles: Modal.Styles = {
  content: {
    width: "80%", // Base width for all screens
    maxWidth: "600px", // Max width for larger screens
    margin: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

interface UseModalProps {
  children: ReactNode;
  isOpen: any;
  closeModal: any;
}

export const UseModal: React.FC<UseModalProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  const subtitle = useRef<HTMLHeadingElement | null>(null);
  const afterOpenModal = () => {
    if (subtitle.current) {
      subtitle.current.style.color = "#f00";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex justify-end">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2 sm:w-full md:w-auto" // Adjust button size for small and medium screens
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      {children}
    </Modal>
  );
};
