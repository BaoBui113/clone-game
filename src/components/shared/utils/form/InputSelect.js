
import styles from './InputSelect.module.css'
import { formatThousand, removeAllDot } from '@/libs/helpers/format-amount'
const InputSelect = ({ value = "", options = [], placeholder = "", onValueChange }) => {
    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type="text"
                placeholder={placeholder}
                onChange={text => onValueChange(removeAllDot(text.target.value))}
                value={formatThousand(value)}
            />
            <div className={styles.optionWrap}>
                {options.map((option, key) => (
                    <div className={styles.item} key={key} onClick={() => onValueChange(removeAllDot(option.value))}>{option.name} </div>
                ))}
            </div>

        </div>
    )
}

export default InputSelect