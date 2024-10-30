import styles  from './SubmitBtn.module.css'
const SubmitBtn = ({label="Label", onSubmit, width="200px" })=> {
    return (
        <div className={styles.container} style={{width}}  onClick={onSubmit}>
            {label}
        </div>
    )
}

export default SubmitBtn