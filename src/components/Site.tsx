import React from 'react';
import {
  RaceCheckpointsValues,
  RaceDetails,
  RaceComputedDetail,
  PersonResult,
  RaceResults
} from '../models/RacesUniversum';
import Race from './Race';
import RacePicker, { RaceGroup, RacePointer } from './RacePicker';
import { Container, Row, Col } from 'react-grid-system';
//import ExactResults from './ExactResults';
import TimeSlider from './timeSlider/TimeSlider';
import ExactResultsRT from './ExactResultsRT';
//import LtBanner from './banners/LtIBanner';
import MainBanner from './banners/MainBanner';
import LtTitle from './banners/LtTitle';

export interface SiteProps {
  races: Array<RaceComputedDetail>;
  results: Array<RaceResults>;
}

interface SiteState {
  pickedRace: number;
  times: number[];
  timeSliderPullers: number[];
  names: string[];
  coefficients: number[];
  positionsMap: Map<number, PersonResult>;
  finishTimesToPositionsMap: Map<number, number[]>;
  checkPointsTimesToPositionsMap: Map<number, number[]>[];
}

export default class Site extends React.Component<SiteProps, SiteState> {
  step: number;
  _raceGroups: RaceGroup[];
  //key is the index of race detils
  _allPositionsMaps: Map<number, Map<number, PersonResult>>;
  _allFinishTimesToPositionsMaps: Map<number, Map<number, number[]>>;
  _allCheckPointsTimesToPositionsMaps: Map<number, Map<number, number[]>[]>;

  _exactResultsWindow: number; //TODO use useState

  howManyNearestResults = 7;

  constructor(props: SiteProps) {
    super(props);

    console.log('in <Site> constructor');

    this.step = 5 * 60;

    this._raceGroups = this.createRacesGroups();

    this._allPositionsMaps = this.createPositionsMaps();
    this._allFinishTimesToPositionsMaps = this.createFinishTimesToPositionsMaps();
    this._allCheckPointsTimesToPositionsMaps = this.createCheckPointsTimesToPositionsMaps();

    this._exactResultsWindow = 10 * 60;

    const initRaceId = 0;
    const s = this.buildStateObject(initRaceId);

    this.state = s;
  }

  createPositionsMaps(): Map<number, Map<number, PersonResult>> {
    const res = new Map<number, Map<number, PersonResult>>();

    this.props.races.forEach((v, i) => {
      const raceId = v.raceId;

      const raceResults = this.props.results.filter((r) => r.raceId === raceId)[0];

      if (raceResults === undefined) return; // aka continue

      const positionsMap = new Map<number, PersonResult>();

      raceResults.results
        .filter((r) => r.status === 'FIN')
        .map((r) => positionsMap.set(r.position, r));

      res.set(i, positionsMap);
    });

    // const first = res.get(0)!;
    // var foo = first.get(13);
    // console.log(foo)

    return res;
  }

  createFinishTimesToPositionsMaps(): Map<number, Map<number, number[]>> {
    const res = new Map<number, Map<number, number[]>>();

    this.props.races.forEach((v, i) => {
      const raceId = v.raceId;
      const raceResults = this.props.results.filter((r) => r.raceId === raceId)[0];

      if (raceResults === undefined) return; // aka continue

      const finishTimesToPositionsMap = new Map<number, number[]>();

      raceResults.results
        .filter((r) => (r.status = 'FIN'))
        .forEach((r) => {
          const finishTime = r.result;

          const a = finishTimesToPositionsMap.get(finishTime);

          if (a !== undefined) {
            a.push(r.position);
          } else {
            const b = new Array<number>();
            b.push(r.position);
            finishTimesToPositionsMap.set(finishTime, b);
          }
        });

      res.set(i, finishTimesToPositionsMap);
    });

    // const first = res.get(0)!;
    // var foo = first.get(35686);
    // console.log(foo)

    return res;
  }

  createCheckPointsTimesToPositionsMaps(): Map<number, Map<number, number[]>[]> {
    const res = new Map<number, Map<number, number[]>[]>();

    this.props.races.forEach((v, i) => {
      const raceId = v.raceId;
      const raceResults = this.props.results.filter((r) => r.raceId === raceId)[0];

      if (raceResults === undefined) return; // aka continue

      const numberOfCheckPoints = raceResults.results[0].checkPoints.length;
      const checkPointsTimesToPositionsMaps = new Array<Map<number, number[]>>(numberOfCheckPoints);

      for (let k = 0; k < numberOfCheckPoints; k++) {
        checkPointsTimesToPositionsMaps[k] = new Map<number, number[]>();
      }

      raceResults.results.forEach((r) => {
        r.checkPoints.forEach((c) => {
          let m = checkPointsTimesToPositionsMaps[c.index];
          let ps = m.get(c.result);
          if (ps === undefined) {
            ps = new Array<number>();
            ps.push(r.position);
            m.set(c.result, ps);
          } else {
            ps.push(r.position);
          }
        });
      });

      res.set(i, checkPointsTimesToPositionsMaps);
    });

    // const first = res.get(0)!;
    // var foo = first[0].get(12979);
    // console.log(foo)

    return res;
  }

  onPick(raceId: number) {
    console.log('SITE > ON PICK: picked race: ' + raceId);

    const s = this.buildStateObject(raceId);

    this.setState((state, props) => ({
      times: s.times,
      names: s.names,
      coefficients: s.coefficients,
      pickedRace: s.pickedRace,
      positionsMap: s.positionsMap,
      finishTimesToPositionsMap: s.finishTimesToPositionsMap,
      checkPointsTimesToPositionsMap: s.checkPointsTimesToPositionsMap,
      timeSliderPullers: s.timeSliderPullers
    }));
  }

  createRacesGroups() {
    console.warn('Creating RacesGroups - should be done once!!!');
    function compareGroup(a: RaceGroup, b: RaceGroup) {
      return a.name.localeCompare(b.name);
    }

    const unsortedRaceGroups = new Array<RaceGroup>();
    this.props.races.forEach((v, i) => {
      const addedGroupIndex = unsortedRaceGroups.findIndex((g) => g.name === v.name);
      const racePointer = {
        id: i,
        name: v.name,
        year: v.year,
        editionName: v.editionName
      } as RacePointer;

      if (addedGroupIndex === -1) {
        const rps = new Array<RacePointer>();
        rps.push(racePointer);
        unsortedRaceGroups.push(new RaceGroup(v.name, 'race-icon-placeholder', rps));
      } else {
        unsortedRaceGroups[addedGroupIndex].races.push(racePointer);
      }
    });

    const withUnsortedRacePointers = unsortedRaceGroups.sort(compareGroup);

    function compareRacePointer(a: RacePointer, b: RacePointer) {
      if (a.year < b.year) return 1;
      if (a.year > b.year) return -1;
      return 0;
    }

    withUnsortedRacePointers.forEach((g) => {
      g.races = g.races.sort(compareRacePointer);
    });

    return withUnsortedRacePointers;
  }

  getPullersFromTimes(times: number[]): number[] {
    //TODO this should be taken from race detauks
    // it is not the time limit. SHould be increased by an hour or so
    // the value here will work for BUGT
    const maxTime = 18 * 3600;

    //TODO 550 value this should be handled difrently :D
    return times.map((t) => (550 * t) / maxTime);
  }

  buildStateObject(raceId: number): SiteState {
    const r = this.props.races[raceId];
    const coef = this.getCoeficients(r);

    const times = this.computeTimesFromFinishInit(r.finishTimeQ2 * 60, coef);
    const pullers = this.getPullersFromTimes(times);

    // console.warn(times);
    // console.warn(pullers);

    return {
      pickedRace: raceId,
      names: this.getAllCehckPointsNames(r),
      coefficients: coef,
      times: times,

      positionsMap: this._allPositionsMaps.get(raceId),
      finishTimesToPositionsMap: this._allFinishTimesToPositionsMaps.get(raceId),
      checkPointsTimesToPositionsMap: this._allCheckPointsTimesToPositionsMaps.get(raceId),
      timeSliderPullers: pullers
    } as SiteState;
  }

  getCoeficients(race: RaceComputedDetail) {
    return race.checkPointDetails.map((v) => v.q2);
  }

  getAllCehckPointsNames(race: RaceComputedDetail) {
    return race.checkPointDetails.map((v) => v.name);
  }

  computeTimesFromFinishInit(atFinish: number, coef: number[]) {
    const res = coef.map(
      (_, i) =>
        Math.round(
          // this will round times to a minute - no need to show seconds if you run more then 10 hours :D
          (atFinish * coef[i]) / 60
        ) * 60
    );
    return res;
  }

  computeTimesFromFinish(atFinish: number) {
    const coef = this.state.coefficients;
    const res = coef.map(
      (_, i) =>
        Math.round(
          // this will round times to a minute - no need to show seconds if you run more then 10 hours :D
          (atFinish * coef[i]) / 60
        ) * 60
    );
    return res;
  }

  onDec = (i: number) => {
    this.setState((state, props) => {
      state.times[i] -= this.step;
      state.times[i] = Math.ceil(state.times[i] / this.step) * this.step;
      const atFinish = state.times[i] / this.state.coefficients[i];
      const times = this.computeTimesFromFinish(atFinish);
      const pullers = this.getPullersFromTimes(times);
      return {
        times: times,
        timeSliderPullers: pullers
      };
    });
  };

  onInc = (i: number) => {
    this.setState((state, props) => {
      state.times[i] += this.step;
      state.times[i] = Math.floor(state.times[i] / this.step) * this.step;
      const atFinish = state.times[i] / this.state.coefficients[i];
      const times = this.computeTimesFromFinish(atFinish);
      const pullers = this.getPullersFromTimes(times);
      return {
        times: times,
        timeSliderPullers: pullers
      };
    });
  };

  //TODO leave for while, perhaps we will use it
  // it gives the list of all positions fro +- 10 mins from actual time choosen
  getExactResults(window: number): number[][] {
    const resMap = new Map<number, number[]>();

    this.state.times.forEach((avgTimeAtCp, cpIndex) => {
      const timeMin = avgTimeAtCp - this._exactResultsWindow;
      const timeMax = avgTimeAtCp + this._exactResultsWindow;
      const checkPointTimes = this.state.checkPointsTimesToPositionsMap[cpIndex];
      checkPointTimes.forEach((positions, time) => {
        if (time >= timeMin && time <= timeMax) {
          let cpPositions = resMap.get(cpIndex);
          if (cpPositions === undefined) {
            cpPositions = new Array<number>();
            resMap.set(cpIndex, cpPositions);
          }
          positions.forEach((p) => cpPositions?.push(p));
        }
      });
    });

    console.warn('Setting Positions at checkpoints');
    console.log(resMap);

    return new Array<Array<number>>();
  }

  getNearestExactPositions(): number[] {
    const atFinish = this.state.times[this.state.times.length - 1];

    console.warn(' in getNearestExactPositions');
    console.log(atFinish);

    const nearestPositionsMap = new Map<number, Array<number>>();

    this.state.finishTimesToPositionsMap.forEach((positions, time) => {
      const delta = Math.abs(time - atFinish);
      const np = nearestPositionsMap.get(delta);
      if (np === undefined) {
        nearestPositionsMap.set(delta, [...positions]); ///MAKE A COPY of POSITIONS
      } else {
        positions.forEach((p) => np.push(p));
        //nearestPositionsMap.set(delta, np);
      }
    });

    let posArray = new Array<number>();

    const deltasSorted = [...nearestPositionsMap.keys()]
      .sort(function (a, b) {
        return a - b;
      })
      .slice(0, this.howManyNearestResults);

    deltasSorted.forEach((v) => {
      const pos = nearestPositionsMap.get(v)!;
      pos.forEach((p) => posArray.push(p));
    });

    return posArray.slice(0, this.howManyNearestResults).sort(function (a, b) {
      return a - b;
    });
  }

  getCheckPointsTimes(positions: number[]): Map<number, number[]> {
    const res = new Map<number, number[]>();

    positions.forEach((p, i) => {
      const personResult = this.state.positionsMap.get(p)!;
      res.set(
        p,
        personResult.checkPoints.map((cp) => cp.result)
      );
    });

    return res;
  }

  // TODO this should be made reactive
  // any puller move should be visible in times change
  // atm it is only a presenter, draging will not work
  ratios = [0.2, 0.8, 0.9];
  pullerWidth = 10;
  sliderSetOtherBoxesFrom = (i: number, pos: number) => {
    const R = this.ratios[i];
    const X = pos - this.pullerWidth / 2;
    const ns = this.ratios.map((r, j) => {
      if (j === i) return X;
      return (r * X) / R;
    });
    return ns;
  };
  sliderMainOnDrag = (cp: number, pos: number) => {
    const ns2 = this.sliderSetOtherBoxesFrom(cp, pos);

    // this.setState((state, props) => {
    //     //console.log(state)    ;
    //     return {pullers: ns2}
    // });
  };

  render() {
    const current = this.props.races[this.state.pickedRace];

    const checkPoints = {
      names: this.state.names,
      times: this.state.times
    } as RaceCheckpointsValues;

    const raceDetails = current as RaceDetails;

    const nearestPositions = this.getNearestExactPositions();

    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <LtTitle class="main-title"></LtTitle>
          </Row>
          <Row>
            <MainBanner class="main-banner"></MainBanner>
            {/* <LtBanner name="main-bugt2" color="#FFFFFF" size={1600} /> */}
            {/* <Typography component="h1">Race finisher - pick the race and see your time on checkpoints</Typography> */}
          </Row>
          <Row>
            <Col md={3}>
              <RacePicker
                picked={this.state.pickedRace}
                onPick={(i: number) => this.onPick(i)}
                raceGroups={this._raceGroups}></RacePicker>
            </Col>
            <Col md={9}>
              <Row>Header of the Race</Row>
              <Row>
                {/* <TimeSlider
                  pullers={this.state.timeSliderPullers}
                  railWidth={550}
                  railHeight={50}
                  pullerWidth={this.pullerWidth}
                  pullerHeight={60}
                  onDrag={this.sliderMainOnDrag}></TimeSlider> */}
              </Row>
              <Row>
                <Col md={3.5}>
                  <Race
                    race={raceDetails}
                    checkPoints={checkPoints}
                    onDec={this.onDec}
                    onInc={this.onInc}></Race>
                </Col>
                <Col md={4.25}>
                  <Row>Exact runners list</Row>
                  <ExactResultsRT
                    checkPointsNames={checkPoints.names}
                    personsResults={this.getCheckPointsTimes(nearestPositions)}
                    nearestPositions={nearestPositions}></ExactResultsRT>
                </Col>
                <Col md={4.25}> Some global details </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
