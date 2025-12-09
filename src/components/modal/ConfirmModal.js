import React from 'react';
import ReactModal from 'react-modal';
import QuestionIcon from '../../assets/images/icons/QuestionIcon.png';

export const ConfirmModal = ({
  modalIsOpen,
  setModalIsOpen,
  onAccept,
  type,
  category,
  onCancelCallback
}) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        },
        content: {
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          width: 500,
          borderRadius: 18,
          height: 550
        }
      }}>
      <button
        className="absolute px-4 py-1 text-black rounded-md top-5 right-5"
        onClick={() => {
          setModalIsOpen(false);
        }}>
        ╳
      </button>
      <div className="w-full mt-20">
        <div className="flex items-center justify-center">
          <img src={QuestionIcon} />
        </div>
        <p className="mt-5 text-4xl text-center font-apercuBold">
          Are you sure you want to <span className="text-red-600">{category}</span> {type}?
        </p>
        <div className="flex justify-around mt-10 gap-x-5">
          <button
            className="w-full py-5 text-xl text-white bg-red-600 rounded-3xl font-apercuBold"
            onClick={() => {
              setModalIsOpen(false);
              onCancelCallback && onCancelCallback();
            }}>
            No
          </button>
          <button
            className="w-full py-5 text-xl text-black bg-errand-primary rounded-3xl font-apercuBold"
            onClick={onAccept}>
            Yes
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
