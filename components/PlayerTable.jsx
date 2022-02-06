import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/PlayerTable.module.css';

const Sortable = {              // enums
    "IGN": "ign",
    "CULVERT": "culvert",
    "FLAG": "flag",
    "CULVERT_STREAK": "culvert_streak",
    "FLAG_STREAK": "flag_streak"
};
const Order = {
    "ASCENDING": "1",
    "DESCENDING": "-1"
};

export default class PlayerTable extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            sortBy: Sortable.CULVERT,
            order: Order.DESCENDING,
            sortedPlayers: []
        }
        
        this.onSort = this.onSort.bind(this);
        this.sortTable = this.sortTable.bind(this);
    }

    componentDidMount() {
        this.sortTable(this.state.sortBy, this.state.order);
    }

    onSort(newSortBy) {
        let order = newSortBy == this.state.sortBy ? (this.state.order == Order.DESCENDING ? Order.ASCENDING : Order.DESCENDING) :      // toggle if same category
            newSortBy == Sortable.IGN ? Order.ASCENDING :       // default order for IGN is Ascending
            Order.DESCENDING;                                   // other categories default to Descending
        this.sortTable(newSortBy, order);
    }

    sortTable(sortBy, order) {
        let playerData = [...this.props.players];
        playerData.sort((a, b) => {
            if(sortBy == Sortable.IGN) 
                return a[sortBy].localeCompare(b[sortBy]) * order;
            return (a[sortBy] - b[sortBy]) * order;
        });
        this.setState({
            sortBy: sortBy,
            order: order,
            sortedPlayers: playerData
        });
    }

    render() {
        return (
            <table className={styles.table}>
                <thead className={styles.header}>
                    <tr>
                        <th>Avatar</th>
                        <th>Username <button className={styles.sort} type="button" onClick={() => this.onSort(Sortable.IGN)}><i className="fas fa-sort"></i></button></th>
                        <th>Culvert Streak <button className={styles.sort} type="button" onClick={() => this.onSort(Sortable.CULVERT_STREAK)}><i className="fas fa-sort"></i></button></th>
                        <th>Culvert Score <button className={styles.sort} type="button" onClick={() => this.onSort(Sortable.CULVERT)}><i className="fas fa-sort"></i></button></th>
                        <th>Flag Streak <button className={styles.sort} type="button" onClick={() => this.onSort(Sortable.FLAG_STREAK)}><i className="fas fa-sort"></i></button></th>
                        <th>Flag Score <button className={styles.sort} type="button" onClick={() => this.onSort(Sortable.FLAG)}><i className="fas fa-sort"></i></button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.sortedPlayers.map((item) => (
                        <tr key={item.ign}>
                            <td>
                                {item.avatar ? 
                                    <Image src={item.avatar} 
                                        alt="" 
                                        width={96}
                                        height={96} /> : 
                                    <Image src="https://i.imgur.com/SXtkcXd.png" 
                                        alt=""
                                        width={96}
                                        height={96} />}
                            </td>
                            <td>
                                <Link href={{
                                    pathname: '/m/[ign]',
                                    query: {ign: encodeURIComponent(item.ign), i: item.index}
                                }}>
                                    <a>{item.ign}</a>
                                </Link>
                            </td>                            
                            <td>
                                {item.culvert_streak}
                            </td>
                            <td>
                                {item.culvert}
                            </td>
                            <td>
                                {item.flag_streak}
                            </td>
                            <td>
                                {item.flag}
                            </td>
                            
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}