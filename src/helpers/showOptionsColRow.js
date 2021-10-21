export const showOptionsColRow = (value, emptySpace = true) => {
    const options = [
        emptySpace ? <option key={0} aria-label="None" value="" /> : ''
    ];
    for (let i = 1; i <= value; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
}