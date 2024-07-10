import React from 'react';
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types';

function Modal({ isOpen, children, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          {/* Modal header with close button */}
          <div className="flex justify-between items-start p-4 border-b">
            <h2 className="text-xl font-medium text-gray-900">CREATE</h2>
            <button onClick={onClose} className="text-2xl p-1 rounded hover:bg-gray-200">
              <CloseOutlined />
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
