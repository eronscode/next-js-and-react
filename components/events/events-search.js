import React, { useRef } from 'react'

import Button from '../ui/Button'
import classes from './events-search.module.css'

function EventSearch(props) {
    const {onSearch } = props;

    const monthValue = useRef();
    const yearValue = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const selectedYear = yearValue.current.value
        const selectedMonth = monthValue.current.value
        onSearch(selectedYear, selectedMonth)
    }
    
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div  className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearValue}>
                        <option value="2021" >2021</option>
                        <option value="2020" >2020</option>
                    </select>
                </div>
                <div  className={classes.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthValue}>
                        <option value="1" >Jan</option>
                        <option value="2" >Feb</option>
                        <option value="3" >Mar</option>
                        <option value="4" >Apr</option>
                        <option value="5" >May</option>
                        <option value="6" >Jun</option>
                        <option value="7" >Jul</option>
                        <option value="8" >Aug</option>
                        <option value="9" >Sep</option>
                        <option value="10" >Oct</option>
                        <option value="11" >Nov</option>
                        <option value="12" >Dec</option>
                    </select>
                </div>
                <Button >Find Event</Button>
            </div>
        </form>
    )
}

export default EventSearch

