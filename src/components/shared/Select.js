import Card from './Card';
import classes from './Select.module.css';
const Select = (props) => {
    console.log("props--->> : ", props);
    return (
        <Card className={`${props.className} ${classes['select-container']}`}>
            <div className={classes['filter-container']}>
                <div>
                    <label htmlFor="catagory">Select News Categories : </label>
                    <select className={classes.select} id="catagory" name="catagory" onChange={props.onChange}>
                        {
                            Object.entries(props.catagory).map(([key, val]) => (
                                <option key={key} value={val} >
                                    {key}
                                </option>
                            ))
                        }

                    </select>
                </div>
                {/* <div>
                    <button>English</button>
                    <button>Hindi</button>
                </div> */}
            </div>
        </Card>
    )
}

export default Select;