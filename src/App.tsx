import React from 'react';

import './App.scss';
import Site from './components/Site';
import { RaceComputedDetail, RaceResults } from './models/RacesUniversum';
import { default as racesUniversum } from './racesData/allQ.json';
import { default as racesResultsUniversum } from './racesData/racesSimpleResults.json';

function App() {
  var raceComputedDetails = racesUniversum as any as Array<RaceComputedDetail>;
  var racesResults = racesResultsUniversum as any as Array<RaceResults>;
  console.log('in MAIN APP');

  return (
    <div className="App">
      <Site races={raceComputedDetails} results={racesResults}></Site>
    </div>
  );
}

export default App;
