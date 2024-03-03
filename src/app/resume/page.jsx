import Image from "next/image";
import styles from "./resume.module.css";
const resume = () => { 
    return (
        
        <div>
            <div className={styles.imgContainer}>
                <section className="cyberpunk both">
                    <img src="/tools.png"  
                     
                    />
                </section>
            
            </div>
            <h1 id="pin-yang-chen">Pin-Yang Chen</h1>
<p>Address: No. 8 Qiancun E. Rd. Daya Dist. Taichung City Taiwan </p>
<p>Contact: +886-968-512787/ allanustw@gmail.com </p>
<p>Website: <a href="https://blog-web-kohl-iota.vercel.app/">https://blog-web-kohl-iota.vercel.app/</a></p>
<h2 id="education">EDUCATION</h2>
<ul>
<li><strong>National Chung Cheng University (CCU), Chiayi, Taiwan</strong><ul>
<li>&emsp;Bachelor of Science in Management Information System, Sep. 2020 – Expected Jan. 2024</li>
<li>&emsp;Interdisciplinary Course Programs certified in Computer Programming (Department of Computer Science) and E-commerce (Department of Accounting and Information Technology)</li>
</ul>
</li>
</ul>
<h2 id="skills">SKILLS</h2>
<ul>
<li>&emsp;Programming: Solidity, Unity, Linux, C, C#, Python, HTML, CSS, Flutter, JavaScript, Node.js, Next.js, and so on</li>
<li>&emsp;System Flow: UML graph, develop class diagram, sequence diagram, GitHub Workflow</li>
<li>&emsp;Language: English (GRE: 322/340, AW: 4), Chinese (as mother language), Taiwanese (as mother language)</li>
</ul>
<h2 id="experience">EXPERIENCE</h2>
<ul>
<li><strong>BlockChain Engineer of Smart Contract, ISunCloud, Sep. 2023 – Present</strong><ul>
<li>&emsp;Develop auditing system with smart contract using Solidity and node.js that helps assist the company in accounting, auditing, and verification on blockchain. </li>
<li>&emsp;Control the data structure to reduce blockchain gas fees(34% of deployment gas fee, 60% of transaction fee), and increase maintainability, scalability, reliability, and security, saving 2 hours for system deployment.</li>
<li>&emsp;Assist client company in transferring backend data to the blockchain for public and transparent financial authentication.</li>
</ul>
</li>
<li><strong>English Translation and Voice Dubbing for Database Courses, CCU, May. 2022 – Mar. 2023</strong><ul>
                    <li>&emsp;Facilitated the translation of Chinese Database courses into English</li>
                    <li>&emsp;Provided English voice dubbing for Chinese Database courses to cater to international students.</li>
</ul>
</li>
<li><strong>Republic of China Military Soldier, ROC, Aug. 2022 – Dec. 2022</strong><ul>
                    <li>&emsp;Serving as a rifleman with the rank of Private in the Taichung battalion.</li>
                    <li>&emsp;Conducting thorough inspections of armored vehicles and teaching English in the battalion.</li>
</ul>
</li>
</ul>
<h2 id="academic-projects">ACADEMIC PROJECTS</h2>
<ul>
<li><strong>ToughFit Website and DataBase</strong><ul>
                    <li>&emsp;A RWD user-friendly fitness website to meet the rising demand for at-home workout solutions prompted by the pandemic.</li>
                    <li>&emsp;Went beyond conventional fitness platforms by integrating features like a fitness store, personalized healthy menu recommendations, expert-led video tutorials, an extensive knowledge hub, and the option for expert consultations.
</li>
</ul>
</li>
<li><strong>Artificial Neural Network App</strong><ul>
                    <li>&emsp;Developed an app based on Flappy Bird game to explore Artificial Neural Networks</li>
                    <li>&emsp;Each layer of nodes is connected to other nodes, each node is set with a threshold and a weight value.</li>
                    <li>&emsp;The system can automatically adjust the threshold so that the data that passes through the threshold evolves more accurately.</li>
</ul>
</li>
<li><strong>IPO Company Analyzation App</strong><ul>
<li>&emsp;The app allows users to assess critical financial indicators, aiding in informed decision-making for investments and business strategies, navigating personal finance challenges, manage investments, and work towards achieving their financial goals.</li>
</ul>
</li>
</ul>
<h2 id="activities-volunteering">ACTIVITIES/ VOLUNTEERING</h2>
<ul>
<li><strong>Ethereum Official Document Translator, Sep. 2023 – Present</strong><ul>
<li>&emsp;Translate Ethereum official documents to promote global accessibility</li>
</ul>
</li>
</ul>

        </div>
    );
}

export default resume;