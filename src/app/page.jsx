"use client";
import Head from 'next/head';
import styles from './home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Home = () => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/about'); // 程序化地导航到 /about 页面
  };

  const handleContactClick = () => {
    router.push('/contact'); // 程序化地导航到 /contact 页面
  };

  return (
    <>
      <Head>
        <title>P.Y.CHEN - Personal Portfolio</title>
        <meta name="description" content="Hello! I'm Chen Pin Yang, please just call me Yang. I hold a Bachelor of Science in Management Information System, with interdisciplinary certifications in Computer Programming and E-commerce. I have previously worked as a software engineer at ISUNCLOUD, a blockchain company. Currently, I am pursuing a Master degree of Fintech Program at the Pratt School of Engineering, Duke University, USA. 你好嗎! What's up!" />
        <meta name="keywords" content="Chen Pin Yang, portfolio, Fintech, software engineer, Duke University" />
      </Head>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title} data-text="P.Y.CHEN">P.Y.CHEN</h1>
          <div className={styles.descriptionContainer}>
  <p className={styles.description}>
    Hello!<br />
    I&#39;m Chen Pin Yang, please just call me Yang. I hold a Bachelor of Science in Management Information System, with interdisciplinary certifications in Computer Programming and E-commerce.<br />
    I have previously worked as a software engineer at ISUNCLOUD, a blockchain company.<br />
    Currently, I am pursuing a Master degree of Fintech Program at the Pratt School of Engineering, Duke University, USA.<br /><br />
    你好嗎! What&#39;s up!
  </p>
</div>

          <div className={styles.buttons}>
            <button className="cybr-btn" onClick={handleClick} aria-label="Learn more about Chen Pin Yang">
              Learn More<span aria-hidden>_</span>
              <span aria-hidden className="cybr-btn__glitch">Learn More_</span>
            </button>
            <button className="cybr-btn" onClick={handleContactClick} aria-label="Contact Chen Pin Yang">
              Contact<span aria-hidden>_</span>
              <span aria-hidden className="cybr-btn__glitch">Contact_</span>
            </button>
          </div>
          <div className={styles.brands}>
            <a href="https://www.instagram.com/yong881122/" target="_blank" rel="noopener noreferrer">
              <Image src="/instagram.png" alt="Follow us on Instagram" width={100} height={50} className={styles.brandImg} />
            </a>
            <Link href="https://github.com/YangIsCoding" passHref>
              <Image src="/github.png" alt="Github" width={100} height={50} className={styles.brandImg} />
            </Link>
            <Link href="https://www.linkedin.com/in/pin-yang-chen-445bba288/" passHref>
              <Image src="/linkedin.png" alt="LinkedIn" width={100} height={50} className={styles.brandImg} />
            </Link>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <section className="cyberpunk both">
            <img src="/profile_yang.jpg" alt="Profile Picture" className="cyber-glitch-0" />
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
