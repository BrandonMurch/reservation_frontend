import React from 'react';
import Form from '../../general_components/form/form';
import { displayReservation } from '../../overlay_window';
import style from './contact.module.css';


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
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            tAC: false,
        };

        form.inputs = [
            {name:"firstName", type: "text", label: "First Name"},
            {name:"lastName", type: "text", label: "Last Name"},
            {name:"email", type: "email", label: "Email"},
            {name:"phoneNumber", type: "tel", label: "Phone Number"},
            {name:"pass", type: "password", label: "Password"},
            {name:"confirm", type: "password", label: "Confirm Password"},
            {name:"tAC", type: "checkbox", label: "Yes, I agree to the terms and conditions"},
            {type: "submit", label: "Make Reservation"},
        ]

        form.onSubmit = (user) => {
            // TODO verify that pass and confirm are identical
            console.log("login successful for user: " + user);
            this.props.onSubmit(user);
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
            {type: "submit", to:"review", label: "Make Reservation"},
        ]

        form.onSubmit = () => {
            // TODO pass back user that is received from server
            // Stub for testing purposes
            let user = {
                firstName: "John",
                lastName: "Doe",
                email: "JohnDoe@email.com",
                phoneNumber: "234566443",
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



export default ContactForm;
