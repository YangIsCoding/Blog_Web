import styles from "./resume.module.css";

const Resume = () => {
  return (
    <div className={styles.resumeContainer}>
      <div className={styles.imgContainer}>
        <section className="cyberpunk both">
          <img src="/tools.png" alt="Tools" />
        </section>
      </div>

      <h1>Pin-Yang Chen</h1>
          <p>Address: 72 Argonaut Drive, Durham, North Carolina, USA</p>
          <p>Phone: +1-919-685-2936</p>
          <p>Email: pin-yang.chen@duke.edu</p>
      <p>
        Website:{" "}
        <a className={styles.link} href="https://www.chenpinyangdev.com" target="_blank">
          www.chenpinyangdev.com
        </a>
      </p>

      <h2>EDUCATION</h2>
      <ul className={styles.sectionList}>
        <li>
          <p><strong>Duke University, North Carolina, USA</strong></p>
          <ul>
            <li>Master of Engineering in Financial Technology, Aug. 2024 – Present</li>
            <li>Concentration: innovative Blockchain solutions, programming in fintech</li>
          </ul>
        </li>
        <li>
          <p><strong>National Chung Cheng University (CCU), Chiayi, Taiwan</strong></p>
          <ul>
            <li>Bachelor of Science in Management Information System, Sep. 2020 – Jun. 2024</li>
            <li>Interdisciplinary Course Programs certifications in Department of Computer Science and Department of Accounting</li>
          </ul>
        </li>
      </ul>

      <h2>SKILLS</h2>
      <ul className={styles.sectionList}>
        <li><strong>Programming:</strong> Solidity, C, C#, Python, HTML, CSS, JavaScript</li>
        <li><strong>Framework:</strong> Hardhat, Node.js, Next.js, Vercel, Web3.js, Prisma, RESTful API, Linux, PlanetScale, Neat.py</li>
      </ul>

      <h2>EXPERIENCE</h2>
      <ul className={styles.sectionList}>
        <li>
          <p><strong>Blockchain Engineer Intern, Isuncloud</strong> (Sep. 2023 – Apr. 2024)</p>
          <ul>
            <li>Designed and implemented NFT report management system: Created a standardized interface (ERC-7593) for managing NFTs representing reports, ensuring each report is technically distinct and compliant with ERC-721 for cross-platform interoperability.</li>
            <li>Security and compliance: Integrated additional security measures to prevent unauthorized access and modifications, maintaining high standards of data integrity across platforms.</li>
            <li>Enhance efficiency: Controlled the data structure to reduce Blockchain gas fees (34% of deployment gas fee, 60% of transaction fee), saving 2 hours for system deployment on Sepolia testnet.</li>
            <li>ERC-7593: <a className={styles.link} href="https://ethereum-magicians.org/t/erc-7593-nft-synthetic-evidence/17986" target="_blank">https://ethereum-magicians.org/t/erc-7593-nft-synthetic-evidence/17986</a></li>
          </ul>
        </li>
        <li>
          <p><strong>Blockchain Researcher Intern, SkyTrade</strong> (Aug. 2024 – Nov. 2024)</p>
          <ul>
            <li>Researched and implemented Solana multi-signature wallets for asset security and transaction management</li>
            <li>Developed solutions for fractionalizing Metaplex cNFTs using SPL tokens.</li>
            <li>Integrated microfrontend architecture using Single-SPA and @micro-zoe/micro-app to streamline Next.js applications.</li>
          </ul>
        </li>
      </ul>

      <h2>PROJECTS</h2>
      <ul className={styles.sectionList}>
        <li>
          <p><strong>Crypto Auditing System on Blockchain</strong></p>
          <ul>
            <li>Automated financial reporting: Developed a system on Blockchain that processes multiple transaction types, such as currency exchange and transfers, allowing users to input transaction data and specify a time range for generating financial reports on distributed ledger.</li>
            <li>Smart contract development: Implemented robust attack prevention code and optimized the deployment process, reducing the original smart contract system deployment time by 80%.</li>
            <li>Dynamic API generation: Designed the system to instantly generate and provide Restful APIs based on user requests for specific reports, enhancing accessibility and efficiency.</li>
            <li>Implemented unit testing, automated testing, and registry pattern: Ensured system reliability and maintainability through rigorous testing and design patterns, utilizing 300 test cases to safe customers' cryptocurrency.</li>
          </ul>
        </li>
        <li>
          <p><strong>Personal Full-Stack Website</strong></p>
          <ul>
            <li>Content creation: Developed a blog website <a className={styles.link} href="https://www.chenpinyangdev.com" target="_blank">www.chenpinyangdev.com</a> to share insights on Ethereum, philosophy, and software tutorials that achieved a 1062% increase in reach within 7 days.</li>
            <li>Frontend development: Built the website using Next.js 14, ensuring a seamless user experience by retrieving data from backend APIs, designing responsive web design (RWD), and creating CSS animations.</li>
            <li>Backend development: Implemented the backend using Node.js to generate APIs, utilized Prisma's SQLite for the database, and employed GitHub CI/CD workflows for continuous monitoring.</li>
          </ul>
        </li>
        <li>
            <p><strong>LedgerVest – Decentralized Fundraising Platform</strong></p>
            <ul>
                <li>Built a blockchain-based platform that enables startups to raise funds transparently and empowers investors to track fund usage through smart contract logic and on-chain governance.</li>
                <li>Implemented a milestone-based funding mechanism where investors vote on fund releases, reducing the risk of fund misuse and increasing trust between parties.</li>
                <li>Designed investor dashboards to monitor project progress, returns, and repayment status, ensuring transparency in every step of the fundraising process.</li>
                <li>Led the development of core campaign features including project creation, investment, repayment, and investor protection through collateral and refund logic.</li>
                <li>LedgerVest: <a className={styles.link} href="https://ledgervest.colab.duke.edu/" target="_blank">https://ledgervest.colab.duke.edu/</a></li>
            </ul>
        </li>

      </ul>

      <h2>VOLUNTEERING</h2>
      <ul className={styles.sectionList}>
        <li>
          <p><strong>Ethereum Official Document Translator</strong> (Sep. 2023 – Present)</p>
          <ul>
            <li>Translate Ethereum official documents to make Ethereum more visible to the worldwide public.</li>
            <li>Enhance personal knowledge of Ethereum and Blockchain to achieve more accurate translations.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Resume;
