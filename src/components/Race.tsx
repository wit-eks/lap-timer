import React from 'react';
import { RaceCheckpointsValues, RaceDetails } from '../models/RacesUniversum';
import RaceCheckPoints from './RaceCheckPoints';
import { RaceHeader } from './RaceHeader';
import { RaceModelDetails } from './RaceModelDetails';

interface RaceProps {
  race: RaceDetails;
  checkPoints: RaceCheckpointsValues;
  onInc: any;
  onDec: any;
}

export default function Race(props: RaceProps) {
  return (
    <React.Fragment>
      <RaceHeader name={props.race.name} editionName={props.race.editionName}></RaceHeader>
      <RaceCheckPoints
        times={props.checkPoints.times}
        names={props.checkPoints.names}
        onInc={props.onInc}
        onDec={props.onDec}></RaceCheckPoints>
      <RaceModelDetails></RaceModelDetails>
    </React.Fragment>
  );
}
