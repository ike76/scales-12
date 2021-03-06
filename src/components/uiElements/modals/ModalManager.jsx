import React from "react";
import { connect } from "react-redux";
import { closeModal } from "./modalActions.jsx";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import NotesModal from "./NotesModal.jsx";
import SignUpInterrupt from "./SignUpInterrupt.jsx";
import HistoryInterrupt from "./HistoryInterrupt";
import NameCityModal from "./NameCityModal";

const modalLookup = {
  LoginModal: LoginModal,
  RegisterModal: RegisterModal,
  SignUpInterrupt: SignUpInterrupt,
  Notes: NotesModal,
  HistoryInterrupt: HistoryInterrupt,
  NameCity: NameCityModal
};

const ModalManager = ({ currentModal, closeModal }) => {
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} closeModal={closeModal} />;
  }
  return <span>{renderedModal}</span>;
};

const mapStateToProps = state => ({
  currentModal: state.modal
});

const actions = { closeModal };

export default connect(
  mapStateToProps,
  actions
)(ModalManager);
