import React from 'react';
import Modal from 'react-modal';
import {RegularCheckout} from './RegularCheckout'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-40%',
    transform             : 'translate(-50%, -50%)',
    width: 'auto'
  }
};

export const CartModal = (props) => {
  return (
    <Modal
      isOpen={props.show} 
      onRequestClose={props.handleClose}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}>
    <button type="button" className="close" data-dismiss="modal" onClick={props.handleClose} >&times;</button>
    <RegularCheckout />
  </Modal>  
  );  
}



