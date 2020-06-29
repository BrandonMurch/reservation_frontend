import React from 'react';
import style from './app.module.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import OverlayWindow from '../overlay_window/';

function App() {
  return (
    <Router className={style.app}>
        <Opener />
    </Router>
  );
}

class Opener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayOverlay: false,
        };
    }

    toggleOverlay = () => {
        this.setState({
            overlay: !this.state.overlay,
        })
    }

    render() {
        let textOpacity, overlay;
        if (this.state.overlay) {
            textOpacity = style.textContainerTransparent;
            overlay = (
                <OverlayWindow
                closeOverlay={this.toggleOverlay}
                overlay={"calendar"}/>
            )
        } else {
            textOpacity = style.textContainer;
            overlay = "";
        }

        return (
            <div className={style.Opener}>
                <div className={textOpacity}>
                    <Link to="/calendar" className={style.text} onClick={this.toggleOverlay}>
                        Click here to make a reservation
                    </Link>
                </div>
                {overlay}
            </div>
        )
    }
}

export default App;
