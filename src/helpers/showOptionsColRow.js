export const showOptionsColRow = () => {
    const options = [
        <option aria-label="None" value="" />
    ];
    for (let i = 1; i <= 10; i++) {
        options.push(<option value={i}>{i}</option>);
    }
    return options;
}