import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};


const AboutPage = () => {

  // console.log("lets check where it works")
    return (
      
        <div className={styles.container}>
            <div className={styles.imgContainer}>
        <Image
          src="/about.jpg"
          alt="About Image"
          fill
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Yang</h2>
        <h1 className={styles.title}>
          Infuse code with "ROMANCE"
        </h1>
        <p className={styles.desc}>
          "The world is a simulation.”<br></br>

This realization dawned on me during a philosophical debate on materialism versus idealism. I came to understand that the internet and server concepts are perfect metaphors for idealism. Our world is replete with virtual constructs like currency, nationality, and law - all born from collective human consensus and shaping our social fabric. These days, such constructs predominantly reside in the cloud, significantly influencing sectors like healthcare, finance, and transportation. This transition to the virtual underscores a vital truth about our society's structure. So, enhancing these virtual elements is crucial for world improvement, with computer science playing a pivotal role.

        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>100000 +</h1>
            <p className={ styles.boxDesc}>Lines of codes</p>
          </div>
          <div className={styles.box}>
            <h1>30 +</h1>
            <p className={ styles.boxDesc}>Languages and tools</p>
          </div>
          <div className={styles.box}>
            <h1>10 +</h1>
            <p className={ styles.boxDesc}>Numbers of projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;