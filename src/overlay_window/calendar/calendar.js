import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import style from './calendar.module.css';


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

export default Calendar;
