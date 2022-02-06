import React from 'react';
import Image from 'next/image';
import styles from '../styles/FlagSpotlight.module.css';

export default function FlagSpotlightCard(props) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.flaggers_container}>
                {
                    props.players && props.players.length ? (
                        props.players.map((player) => (
                            <div key={player.ign} className={styles.flagger}>
                                {player.avatar ? <Image src={player.avatar} 
                                            alt="" 
                                            width={96}
                                            height={96} /> : 
                                        <Image src="https://i.imgur.com/SXtkcXd.png" 
                                            alt=""
                                            width={96}
                                            height={96} />}
                                <div>{player.ign}</div>
                            </div>
                        ))
                    ) : (
                        console.log("No guildies reached 1k this week")
                    )
                }
                {
                    props.players.length < 5 ? (
                        <div className={styles.flagger + " " + styles.filler}>
                        <Image src="https://i.imgur.com/SXtkcXd.png" 
                                                    alt=""
                                                    width={96}
                                                    height={96} />
                        <div>You&#39;re Next!</div>
                        </div>) :
                    ''
                }
            </div>
        </div>
    )
}