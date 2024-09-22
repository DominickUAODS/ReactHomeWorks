import { createPortal } from "react-dom";
import "./Modal.css";

const modalNode = document.getElementById("modal");

const renderContent = (props) => {
	return createPortal(
		<div>
			<div className="background" onClick={props.closeModal} />
			<div className="modal">
				<button className="modal__close" onClick={props.closeModal}>
					&times;
				</button>
				{props.children}
			</div>
		</div>,
		modalNode
	);
};
const Modal = (props) => {
	return props.open === true ? renderContent(props) : null;
};

export default Modal;
