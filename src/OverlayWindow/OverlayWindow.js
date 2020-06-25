import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import style from './OverlayWindow.module.css';
import './calendar.css';

class OverlayWindow extends React.Component {

    getJSX() {
        return (
            <div className={style.overlay}>
                <ExitOverlay closeOverlay={this.props.closeOverlay}/>
                <Calendar />
            </div>
        )
    }

    render() {
        const display = this.props.hidden ? "" : this.getJSX();
        return (
            <div>
                {display}
            </div>
        )
    }
}

class Calendar extends React.Component{

    getValidRange() {

        var startDate = new Date();
        var endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);

        startDate = startDate.toISOString().slice(0, 10);
        endDate = endDate.toISOString().slice(0, 10);

        return {start: startDate, end: endDate};
    }

    render() {
        return (
            <div className={style.calendar}>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    showNonCurrentDates={false}
                    fixedWeekCount={false}
                    height="100%"
                    validRange={this.getValidRange()}
                    // viewDidMount={(currentView) => {
                    //     const today = new Date();
                    //     console.log(currentView);
                    //     console.log(currentView.currentStart);
                    //     console.log(FullCalendar.view)
                    //     if (today > currentView.currentStart && today <= currentView.currentEnd) {
                    //         var prevButton = document.getElementsByClass(".fc-prev-button");
                    //         prevButton.forEach((entry) => {
                    //             entry.disabled = true;
                    //             entry.addClass('fc-state-disabled')
                    //         })
                    //     }
                    // }}
                />
            </div>
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
