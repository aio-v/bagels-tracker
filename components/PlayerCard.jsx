import styles from '../styles/PlayerCard.module.css';
import React from 'react';
import Image from 'next/image';


export default function PlayerCard(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                {props.avatar ? 
                <Image src={props.avatar} 
                    alt="" 
                    width={96}
                    height={96} /> : 
                <Image src="https://i.imgur.com/SXtkcXd.png" 
                    alt=""
                    width={96}
                    height={96} />}
            </div>
            <div className={styles.info_wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th colSpan="2" className={styles.header}>{props.ign}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.category}>Level</td>
                            <td>{props.level ? props.level : "Unranked"}</td>
                        </tr>
                        <tr>
                            <td className={styles.category}>Class</td>
                            <td>{props.class ? props.class : "Unranked"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}