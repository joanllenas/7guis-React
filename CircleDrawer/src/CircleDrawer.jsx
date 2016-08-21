import React, {PropTypes} from 'react';
import {findFirstCircleUnderPoint, generateUniqueId, findCircleById} from './utils';
import DiameterDialog from './DiameterDialog';

export const DEFAULT_CIRCLE_RADIUS = 25;

class CircleDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      circles: [],
      undos: [],
      redos: [],
      selectedCircleId: null,
      changingDiameter: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeDiameter = this.handleChangeDiameter.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.toggleDisplayChangeDiameterDialog = this.toggleDisplayChangeDiameterDialog.bind(this);
  }

  handleClick(evt) {
    const point = {
      x: evt.nativeEvent.offsetX,
      y: evt.nativeEvent.offsetY
    };
    const circleUnderPoint = findFirstCircleUnderPoint(this.state.circles, point);
    if( circleUnderPoint ) {
      if(circleUnderPoint.id === this.state.selectedCircleId) {
        this.toggleDisplayChangeDiameterDialog();
      } else {
        this.selectCircle(circleUnderPoint.id);
      }
    } else {
      this.setState({
        selectedCircleId: null
      });
      this.addCircle(point);
    }
  }

  selectCircle(id) {
    this.setState({
      selectedCircleId: id
    });
  }

  addCircle(point) {
    const circle = {
      x: point.x,
      y: point.y,
      id: generateUniqueId(),
      rad: DEFAULT_CIRCLE_RADIUS
    };
    const oldCircles = this.state.circles.slice();
    this.setState({
      circles: [...this.state.circles, circle],
      undos: [...this.state.undos, oldCircles],
      redos: []
    });
  }

  handleChangeDiameter(evt) {
    this.changeDiameter(evt.target.value);
  }

  changeDiameter(newValue) {
    const circle = findCircleById(
      this.state.circles,
      this.state.selectedCircleId
    );
    const circleCopy = {
      ...circle,
      rad: newValue
    };
    const oldCircles = this.state.circles.slice();
    const newCircles = this.state.circles.slice();
    const index = newCircles.indexOf(circle);
    newCircles.splice( index, 1, circleCopy );
    this.setState({
      circles: newCircles,
      undos: [...this.state.undos, oldCircles],
      redos: []
    });
  }

  undo() {
    if(this.state.undos.length===0) {
      return;
    }
    const currentCircles = this.state.circles.slice();
    const previousCircles = this.state.undos.pop();
    this.setState({
      circles: previousCircles,
      undos: this.state.undos.slice(),
      redos: [...this.state.redos, currentCircles],
      selectedCircleId: null,
      changingDiameter: false
    });
  }

  redo() {
    if(this.state.redos.length===0) {
      return;
    }
    const currentCircles = this.state.circles.slice();
    const nextCircles = this.state.redos.pop();
    this.setState({
      circles: nextCircles,
      undos: [...this.state.undos, currentCircles],
      redos: this.state.redos.slice(),
      selectedCircleId: null,
      changingDiameter: false
    });
  }

  toggleDisplayChangeDiameterDialog() {
    this.setState({
      changingDiameter: !this.state.changingDiameter
    });
  }

  selectedCircleradius() {
    const circle = findCircleById(this.state.circles, this.state.selectedCircleId);
    return circle.rad;
  }

  render() {
    return (
      <div style={mainContainerStyles}>

        <div style={buttonContainerStyles}>
          <button
            onClick={this.undo}
            disabled={this.state.undos.length===0}>
            Undo
          </button>
          <button
            onClick={this.redo}
            disabled={this.state.redos.length===0}>
            Redo
          </button>
        </div>

        <div style={svgContainerStyles}>
          <svg width="100%" height="100%" onClick={this.handleClick}>
          {
            this.state.circles.map((c) => {
              return (
                <circle
                  key={c.id}
                  cx={c.x}
                  cy={c.y}
                  r={c.rad}
                  stroke="black"
                  fill={this.state.selectedCircleId===c.id ? 'gray' : 'white'}>
                </circle>);
            })
          }
          </svg>
        </div>

        {
          this.state.changingDiameter ?
            <DiameterDialog
              rad={this.selectedCircleradius()}
              onChange={this.handleChangeDiameter}
              toggleDisplayChangeDiameterDialog={this.toggleDisplayChangeDiameterDialog}/> :
            null
        }

      </div>
    );
  }
}

const basePosition = {
  position: 'absolute',
  left: 0, right: 0
};

const mainContainerStyles = {
  ...basePosition,
  top: 0, bottom: 0,
  backgroundColor: '#fff'
};

const buttonContainerStyles = {
  ...basePosition,
  top: 0, height: '50px',
  backgroundColor: '#ccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const svgContainerStyles = {
  ...basePosition,
  top: '50px', bottom: 0,
  backgroundColor: '#666'
};

export default CircleDrawer;
