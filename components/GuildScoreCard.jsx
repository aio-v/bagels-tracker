import React from "react";
import styles from "../styles/Card.module.css";

export default function GuildScoreCard(props) {
    return (
        <div className={styles.column}>
            <div>Culvert: {props.culvert}</div>
            <div>Flag: {props.flag}</div>
        </div>
    )
}