import React from 'react';
import Calendar from './calendar/calendar';
import ReservationForm from './reservation/reservation';
import ContactForm from './contact/contact';
import style from './overlay_window.module.css';

class OverlayWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overlay: this.props.overlay,
        }
        this.reservation = {};
        this.user = {};
    }

    chooseOverlay = (overlay) => {
        this.setState({
            overlay: overlay,
        })
    }

    onDateClick = (args) => {
        this.reservation.date = args.dateStr;
        this.chooseOverlay("reservation");
    }

    onReservationSubmit = (info) => {
         this.reservation.time = info.time;
         this.reservation.partySize = info.partySize;
         this.chooseOverlay("contact");
    }

    onContactSubmit = (user) => {
            this.user = user;
            console.log(this.user);
    }

    render() {

        var overlay;
        if (this.state.overlay === "calendar") {
            overlay = <Calendar dateClick={this.onDateClick}/>;

        } else if (this.state.overlay === "reservation") {
            overlay =
                <ReservationForm
                    selectedDate={this.reservation.date}
                    onSubmit={this.onReservationSubmit}
                />;

        } else if (this.state.overlay === "contact") {
            overlay =
                <ContactForm
                    reservation={this.reservation}
                    onSubmit={this.onContactSubmit}
                />;

        } else {
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
