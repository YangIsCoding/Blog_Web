import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from 'next/link';
import Image from "next/image";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <Link href="/" passHref>
                <Image src="/profile_yang.jpg
                    " alt="Logo" className={styles.logo} width={50} height={50} />
            </Link>
            <div>
                <Links/>
            </div>

        </div>
    )
}

export default Navbar;