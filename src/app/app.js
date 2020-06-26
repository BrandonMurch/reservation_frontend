import React from 'react';
import style from './app.module.css';
import OverlayWindow from '../overlay_window/overlay_window'

function App() {
  return (
    <div className={style.app}>
        <Opener />
    </div>
  );
}

class Opener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overlay: "",
        };
        this.toggleOverlay = this.toggleOverlay.bind(this);
    }

    toggleOverlay(overlay) {
        this.setState({
            overlay: overlay,
        })
    }

    render() {
        const textOpacity = this.state.overlay ?
        style.textContainerTransparent : style.textContainer
        return (
            <div className={style.Opener}>
                <div className={textOpacity}>
                    <p className={style.text} onClick={() => this.toggleOverlay("calendar")}>
                        Click here to make a reservation
                    </p>
                </div>
                <OverlayWindow
                closeOverlay={() => this.toggleOverlay("")}
                chooseOverlay={this.toggleOverlay}
                overlay={this.state.overlay}/>
            </div>
        )
    }
}

export default App;
