import React from 'react';
import Link from 'next/link';

import styles from '../styles/Navbar.module.css';

export default function Navbar(props) {
    return (
        <nav className={styles.navWrapper}>
            <span className={styles.logoWrapper}>
                <Link href="/">
                    <a>Bagels</a>
                </Link>
            </span>
            {/* <Link href="/gallery">
                <a>GALLERY</a>
            </Link> */}
            <a href="https://discord.gg/bagels">
                DISCORD
            </a>
            {/* <button className={styles.mode} type="button">
                <i className="far fa-moon"></i>
            </button> */}
        </nav>
    )
}