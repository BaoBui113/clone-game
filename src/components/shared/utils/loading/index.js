
import Modal from 'react-modal';
import BeatLoader from 'react-spinners/ScaleLoader'
const Loading = ({ isLoading, onClose }) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "white",
            padding: 0,
            height: 100,
            width: 100,
            borderRadius: 10
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
        }
    };
    return (
        <Modal
            style={customStyles}
            isOpen={isLoading}
            shouldCloseOnOverlayClick={true}
            onRequestClose={onClose}
            ariaHideApp={false}
        >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <BeatLoader color="#36d7b7" loading={isLoading}/>
            </div>
        </Modal>)
}

export default Loading