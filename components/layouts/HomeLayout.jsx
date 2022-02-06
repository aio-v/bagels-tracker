import Script from 'next/script';
import styles from '../../styles/Home.module.css';
import FlagSpotlightCard from '../FlagSpotlightCard';
import GuildScoreCard from '../GuildScoreCard';
import TimerCard from '../TimerCard';
import PlayerTable from '../PlayerTable';
import CurrentFlagMap from '../CurrentFlagMap';


export default function Layout({ flaggerData, guildData, playerData }) {
    return (
        <>
        <Script src="https://kit.fontawesome.com/a4e6dfdc9b.js" crossorigin="anonymous" />
        <div className={styles.container}>
            <div className={styles.cards_container}>
                <div className={styles.card_wrapper}>
                    <div className={styles.card_title}>1K GANG</div>
                    <FlagSpotlightCard players={flaggerData} />
                </div>
                <div className={styles.card_wrapper}>
                    <div className={styles.card_title}>REMINDERS</div>
                    <div className={styles.header}>Culvert</div>
                    <TimerCard cutoff={{day: 0, hour: 23, minute: 0}} />
                    <div className={styles.header}>Flag</div>
                    <div>Current Map: <CurrentFlagMap map={guildData.map} /> </div>
                    <TimerCard cutoff={{day: 0, hour: 22, minute: 30}} />
                </div>
                <div className={styles.card_wrapper}>
                    <div className={styles.card_title}>PLACEMENTS</div>
                    <GuildScoreCard culvert={guildData.culvert} flag={guildData.flag} />
                </div>
                
                <div className={styles.card_wrapper + " " + styles.table}>
                    <div className={styles.card_title}>RANKINGS</div>
                    <PlayerTable players={playerData} />
                </div>
                
            </div>
        </div>
        </>
    )
}