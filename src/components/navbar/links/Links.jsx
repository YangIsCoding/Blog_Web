"use client";
import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";    
import Image from "next/image";

const links = [
        { title: "Home", path: "/" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
        { title: "Blog", path: "/blog" },
    { title: "Résumé", path: "/resume" },
    { title: "LVT", path: "/ledgervest" },
    { title: "Support", path: "/donate" },
];
    
const Links = () => { 
    const [open,setOpen] = useState(false);

    //temp
    const session = true;
    const isAdmin = true;

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map(
                    link => (<NavLink item={link} key={link.title}/>)
                )}
            </div>
            <Image className={ styles.menuButton} src="/menu.png" alt="open menu" width={30} height={ 30} onClick={() => setOpen(prev => !prev)}/>
            {
                open &&
                <div className={styles.mobileLinks}>
                        {
                            links.map(
                                link => (<NavLink item={link} key={link.title}/>)
                            )
                        }
                </div>
            }
        </div>
    )
}

export default Links;