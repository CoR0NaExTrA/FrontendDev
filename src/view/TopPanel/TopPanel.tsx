import styles from './TopPanel.module.css'

type TopPanelProps = {
    title: string
}

function TopPanel({title}: TopPanelProps) {
    return (
        <div className={styles.topPanel}>
            <input type="text" defaultValue={title} className={styles.title}/>
        </div>
    )
}

export {
    TopPanel
}