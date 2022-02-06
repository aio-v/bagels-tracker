const next = {
    "Daylight": "Sunset",
    "Sunset": "Night",
    "Night": "Daylight"
};

export default function CurrentFlagMap(props) {
    return (
        next[props.map]
    );
}