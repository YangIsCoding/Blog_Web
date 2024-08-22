"use client";
import Head from 'next/head';
import styles from './home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about'); 
  };

  const handleContactClick = () => {
    router.push('/contact'); 
  };

  return (
    <>
      <Head>
        <meta name="title" property="og:title" content="here yo">hrere</meta>
        <meta property="og:title" content="P.Y.CHEN - Home" />
        <meta property="og:description" content="Chen Pin Yang's personal portfolio, showcasing skills, experience, and projects in Fintech and software development." />
        <meta property="og:image" content="https://www.chenpinyangdev.com/profile_yang.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.chenpinyangdev.com/" />
      </Head>

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title} data-text="P.Y.CHEN">P.Y.CHEN</h1>
          <p className={styles.description}>
            Hello!<br />
            I&#39;m Chen Pin Yang, please just call me Yang. I hold Bachelor of Science in Management Information System, with interdisciplinary certifications in Computer Programming and E-commerce.<br />
            I have previously worked as a software engineer at ISUNCLOUD, a blockchain company.<br />
            Currently, I am pursuing a Master degree of Fintech Program at the Pratt School of Engineering, Duke University, USA.<br /><br />
            你好嗎! What&#39;s up!
          </p>
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
