import React from 'react';
import style from './reservation.module.css';

class ReservationForm extends React.Component {

    render() {
        return(
            <form className={style.container}>
                <p>{this.props.selectedDate}</p>
                <DropDownSelect type="partySize"/>
                <DropDownSelect type="time"/>
            </form>
        )
    }
}

class DropDownSelect extends React.Component {
    partySize() {
        const maxPartySize = 8;
        var options = [];

        for (var i = 1; i <= maxPartySize; i++) {
            options.push( <option key={i} value={i}>{i}</option> )
        }

        return options;
    }

    getAvailableTimes() {
        //todo this is a stub, will update later.
        return ["7:00", "8:30"];
    }

    time() {
        const times = this.getAvailableTimes();
        var options = [];

        times.forEach((time, i) => {
            options.push(
                <option key={i} value={time}>{time}</option>
            )
        })
    }

    render() {
        var options;
        if (this.props.type === "partySize") {
            options = this.partySize();
        } else if (this.props.type === "time")
            options = this.time();
        return (
            <>
                <label htmlFor="">Party Size:</label>
                <select name="partySize">
                    {options}
                </select>
            </>
        )
    }

}

export default ReservationForm;
