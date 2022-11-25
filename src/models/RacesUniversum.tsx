export interface RaceComputedDetail {
  name: string;
  editionName: string;
  editionNumber: string;
  date: string;
  year: number;
  distance: number;
  timeLimit: number;
  finishTimeQ1: number;
  finishTimeQ2: number;
  finishTimeQ3: number;
  elevationGain: number;
  elevationLoss: number;
  checkPointDetails: CheckPointComputedDetail[];
  raceId: string;
}

export interface CheckPointComputedDetail {
  name: string;
  fullName: string;

  distance: number;
  cumulatedDistance: number;

  cumulatedElevationGain: number;
  cumulatedElevationLoss: number;

  elevationGain: number;
  elevationLoss: number;
  altitude: number;

  timeLimit: number;
  q1: number;
  q2: number;
  q3: number;
}

export interface RaceDetails {
  name: string;
  editionName: string;
  editionNumber: string;
  date: string;
  year: number;
  distance: number;
  timeLimit: number;
  finishTimeQ2: number;
  elevationGain: number;
  elevationLoss: number;
}

export interface RaceCheckpointsValues {
  names: string[];
  times: number[];
}

export interface CheckPointResult {
  result: number;
  index: number;
}

export interface PersonResult {
  position: number;
  bibNumber: number;
  status: string;
  gender: string;
  category: string;
  country: string;
  result: number;
  checkPoints: CheckPointResult[];
}

export interface RaceResults {
  raceId: string;
  results: PersonResult[];
}
