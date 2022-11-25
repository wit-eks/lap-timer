import React from 'react';
import ERTable, { ErCpTimes } from './ERTable';

interface ExactResultsProps {
  personsResults: Map<number, number[]>;
  checkPointsNames: string[];
  nearestPositions: number[];
}

export default function ExactResultsRT(props: ExactResultsProps) {
  function toTimeString(val: number) {
    const minutes = Math.round(val / 60);
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return hh + ':' + String(mm).padStart(2, '0');
  }

  function getShortCheckPointName(name: string) {
    return name.charAt(0) + '.' + name.charAt(name.length - 1);
  }

  return (
    <React.Fragment>
      <ERTable
        cpTimes={props.checkPointsNames.map((cp, i) => {
          const nearestPositionsTimes = {
            checkPointName: getShortCheckPointName(cp),
            pos1: toTimeString(props.personsResults.get(props.nearestPositions[0])![i]),
            pos2: toTimeString(props.personsResults.get(props.nearestPositions[1])![i]),
            pos3: toTimeString(props.personsResults.get(props.nearestPositions[2])![i]),
            pos4: toTimeString(props.personsResults.get(props.nearestPositions[3])![i]),
            pos5: toTimeString(props.personsResults.get(props.nearestPositions[4])![i]),
            pos6: toTimeString(props.personsResults.get(props.nearestPositions[5])![i]),
            pos7: toTimeString(props.personsResults.get(props.nearestPositions[6])![i])
          };
          return nearestPositionsTimes as any as ErCpTimes;
        })}></ERTable>
    </React.Fragment>
  );
}
