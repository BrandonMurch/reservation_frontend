import React from 'react';
import style from "./form.module.css"

// props = object, inputs, onSubmit
class Form extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.props.object);
    }

    // used for inputs that are typed
    onBlur = (event) => {
        this.props.object[event.target.name] = event.target.value;
    }

    // use for checkboxes, etc.
    onClick = (name, value) => {
        this.props.object[name] = value;
    }

    getInputs() {
        let inputs = [];

        this.props.inputs.forEach(input => {
            if (input.type === "checkbox") {
                inputs.push(
                    <CheckboxAndLabel
                        key={input.name}
                        onClick={this.onClick}
                        name={input.name}
                        label={input.label}
                    />
                );
            } else if(input.type === "submit") {
                inputs.push(
                    <input
                        key="submit"
                        className={style.submit}
                        type="submit"
                        value="Make Reservation"
                    />
                );
            }else {
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
            <form onSubmit={this.onSubmit} className={style.container}>
                {this.getInputs()}
            </form>
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

class CheckboxAndLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                value: false,
        };
    }

    onClick = (event) => {
        this.setState({
            value: !this.state.value,
        }, () => this.props.onClick(this.props.name, this.state.value))
    }

    render() {
        return (
            <div className={style.inputGroup}>
                <label className={style.labelText} htmlFor={this.props.name}>
                    {this.props.label}:
                </label>

                <input
                    onClick={this.onClick}
                    value={this.state.value}
                    type="checkbox"
                    name={this.props.name}
                    required/>
            </div>
        )
    }
}

export default Form;
