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

  //className="cyber-h" , className={styles.title}
  return(
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title} data-text="P.Y.CHEN">P.Y.CHEN</h1>
        <p className={ styles.description}>
          Hello!<br></br>I&#39;m Chen Pin Yang, please just call me Yang, I hold Bachelor of Science in Management Information System, with interdisciplinary certifications in Computer Programming and E-commerce.<br></br>
          I have previously worked as a software engineer at ISUNCLOUD, a blockchain company.<br></br>
          Currently, I am pursuing a Fintech Program at the Pratt School of Engineering, Duke University, USA<br></br><br></br>
          你好嗎! What's up!
      </p>
      <div className={styles.buttons}>
          <button className="cybr-btn" onClick={handleClick}>
                Learn More<span aria-hidden>_</span>
                <span aria-hidden className="cybr-btn__glitch">Learn More_</span>
                
          </button>
          <button className="cybr-btn" onClick={handleContactClick}>
              Contact<span aria-hidden>_</span>
            <span aria-hidden className="cybr-btn__glitch">Contact_</span>
            
             
          </button>
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
          <section className="cyberpunk both">
          <img src="/profile_yang.jpg" class="cyber-glitch-0"/>
        </section>


       </div>
      </div>
  );
};

export default Home;