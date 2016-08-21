import React from 'react';

class DiameterDialog extends React.Component {
  render() {
    return (
      <div style={modalStyles}>
        <div style={changeDiameterDialogStyles}>
          <button
            style={closeModalButtonStyles}
            onClick={this.props.toggleDisplayChangeDiameterDialog}>
            X
          </button>
          <span>
            Change diameter: {this.props.rad*2}<br/>
            <input
              style={{width:'200px'}}
              onChange={this.props.onChange}
              type="range"
              min="10"
              value={this.props.rad}
              max="500"/>
          </span>
        </div>
      </div>
    );
  }
}

const modalStyles = {
  position: 'absolute',
  left: 0, right: 0,
  top: 0, bottom: 0,
  backgroundColor: '#333',
  opacity: 0.9
};

const closeModalButtonStyles = {
  position: 'absolute',
  right: '10px',
  top: '10px'
};

const changeDiameterDialogStyles = {
  position: 'absolute',
  left: 'calc(50% - 100px)', top: 'calc(50% - 50px)',
  width: '300px', height: '150px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  opacity: 0.9,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default DiameterDialog;
