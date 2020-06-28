import React from 'react';
import Form from '../../general_components/form/form';
import style from './login.module.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = {
            username: "",
            password: "",
        }

        this.inputs = [
                {name:"email", type: "email", label: "Email"},
                {name:"pass", type: "password", label: "Password"},
                {type: "submit", label: "Make Reservation"},
            ]
    }

    render() {
        return (
            <Form
                item={this.user}
                inputs={this.inputs}
                onSubmit={this.props.onSubmit(this.login)}
            />
        )
    }
}

export default Login;
