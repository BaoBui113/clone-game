import { TfiClose } from 'react-icons/tfi'
import styles from './index.module.css'
import './index.css'

import RModal from 'react-modal';
const Modal = ({ children, title, isOpen, onClose, shouldCloseOnOverlayClick = true }) => {
  return (
    <RModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="my-content"
      overlayClassName="my-overlay"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.closeIcon} onClick={(e) => {
            e.preventDefault()
            onClose()}}>
            <TfiClose style={{ width: "30px", height: "30px" }} color='black' />
          </div>
        </div>
        {children}
        <div className={styles.footer}>
          <div className={styles.closeBtn} onClick={() => onClose()} >
            닫기
          </div>
        </div>
      </div>
    </RModal>

  )
}



export default Modal