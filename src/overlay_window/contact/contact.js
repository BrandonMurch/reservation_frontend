import React from 'react';
import style from './contact.module.css'


class ContactForm extends React.Component {
    InputAndLabel(name, type, label) {
        return (
            <>
                <label htmlFor={name}>{label + ":"}</label>
                <input type={type} name={name}/>
            </>
        )
    }

    render() {
        return (
            <form className={style.container}>
                {this.InputAndLabel("fname", "text", "First Name")}
                {this.InputAndLabel("lname", "text", "Last Name")}
                {this.InputAndLabel("email", "email", "Email")}
                {this.InputAndLabel("pnum", "tel", "Phone Number")}
            </form>
        )
    }

}

export default ContactForm;
