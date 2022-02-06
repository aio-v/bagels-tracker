import styles from '../styles/Home.module.css';

import { getHomePgDataFromSheet } from './api/sheets';
import Head from 'next/head';
import HomeLayout from '../components/layouts/HomeLayout';
import Navbar from '../components/Navbar';


export default function Home({flaggerData, guildData, playerData}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bagels Reboot</title>
        <meta 
          name="description" 
          content="A flag and culvert tracker for Reboot server's Bagels guild." 
        />
      </Head>
      <Navbar />
      <HomeLayout flaggerData={flaggerData} guildData={guildData} playerData={playerData} />
    </div>
  )
}

export async function getStaticProps(context) {
  const sheet = await getHomePgDataFromSheet();
  return {
    props: {
      playerData: sheet.playerWeekly,
      guildData: sheet.guildWeekly,
      flaggerData: sheet.flagWeekly
    },
    revalidate: 10, // In seconds
  };
}
