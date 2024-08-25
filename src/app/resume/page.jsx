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
<p>Address: 72 Argonaut Drive, Durhum, North Carolina </p>
<p>Contact: 919-685-2936/ pin-yang.chen@duke.edu </p>
            <p>Website: <a className={ styles.link} href="www.chenpinyangdev.com">www.chenpinyangdev.com</a></p>
<h2 id="education">EDUCATION</h2>
<ul>
<li><strong>Duke University, North Carolina, USA</strong><ul>
<li>&emsp;Master of Engineering in Financial Technology, Sep. 2024 – Present</li>
</ul>
                </li>
                <li><strong>National Chung Cheng University (CCU), Chiayi, Taiwan</strong><ul>
<li>&emsp;Bachelor of Science in Management Information System, Sep. 2020 – Jan. 2024</li>
<li>&emsp;Interdisciplinary Course Programs certificated in Department of Computer Science and Department of Accounting</li>
</ul>
</li>
</ul>
<h2 id="skills">SKILLS</h2>
<ul>
<li>&emsp;Programming: Solidity, C, C#, Python, HTML, CSS, JavaScript</li>
<li>&emsp;System Flow: UML graph, develop class diagram, sequence diagram, GitHub Workflow</li>
<li>&emsp;Framework: Hardhat, Node.js, Next.js, Vercel, Web3.js, Prisma, RESTful API, Linux, Pandas, PlanetScale, Neat.py</li>
</ul>
<h2 id="experience">EXPERIENCE</h2>
<ul>
<li><strong>BlockChain Engineer intern, ISunCloud, Sep. 2023 – Apr. 2024</strong><ul>
                    <li>&emsp;Created a standardized interface (ERC-7593) for managing NFTs representing reports, ensuring each report is technically distinct and compliant with ERC-721 for cross-platform interoperability.</li>
                    <li>&emsp;Controled the data structure to reduce blockchain gas fees(34% of deployment gas fee, 60% of transaction fee), saving 2 hours for system deployment</li>
                    <li>&emsp;ERC-7593: https://ethereum-magicians.org/t/erc-7593-nft-synthetic-evidence/17986</li>
</ul>
</li>
<li><strong>Database Courses of English translation and voice dubbing, CCU, May. 2022 – Mar. 2023</strong><ul>
                    <li>&emsp;Executed the comprehensive translation of a series of Chinese Database courses into English, resulting in an increase of course access by 200 students; the initiative fostered an inclusive learning environment for diverse backgrounds.</li>
                    <li>&emsp;Provided English voice dubbing for Chinese Database courses to cater to international students.</li>
</ul>
</li>
</ul>
<h2 id="academic-projects">ACADEMIC PROJECTS</h2>
<ul>
<li><strong>Auditing System on blockchain</strong><ul>
                    <li>&emsp;Developed a system on blockchain that processes multiple transaction types, allowing users to input transactions and specify a time range for generating financial reports, including balance sheets, income statements, and cash flow statements.</li>
                    <li>&emsp;Implemented a feature to store these reports in an SQLite database using Prisma ORM.</li>
                    <li>&emsp;Designed the system to instantly generate and provide Restful APIs based on user requests for specific reports, enhancing accessibility and efficiency.</li>
                    <li>&emsp;Ensured system reliability and maintainability through rigorous testing and design patterns with 300 test cases.</li>
</ul>
</li>
<li><strong>Personal Full-stack website</strong><ul>
                    <li>&emsp;Built the website www.chenpinyangdev.com using Next.js 14, ensuring a seamless user experience by retrieving data from backend APIs.</li>
                    <li>&emsp;Achieved a 1062% increase in reach within 7 days.</li>
                    <li>&emsp;Implemented the backend with Node.js to generate APIs and used Prisma SQLite for the database.</li>
                    <li>&emsp;Developed a blog on the website to share insights on Ethereum, personal thoughts, and tutorials.</li>
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
                    <li>&emsp;Translate Ethereum official documents to make Ethereum more visible to the worldwide public.</li>
                    <li>&emsp;Enhance personal knowledge of Ethereum and blockchain to achieve more accurate translations.</li>
</ul>
</li>
</ul>

        </div>
    );
}

export default resume;