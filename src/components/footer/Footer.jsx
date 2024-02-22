import styles from './footer.module.css';
const Footer = () => { 
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Yangdev</div>
            <div className={styles.text}>
                Yang creative thoughts, all rights reserved
            </div>
            
        </div>
    )
}

export default Footer;