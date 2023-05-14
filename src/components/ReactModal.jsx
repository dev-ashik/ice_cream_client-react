import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",

    transform: "translate(-50%, -50%)",
    border: '1px solid #313bac',
  },
  overlay: { zIndex: 1000 },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export const ReactModal = ({children, modalIsOpen, setModalIsOpen}) => {

  function openModal() {
    setModalIsOpen(true);
  }


  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="close-button" onClick={closeModal}>x</button>
        <div>
          {children}
        </div>
      </Modal>
    </div>
  );
};
