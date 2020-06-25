import React from 'react';
import styles from './App.module.css';
import OverlayWindow from '../OverlayWindow/OverlayWindow'

function App() {
  return (
    <div className={styles.app}>
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
        styles.textContainerTransparent : styles.textContainer
        return (
            <div className={styles.Opener}>
                <div className={textOpacity}>
                    <p className={styles.text} onClick={() => this.toggleOverlay("calendar")}>
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
