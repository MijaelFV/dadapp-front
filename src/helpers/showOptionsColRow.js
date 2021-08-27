export const showOptionsColRow = (value) => {
    const options = [
        <option aria-label="None" value="" />
    ];
    for (let i = 1; i <= value; i++) {
        options.push(<option value={i}>{i}</option>);
    }
    return options;
}