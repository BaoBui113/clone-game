

import styles from './TextInput.module.css'
const TextInput = ({ value, onValueChange = null, placeholder = "", disabled = false, type="text", maxLength = 100 }) => {
    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type={type}
                placeholder={placeholder}
                onChange={text => onValueChange(text.target.value)}
                value={value}
                disabled={disabled}
                maxLength={maxLength}
            />
        </div>
    )
}

export default TextInput
