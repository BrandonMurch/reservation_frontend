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

        this.props.inputs.forEach((input, index) => {
            const autoFocus = index === 0 ? true : false;
            if (input.type === "checkbox") {
                inputs.push(
                    <CheckboxAndLabel
                        key={input.name}
                        onClick={this.onClick}
                        name={input.name}
                        label={input.label}
                        autoFocus={autoFocus}
                    />
                );
            } else if(input.type === "submit") {
                inputs.push(
                    <input
                        key="submit"
                        className={style.submit}
                        type="submit"
                        value="Make Reservation"
                        autoFocus={autoFocus}
                    />
                );
            }else {
                inputs.push(
                    <InputAndLabel
                        key={input.name}
                        name={input.name}
                        type={input.type}
                        label={input.label}
                        onBlur={this.onBlur}
                        autoFocus={autoFocus}
                    />
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
        const {autoFocus, type, name, onBlur, label} = this.props;

        return (
            <div className={style.inputGroup}>
                <label
                    className={style.labelText}
                    htmlFor={name}>
                    {label + ":"}
                </label>
                <input
                    className={style.input}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={onBlur}
                    type={type}
                    name={name}
                    required
                    autoFocus={autoFocus}/>
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
        const {autoFocus, name, label} = this.props;
        return (
            <div className={style.inputGroup}>
                <label className={style.labelText} htmlFor={name}>
                    {label}:
                </label>

                <input
                    onClick={this.onClick}
                    value={this.state.value}
                    type="checkbox"
                    name={name}
                    required
                    autoFocus={autoFocus}
                />
            </div>
        )
    }
}

export default Form;
