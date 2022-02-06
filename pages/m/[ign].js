import styles from '../../styles/Home.module.css';

import { useRouter } from 'next/router';
import { getPlayerFromSheet } from '../api/sheets';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import MemberLayout from '../../components/layouts/MemberLayout';

export default function User(props) {
    const router = useRouter();
    const ign = decodeURIComponent(router.query.ign);
    return (
        <div className={styles.container}>
        <Head>
            <title>Bagels {ign}</title>
        </Head>
        <Navbar />
        <MemberLayout info={props.info} culvertLog={props.culvertLog} flagLog={props.flagLog} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const sheet = await getPlayerFromSheet(context.query.i);
    return {
      props: {
        info: sheet.memberInfo,
        culvertLog: sheet.memberCulvert,
        flagLog: sheet.memberFlag
      },
    };
}
