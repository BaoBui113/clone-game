import styles from './TextArea.module.css'
const TextAreaCustom = ({ value, handleChange, placeholder = "",row = 3 ,maxLength = 200}) => {
    return (
        <div className={styles.container}>
            <textarea
                className={styles.input}
                type="text"
                placeholder={placeholder}
                onChange={text => handleChange(text.target.value)}
                value={value}
                maxLength={maxLength}
                rows={row}
            />
        </div>
    )
}



export default TextAreaCustom