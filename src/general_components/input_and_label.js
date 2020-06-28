import React from 'react';
import style from './input_and_label.module.css';


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
            <div className={style.this.propsGroup}>
                <label className={style.labelText} htmlFor={this.props.name}>
                    {this.props.label + ":"}
                </label>
                <input className={style.this.props} value={this.state.value} onChange={this.onChange} onBlur={this.props.onBlur} type={this.props.type} name={this.props.name} required/>
            </div>
        )
    }
}

class CheckboxAndLabel extends React.Component {
    render() {
        return (
            <React.Fragment key={this.props.name}>
                <label className={style.labelText} htmlFor={this.props.name}>
                    {this.props.label}:
                </label>

                <input
                    onClick={() => this.props.onClick}
                    value={this.state.value}
                    type="checkbox"
                    name={this.props.name}
                    required/>
            </React.Fragment>
        )
    }
}

export {InputAndLabel, CheckboxAndLabel};
