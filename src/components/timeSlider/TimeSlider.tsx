import React from 'react';
import CheckPointPuller from './CheckPointPuller';
import SliderRail from './SliderRail';

export interface TimeSliderProps {
  pullers: number[];
  railWidth: number;
  railHeight: number;
  pullerWidth: number;
  pullerHeight: number;
  onDrag: any;
}

export default class TimeSlider extends React.Component<TimeSliderProps> {
  pullerOverRailDiff: number;
  mainXYShift: number;
  additionalYShift: number;

  constructor(props: TimeSliderProps) {
    super(props);
    this.mainXYShift = 10;
    this.pullerOverRailDiff = ((this.props.pullerHeight - this.props.railHeight) / 2) | 0;
    this.additionalYShift = this.pullerOverRailDiff > 0 ? this.pullerOverRailDiff : 0;
  }

  render() {
    //   console.log("in reberding TimeSlider");
    //   console.log(this.props.pullers);

    return (
      <React.Fragment>
        <svg className="shadow" style={{ border: '1px solid' }} width={600} height={80}>
          <SliderRail
            id="a-good-id-12-sb"
            x={this.mainXYShift}
            y={this.mainXYShift + this.additionalYShift}
            width={this.props.railWidth}
            height={this.props.railHeight}
          />

          {[...Array(this.props.pullers.length)].map((_, i) => (
            <CheckPointPuller
              key={'my-cps-id-' + i}
              cpid={i}
              x={this.mainXYShift}
              y={this.mainXYShift}
              width={this.props.pullerWidth}
              height={this.props.pullerHeight}
              transX={this.props.pullers[i]}
              onDrag={this.props.onDrag}></CheckPointPuller>
          ))}
        </svg>
      </React.Fragment>
    );
  }
}
