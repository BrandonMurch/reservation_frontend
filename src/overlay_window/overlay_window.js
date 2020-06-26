import React from 'react';
import Calendar from './calendar/calendar';
import ReservationForm from './reservation/reservation';
import ContactForm from './contact/contact';
import style from './overlay_window.module.css';

class OverlayWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null,
        }
    }

    componentWillUnmount() {
        this.setState({
            selectedDate: null,
        });
    }

    dateClick = (args) => {
        this.setState ({
            selectedDate: args.dateStr,
        });
        this.props.chooseOverlay("reservation")
    }

    chooseOverlay() {
        if (!this.props.overlay) {

            return "";
        }

        const calendar = <Calendar dateClick={this.dateClick}/>;
        const reservation = <ReservationForm selectedDate={this.state.selectedDate}/>
        const contact = <ContactForm selectedDate={this.state.selectedDate}/>


        var overlay;
        if (this.props.overlay === "calendar") {
            overlay = calendar;
        } else if (this.props.overlay === "reservation") {
            overlay = reservation;
        } else if (this.props.overlay === "contact") {
            overlay = contact;
        }else {
            return "";
        }

        return (
            <div className={style.overlay}>
                <ExitOverlay closeOverlay={this.props.closeOverlay}/>
                {overlay}
            </div>
        )
    }

    render() {
        console.log(this.state);
        return this.chooseOverlay();
    }
}

function ExitOverlay(props) {
    return (
        <div className={style.exitContainer}>
            <p
            className={style.exitText}
            onClick={props.closeOverlay}>
                x
            </p>
        </div>
    )
}

export default OverlayWindow;
