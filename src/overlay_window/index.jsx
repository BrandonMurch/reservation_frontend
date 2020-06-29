import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Calendar from './calendar';
import ReservationForm from './reservation';
import ContactForm from './contact';
import Review from './review';
import Success from './success'
import style from './overlay_window.module.css';

function OverlayWindow(props) {
    const { closeOverlay } = props;
    const  [redirect, setRedirect ] = useState("");
    const reservation = useRef({});
    const user = useRef({});

        // const overlay = this.getOverlay();
        return (
            <>
            {redirect && <Redirect to={redirect}/> }
            <div className={style.overlay}>
                <ExitOverlay closeOverlay={closeOverlay}/>
                    <Switch>
                        <Route
                            path="/calendar"
                            render={() => (
                                <Calendar dateClick={args => onDateClick(args, reservation, setRedirect)}/>
                            )}
                        />
                        <Route
                            path="/reservation"
                            render={() => (
                                <ReservationForm
                                    selectedDate={reservation.current.date}
                                    onSubmit={(results) => onReservationSubmit(results, reservation, setRedirect)}
                                />
                            )}
                        />
                        <Route
                            path="/contact"
                            render={() => (
                                <ContactForm
                                    reservation={reservation.current}
                                    onSubmit={(results) => onContactSubmit(results, user, setRedirect)}
                                />
                            )}
                        />
                        <Route
                            path="/review"
                            render={() => (
                                <Review
                                    user={user.current}
                                    reservation={reservation.current}
                                    onClick={(target) => onReviewSubmit(target, setRedirect)}
                                />
                            )}
                        />
                        <Route
                            path="/success"
                            render={() => (
                                <Success/>
                            )}
                        />
                    </Switch>
            </div>
            </>
        );
}

function onDateClick(args, reservation, setRedirect) {
    reservation.current.date = args.dateStr;
    setRedirect("/reservation");
}

function onReservationSubmit(info, reservation, setRedirect) {
    console.log(reservation.current);
    console.log(info.time);
    console.log(info.partySize);
     reservation.current.time = info.time;
     reservation.current.partySize = info.partySize;
     console.log(reservation.current);
     setRedirect("/contact");
}

function onContactSubmit(results, user, setRedirect) {
        user.current = results;
        setRedirect("/review");
}

function onReviewSubmit(target, setRedirect) {
        if (target === "success") {
            console.log("review complete");
        }
        setRedirect(target);
}

// getOverlay = () => {
//     var overlay;
//
//     switch (this.state.overlay) {
//         case "calendar":
//             overlay = <Calendar dateClick={this.onDateClick}/>;
//             break;
//         case "reservation":
//             overlay =
//                 <ReservationForm
//                     selectedDate={this.reservation.date}
//                     onSubmit={this.onReservationSubmit}
//                 />;
//             break;
//         case "contact":
//             overlay =
//                 <ContactForm
//                     reservation={this.reservation}
//                     onSubmit={this.onContactSubmit}
//                 />;
//             break;
//         case "review":
//             overlay =
//                 <Review
//                     user={this.user}
//                     reservation={this.reservation}
//                     onClick={this.chooseOverlay}
//                 />;
//             break;
//         default:
//             overlay = "";
//     }
//     return overlay;
// }




function ExitOverlay(props) {
    return (
        <div className={style.exitContainer}>
            <Link to="/"
            className={style.exitText}
            onClick={props.closeOverlay}>
                x
            </Link>
        </div>
    )
}

const displayReservation = (reservation) => {
    const date =
        new Date(reservation.date).toDateString();
    const person = reservation.partySize > 1 ? "people" : "person";
    return (
        <p className={style.title}>
            {reservation.partySize + " " + person}<br/>
            {reservation.time} <br/>
            {date}
        </p>
    )
}


export default OverlayWindow;

export { displayReservation };
