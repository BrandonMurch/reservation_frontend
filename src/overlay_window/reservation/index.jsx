import React from 'react';
import style from './reservation.module.css';

class ReservationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledTime: true,
            reservation: {
                date: this.props.selectedDate,
                time: "",
                partySize: "",
            }
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.reservation)
    }

    onChange = (event) => {
        let disabled, timeValue;
        let target = event.target;
        if (target.id === "partySize") {
            if (target.value) {
                timeValue = this.state.reservation.time;
                disabled = false;
            } else {
                timeValue = '';
                disabled = true;
            }
            this.setState((prevState) => {
                let state = {...prevState};
                let reservation = state.reservation;
                reservation.time = timeValue;
                reservation.partySize = target.value;
                state.disabledTime = disabled;
                return state;
            })
        } else if (target.id === "time") {
            this.setState((prevState) => {
                let state = {...prevState};
                state.reservation.time = target.value
                return state;
            });
        }
    }

    render() {
        const date = new Date(this.props.selectedDate).toDateString();
        const submitDisabled = this.state.reservation.time && this.state.reservation.partySize ? "" : "disabled";
        return(
            <form
                onSubmit={this.onSubmit}
                className={style.container}>
                    <p className={style.title}>
                        {"Desired date: " + date}
                    </p>

                <DropDownSelect
                    type="partySize"
                    label="Party size:"
                    value={this.state.reservation.partySize}
                    onChange={this.onChange}
                    autoFocus={true}/>
                <DropDownSelect
                    type="time"
                    label="Desired time:"
                    value={this.state.reservation.time} disabled={this.state.disabledTime}
                    onChange={this.onChange}/>
                <input type="submit" value="Next" disabled={submitDisabled}/>
            </form>
        )
    }
}

class DropDownSelect extends React.Component {
    getEmptyOption() {
        return (
            <option key={0} value=""></option>
        );
    }

    partySize() {
        const maxPartySize = 8;
        var options = [this.getEmptyOption()];

        for (var i = 1; i <= maxPartySize; i++) {
            options.push( <option key={i} value={i}>{i}</option> )
        }

        return options;
    }

    getAvailableTimes() {
        //todo this is a stub, will update later.
        return ["7:00PM", "8:30PM"];
    }

    time() {
        const times = this.getAvailableTimes();
        var options = [this.getEmptyOption()];

        times.forEach((time) => {
            options.push(
                <option key={time} value={time}>{time}</option>
            )
        })

        return options;
    }

    render() {
        const {autoFocus, onChange, type, value, label } = this.props
        const disabled = this.props.disabled ? "disabled" : "";
        var options;
        if (this.props.type === "partySize") {
            options = this.partySize();
        } else if (this.props.type === "time")
            options = this.time();
        return (
            <div className={style.inputGroup}>
                <label
                    className={style.labelText}
                    htmlFor={this.props.type}>
                    {label}
                </label>
                <select
                    key={type}
                    className={style.selectBox}
                    value={value}
                    name={type}
                    id={type}
                    disabled={disabled}
                    onChange={onChange}
                    autoFocus={autoFocus}>
                    {options}
                </select>
            </div>
        )
    }

}

export default ReservationForm;
