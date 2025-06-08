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
              <section className="cyberpunk both">
                <img
                  className="cyberpunk"
                  src="/about.jpg"
                  alt=""
                />
              </section>
            </div>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Yang</h2>
        <h1 className={styles.title}>
          Infuse code with &quot;ROMANCE&quot;
        </h1>
        <p className={styles.desc}>
          &quot;The world is a simulation.&quot;<br></br>


I build systems on the blockchain because I believe that code can shape new forms of trust, value, and freedom.
But beyond engineering, I’m equally drawn to storytelling — through words, images, and sound.

To me, building and creating are two sides of the same pursuit: exploring the edges of what’s real, what’s possible, and what’s meaningful.
In a world increasingly shaped by virtual constructs — currency, law, identity, community — I see code not just as a tool, but as a medium for shaping human experience.

That’s why I infuse code with &quot;romance&quot; — a spirit of curiosity, philosophy, and aesthetic intention.
This is a space where I share my explorations: projects I build, ideas I ponder, and stories I tell.
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