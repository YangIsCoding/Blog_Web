import Image from "next/image";
import styles from "./resume.module.css";

const Resume = () => {
  return (
    <div>
      <div className={styles.imgContainer}>
        <section className="cyberpunk both">
          <img src="/tools.png" alt="Tools" />
        </section>
      </div>

      <h1 id="pin-yang-chen">Pin-Yang Chen</h1>
      <p>Address: 72 Argonaut Drive, Durham, North Carolina, USA</p>
      <p>Contact: +1-919-685-2936 / pin-yang.chen@duke.edu</p>
      <p>
        Website:{" "}
        <a className={styles.link} href="https://www.chenpinyangdev.com">
          www.chenpinyangdev.com
        </a>
      </p>

      <h2 id="education">EDUCATION</h2>
      <ul>
        <li>
          <strong>Duke University, North Carolina, USA</strong>
          <ul>
            <li>
              &emsp;Master of Engineering in Financial Technology, Aug. 2024 –
              Present
            </li>
            <li>
              &emsp;Concentration: innovative Blockchain solutions, programming
              in fintech
            </li>
          </ul>
        </li>
        <li>
          <strong>
            National Chung Cheng University (CCU), Chiayi, Taiwan
          </strong>
          <ul>
            <li>
              &emsp;Bachelor of Science in Management Information System, Sep.
              2020 – Jun. 2024
            </li>
            <li>
              &emsp;Certified in interdisciplinary courses: Computer Science and
              Accounting
            </li>
          </ul>
        </li>
      </ul>

      <h2 id="skills">SKILLS</h2>
      <ul>
        <li>
          &emsp;<strong>Programming:</strong> Solidity, C, C#, Python, HTML, CSS,
          JavaScript
        </li>
        <li>
          &emsp;<strong>Framework:</strong> Hardhat, Node.js, Next.js, Vercel,
          Web3.js, Prisma, RESTful API, Linux, PlanetScale, Neat.py
        </li>
      </ul>

      <h2 id="experience">EXPERIENCE</h2>
      <ul>
        <li>
          <strong>Blockchain Engineer Intern, Isuncloud</strong> (Sep. 2023 – Apr. 2024)
          <ul>
            <li>
              &emsp;Designed and implemented NFT report management system (ERC-7593).
            </li>
            <li>
              &emsp;Integrated security measures for data integrity and access control.
            </li>
            <li>
              &emsp;Optimized gas fees (saved 34% deployment, 60% transaction), saving 2 hours on Sepolia.
            </li>
            <li>
              &emsp;
              ERC-7593:{" "}
              <a href="https://ethereum-magicians.org/t/erc-7593-nft-synthetic-evidence/17986">
                Link
              </a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Blockchain Researcher Intern, SkyTrade</strong> (Aug. 2024 – Nov. 2024)
          <ul>
            <li>
              &emsp;Implemented Solana multi-sig wallets and fractionalized Metaplex cNFTs.
            </li>
            <li>
              &emsp;Adopted Single-SPA + micro-app for modular Next.js frontend.
            </li>
          </ul>
        </li>
      </ul>

      <h2 id="projects">PROJECTS</h2>
      <ul>
        <li>
          <strong>Crypto Auditing System on Blockchain</strong>
          <ul>
            <li>
              &emsp;Automated financial report generation from user input via smart contracts.
            </li>
            <li>
              &emsp;Optimized smart contracts and reduced deployment time by 80%.
            </li>
            <li>
              &emsp;Dynamically generated RESTful APIs based on report queries.
            </li>
            <li>
              &emsp;Used registry pattern and 300+ test cases to ensure reliability.
            </li>
          </ul>
        </li>
        <li>
          <strong>Personal Full-Stack Website</strong>
          <ul>
            <li>
              &emsp;Built blog:{" "}
              <a href="https://www.chenpinyangdev.com">
                www.chenpinyangdev.com
              </a>{" "}
              (1062% reach growth in 7 days).
            </li>
            <li>
              &emsp;Frontend: Next.js 14, responsive web design, CSS animation.
            </li>
            <li>
              &emsp;Backend: Node.js + Prisma (SQLite), CI/CD with GitHub Actions.
            </li>
          </ul>
        </li>
      </ul>

      <h2 id="volunteering">VOLUNTEERING</h2>
      <ul>
        <li>
          <strong>Ethereum Official Document Translator</strong> (Sep. 2023 – Present)
          <ul>
            <li>
              &emsp;Translate Ethereum documentation to improve global accessibility.
            </li>
            <li>
              &emsp;Deepen blockchain understanding through technical translation.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Resume;
