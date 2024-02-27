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
         P.Y.CHEN
        </h1>
        <p className={ styles.description}>
          Hello!<br></br>I&#39;m Pin-Yang Chen, Bachelor of Science in Management Information System, with interdisciplinary certifications in Computer Programming and E-commerce.
          Currently working as a software engineer at a blockchain company, ISUNCLOUD.<br></br>
          Nice to meet you.
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
      <Image src="/profile_yang.jpg" alt="" fill className={styles.heroImg}/>
    </div>
    </div>
  );
};

export default Home;