import React from 'react';
import * as d3 from 'd3';

export interface CheckPointPullerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  cpid: number;
  transX: number;
  onDrag: any;
}

export default class CheckPointPuller extends React.Component<CheckPointPullerProps> {
  getId() {
    return 'check-point-slider-' + this.props.cpid;
  }

  //TODO transform to component functions with useEffect
  componentDidMount() {
    const publishHandling = (t: number) => {
      //console.warn("called " + t + " - id: " + this.props.cpid);
      this.props.onDrag(this.props.cpid, t - this.props.x);
    };

    const handleDrag = d3.drag().on('drag', function (event) {
      publishHandling(event.x);
    });

    handleDrag(d3.select('#' + this.getId()), 6);
  }

  render() {
    return (
      <rect
        id={this.getId()}
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        transform={'translate(' + this.props.transX + ')'}
      />
    );
  }
}
