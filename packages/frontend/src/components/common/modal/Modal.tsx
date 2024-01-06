import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
	title: string;
	isOpen: boolean;
	osClose: Promise<void>;
	children?: any;
}

const Modal = ({ title, isOpen, onClose, children }) => {
	const modalStyle = {
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
		content: {
			width: '50%',
			height: '50%',
			margin: 'auto',
		},
	};

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onClose}
			style={modalStyle}
		>
			<div className="container card h-100 w-100 p-0">
				<div className="card-header">
					<h2>{ title }</h2>

					<button className="btn btn-md top-0 end-0 position-absolute bg-danger" aria-label="Close" onClick={onClose}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div className="d-flex justify-content-center align-items-center card-body" style={{ height: '100%' }}>
					{children}
				</div>
			</div>
		</ReactModal>
	);
};

export default Modal;