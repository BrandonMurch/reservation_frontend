import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import style from './OverlayWindow.module.css';
import './calendar.css';

class OverlayWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: "",
        }
    }

    dateClick = (args) => {
        console.log(args);
        this.setState ({
            selectedDate: args.dateStr,
        });
        console.log(args.dateStr);
        console.log(this.state.selectedDate);
        this.props.chooseOverlay("reservation")
    }

    chooseOverlay() {

        if (!this.props.overlay) {
            return "";
        }

        const calendar = <Calendar dateClick={this.dateClick}/>;
        const reservation = <ReservationForm selectedDate={this.state.selectedDate}/>

        var overlay;
        if (this.props.overlay === "calendar") {
            overlay = calendar;
        } else if (this.props.overlay === "reservation") {
            overlay = reservation;
        } else {
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
        return this.chooseOverlay();
    }
}

class Calendar extends React.Component{
    getValidRange() {
        // TODO find dates from backend.
        var startDate = new Date();
        var endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 3);

        startDate = startDate.toISOString().slice(0, 10);
        endDate = endDate.toISOString().slice(0, 10);

        return {start: startDate, end: endDate};
    }

    render() {
        return (
            <div className={style.container}>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    showNonCurrentDates={false}
                    fixedWeekCount={false}
                    height="100%"
                    validRange={this.getValidRange()}
                    dateClick={(args) => {
                        this.props.dateClick(args)
                    }}
                />
            </div>
        )
    }
}

class ReservationForm extends React.Component {
    render() {
        return(
            <form className={style.container}>
                <p>{this.props.selectedDate}</p>
                <label htmlFor="fname">First Name:</label>
                <input type="text" name="fname"/>
                <label htmlFor="lname">Last Name: </label>
                <input type="text" name="lname"/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email"/>
                <label htmlFor="pnum">Phone Number:</label>
                <input type="email" name="pnum"/>
            </form>
        )
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
