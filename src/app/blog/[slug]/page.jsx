import React from 'react';
import styles from "./singlePost.module.css";
import Image from 'next/image';


const SinglePostPage = async () => { 
  return (
    <div className={ styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/chips.gif" alt="" fill className={ styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>title</h1>
        <div className={styles.detail}>
          <Image className={styles.avatar} src="/profile_yang.jpg" alt="" width={50} height={50} />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Pin yang Chen</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>pulished</span>
            <span className={styles.detailValue}>2024.03.03</span>
          </div>
        </div>
        <div className={styles.content}>
          sd;flkhasdljghboiasdbvoiasbdvoiubhawlviubhasdhjivbasv
        </div>
      </div>
    </div>
  );
}
export default SinglePostPage;