export interface SliderRailProps {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

export default function SliderRail(props: SliderRailProps) {
  return (
    <rect
      id={props.id}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      className={'slider-background'}
    />
  );
}
