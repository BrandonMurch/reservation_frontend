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
            overlayHidden: true,
        };
        this.toggleOverlay = this.toggleOverlay.bind(this);
    }

    toggleOverlay() {
        this.setState({
            overlayHidden: !this.state.overlayHidden,
        })
    }

    render() {
        const textOpacity = this.state.overlayHidden ?
        styles.textContainer : styles.textContainerTransparent
        return (
            <div className={styles.Opener}>
                <div className={textOpacity}>
                    <p className={styles.text} onClick={() => this.toggleOverlay()}>
                        Click here to make a reservation
                    </p>
                </div>
                <OverlayWindow
                closeOverlay={() => this.toggleOverlay()}
                hidden={this.state.overlayHidden}/>
            </div>
        )
    }
}

export default App;
