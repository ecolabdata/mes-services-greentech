interface SelectProps { 
    optionsData : string[];
    label: string;
    classes: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    color?: string,
    defaultOption?: string
    selected?: string
} 

const Select: React.FC<SelectProps> = ({optionsData, label, classes, onChange, color, defaultOption, selected}) => {
    let style = {} 
    if (color) style = {"boxShadow": `inset 0 -2px 0 0 ${color}` }
    return (

            <div className={`
            ${classes}
            fr-select-group`}>
                <label className="fr-label" htmlFor="select">
                    {label}
                </label>
                <select className="fr-select" onChange={onChange} style={style}> 
                    <option value="" selected={selected === ""} disabled={!defaultOption} hidden={!defaultOption}>{defaultOption || "Selectionnez une option"}</option>
                    {optionsData.map(option => <option selected={selected===option} value={option}>{option}</option>)}
                </select>
            </div>
    )
}; 

export default Select;