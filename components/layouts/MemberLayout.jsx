import styles from '../../styles/Home.module.css';
import Script from 'next/script';

import PlayerCard from '../PlayerCard';
import PlacementCard from '../PlacementCard';

export default function MemberLayout({info, culvertLog, flagLog}) {
    return (
        <>
            <Script src="https://kit.fontawesome.com/a4e6dfdc9b.js" crossorigin="anonymous" />
            <div className={styles.container}>
                <div className={styles.card_container}>
                    <div className={styles.card_wrapper}>
                        <PlayerCard ign={info.ign} avatar={info.avatar} class={info.class} level={info.level} />
                    </div>
                    <div className={styles.card_wrapper}>
                        <div className={styles.card_title}>PLACEMENTS</div>
                        <PlacementCard />
                    </div>
                </div>
            </div>
        </>
    )
}