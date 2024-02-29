import styles from './footer.module.css';
const Footer = () => { 
    return (
        <div className={styles.container}>
            <div className={styles.logo}>P.Y.Chen dev</div>
            <div className={styles.text}>
                Pin-Yang, Chen creative thoughts, all rights reserved
            </div>
            <div className={styles.text}>
                Email: allanustw@gmail.com
            </div>
            
        </div>
    )
}

export default Footer;