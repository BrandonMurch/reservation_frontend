import React from 'react';
import Calendar from './calendar/calendar';
import ReservationForm from './reservation/reservation';
import ContactForm from './contact/contact';
import style from './overlay_window.module.css';

class OverlayWindow extends React.Component {
    constructor(props) {
        super(props);
        this.reservation = {};
        this.user = {};
    }

    onDateClick = (args) => {
        this.reservation.date = args.dateStr;
        this.props.chooseOverlay("reservation");
    }

    onReservationSubmit = (info) => {
         this.reservation.time = info.time;
         this.reservation.partySize = info.partySize;
         this.props.chooseOverlay("contact");
    }

    onContactSubmit = (user) => {
            this.user = user;
            console.log(this.user);
    }

    render() {
        if (!this.props.overlay) {
            return "";
        }

        const calendar = <Calendar dateClick={this.onDateClick}/>;
        const reservation = <ReservationForm selectedDate={this.reservation.date}
        onSubmit={this.onReservationSubmit}/>;
        const contact = <ContactForm reservation={this.reservation} onSubmit={this.onContactSubmit}/>;


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
        );
    };
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
