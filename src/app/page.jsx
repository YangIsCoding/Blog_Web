"use client";
import styles from './home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';


const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about'); 
  };

  const handleContactClick = () => {
    router.push('/contact'); 
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title} data-text="P.Y.CHEN">P.Y.CHEN</h1>
          <p className={styles.description}>
            I&#39;m Chen Pin Yang, an engineer and a creator, just call me Yang. <br />
            I want to shape the future’s order with blockchain, and the freedom I seek through images and music.<br />
            In a world saturated with code and media, I choose to live as a person with soul and attitude.<br />
            I write articles, edit videos, and craft sound to let ideas flow.<br />
            I know the gap between ideals and reality, and I know fear and doubt will appear.<br />
            But I choose to keep walking—with passion in my eyes.<br />
            Line by line, project by project. This blog is where I document that journey.<br />
            You’re welcome to walk alongside me.:)<br />
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
    </div>
  );
};

export default Home;
