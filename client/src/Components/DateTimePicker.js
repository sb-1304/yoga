// import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const DateTimePicker = ({ date, setDate, startTime, setStartTime, endTime, setEndTime, ...rest }) => {

    return (
        <>
            <label htmlFor='date' className='react-time-picker'>Date</label>
            <DatePicker
                id='date'
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={_ => setDate(_)}
                {...rest}
            />

            <label htmlFor='startTime' className='leftMargin'>Start Time</label>
            <input id='startTime' type='time'
                min="08:00"
                max="17:00"
                step="30"
                value={startTime}
                onChange={_ => setStartTime(_.target.value)}
                {...rest}
            ></input>

            <label htmlFor='endTime' className='leftMargin'>End Time</label>
            <input id="endTime" type='time'
                min="08:00"
                max="17:00"
                step="30"
                value={endTime}
                onChange={_ => setEndTime(_.target.value)}
                {...rest}
            ></input>
        </>
    )
}

export default DateTimePicker;