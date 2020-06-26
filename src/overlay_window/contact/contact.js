import React from 'react';
import style from './contact.module.css'


class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            fName: "",
            lName: "",
            email: "",
            tel: "",
            tAC: false,
        };
        this.reservation = this.props.reservation;
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.user);

    }

    onBlur = (event) => {
        this.user[event.target.name] = event.target.value;
    }

    toggleTAC = () => {
        this.user.tAC = !this.user.tAC;
    }

    displayReservation() {
        const date =
            new Date(this.reservation.date).toDateString();
        const person = this.reservation.partySize > 1 ? "people" : "person";
        return (
            <p className={style.title}>
                {this.reservation.partySize + " " + person}<br/>
                {this.reservation.time} <br/>
                {date}
            </p>
        )
    }

    getInputs() {
        let inputs = [];
        const inputInfo = [
            {name:"fName", type: "text", label: "First Name"},
            {name:"lName", type: "text", label: "Last Name"},
            {name:"email", type: "email", label: "Email"},
            {name:"tel", type: "tel", label: "Phone Number"},
            {name:"tAC", type: "checkbox", label: "Terms and Conditions"},
        ]

        inputInfo.forEach(input => {
            if (input.type === "checkbox") {
                inputs.push(
                    <React.Fragment key={input.name}>
                        <label className={style.labelText} htmlFor={input.name}>
                            {input.label}:
                        </label>

                        <input
                            onClick={this.toggleTAC} value={this.user[input.name]} type={input.type}
                            name={input.name}/>
                    </React.Fragment>
                );
            } else {
                inputs.push(
                    <InputAndLabel
                        key={input.name}
                        name={input.name}
                        type={input.type}
                        label={input.label}
                        onBlur={this.onBlur}/>
                )
            }
        });

        return inputs
    }

    render() {
        return (
            <>
                <form onSubmit={this.onSubmit} className={style.container}>
                    {this.displayReservation()}
                    {this.getInputs()}
                    <input className={style.submit} type="submit" value="Make Reservation"/>
                </form>
            </>
        )
    }
}

class InputAndLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                value: '',
        };
    }

    onChange = (event) => {
        let target = event.target;
        this.setState({
            value: target.value,
        });
    }

    render() {
        return (
            <div className={style.inputGroup}>
                <label className={style.labelText} htmlFor={this.props.name}>
                    {this.props.label + ":"}
                </label>
                <input className={style.input} value={this.state.value} onChange={this.onChange} onBlur={this.props.onBlur} type={this.props.type} name={this.props.name} required/>
            </div>
        )
    }
}

export default ContactForm;
