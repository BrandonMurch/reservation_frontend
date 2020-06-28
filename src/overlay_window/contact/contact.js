import React from 'react';
import Form from '../../general_components/form/form'
import style from './contact.module.css'


class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: "login",
        }
    }

    toggleForm = () => {
        this.setState({
            form: this.state.form === "login" ? "contact" : "login",
        })
    }

    getContactForm() {
        const form = {};

        form.object = {
            fName: "",
            lName: "",
            email: "",
            tel: "",
            tAC: false,
        };

        form.inputs = [
            {name:"fName", type: "text", label: "First Name"},
            {name:"lName", type: "text", label: "Last Name"},
            {name:"email", type: "email", label: "Email"},
            {name:"tel", type: "tel", label: "Phone Number"},
            {name:"pass", type: "password", label: "Password"},
            {name:"confirm", type: "password", label: "Confirm Password"},
            {name:"tAC", type: "checkbox", label: "Yes, I agree to the terms and conditions"},
            {type: "submit", label: "Make Reservation"},
        ]

        form.onSubmit = (user) => {
            // TODO pass back user that is received from server
            console.log("login successful for user: " + user);
        }

        form.switch = (
            <p className={style.switchText}>
                Do you already have an account?
                <span className={style.switch} onClick={this.toggleForm}> Login.</span>
            </p>
        )

        return form;
    }

    getLoginForm() {
        const form = {};

        form.object = {
            username: "",
            password: "",
        };

        form.inputs = [
            {name:"email", type: "email", label: "Email"},
            {name:"pass", type: "password", label: "Password"},
            {type: "submit", label: "Make Reservation"},
        ]

        form.onSubmit = () => {
            // TODO pass back user that is received from server
            // Stub for testing purposes
            let user = {
                fName: "John",
                lName: "Doe",
                email: "JohnDoe@email.com",
                tel: "234566443",
            }
            this.props.onSubmit(user);
        }

        form.switch = (
            <p className={style.switchText}>
                You don't already have an account?
                <span className={style.switch} onClick={this.toggleForm}> Sign up.</span>
            </p>
        )

        return form;
    }

    render() {
        let form = "";

        if (this.state.form === "contact")  {
            form = this.getContactForm();
        } else if (this.state.form === "login") {
            form = this.getLoginForm();
        }
        return (
            <div className={style.container}>
                {displayReservation(this.props.reservation)}
                {form.switch}
                 <Form
                object={form.object}
                inputs={form.inputs}
                onSubmit={form.onSubmit}
                />
            </div>
        )
    }
}

function displayReservation(reservation) {
        const date =
            new Date(reservation.date).toDateString();
        const person = reservation.partySize > 1 ? "people" : "person";
        return (
            <p className={style.title}>
                {reservation.partySize + " " + person}<br/>
                {reservation.time} <br/>
                {date}
            </p>
        )
    }

export default ContactForm;
