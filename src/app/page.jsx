"use client"
import styles from './home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Link from 'next/link';



const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/about'); // 程序化地导航到 /about 页面
  };
  const handleContactClick = () => {
    router.push('/contact'); // 程序化地导航到 /contact 页面
  };
  return(
  <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={ styles.title}>
         Y.Dynamics
        </h1>
        <p className={ styles.description}>
        We are a group of professionals who are passionate about technology and its potential to transform businesses. We are committed to helping our clients achieve their goals by providing them with the best possible solutions.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleClick}>Learn More</button>
        <button className={ styles.button} onClick={handleContactClick}>Contact</button>
      </div>
        <div className={styles.brands}>
          <a href="https://www.instagram.com/yong881122/" target="_blank" rel="noopener noreferrer">
              <Image src="/instagram.png" alt="Follow us on Instagram" width={100} height={50} className={styles.brandImg} />
          </a>
          <Link href="https://github.com/YangIsCoding" passHref><Image src="/github.png" alt=""  width="100" height="50" className={styles.brandImg} /></Link>
          <Link href="https://www.linkedin.com/in/pin-yang-chen-445bba288/" passHref><Image src="/linkedin.png" alt=""  width="100" height="50" className={styles.brandImg}/></Link>
      </div>
    </div>
    <div className={styles.imgContainer}>
      <Image src="/hero.webp" alt="" fill className={styles.heroImg}/>
    </div>
    </div>
  );
};

export default Home;