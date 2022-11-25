import React from 'react';
import { Container, Col, Row } from 'react-grid-system';

interface ExactResultsProps {
  personsResults: Map<number, number[]>;
  checkPointsNames: string[];
  nearestPositions: number[];
}

export default function ExactResults(props: ExactResultsProps) {
  function toTimeString(val: number) {
    const minutes = Math.round(val / 60);
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return hh + ':' + String(mm).padStart(2, '0');
  }

  function getShortCheckPointName(name: string) {
    return name.charAt(0) + '.' + name.charAt(name.length - 1);
  }

  //console.log(props);

  // const list = new Array<string>();

  // props.personsResults.forEach((times, position) => {
  //     const timesString = times
  //         .map(v => toTimeString(v))
  //         .join(", ");

  //     list.push("("+ position + ") - " + timesString);
  // });

  // const finishIdx = props.checkPointsNames.length -1;

  return (
    <React.Fragment>
      {/* check react-table e.g. https://blog.logrocket.com/complete-guide-building-smart-data-table-react/ */}

      <Container fluid>
        <Row>
          <Col md={12.0 / 8}></Col>
          {[...Array(props.nearestPositions.length)].map((_, i) => (
            <Col md={12.0 / 8} key={i}>
              {'(' + props.nearestPositions[i] + ')'}
            </Col>
          ))}
        </Row>

        {/* <Row >
                <Col md={12.0/8} >bbb</Col>
                {[...Array(props.nearestPositions.length)].map((_, i ) => 
                    <Col md={12.0/8}  key={i}>{toTimeString(props.personsResults.get(props.nearestPositions[i])![finishIdx]) }</Col>
                )}
            </Row> */}

        {[...Array(props.checkPointsNames.length)].map((_, i) => (
          <Row key={i}>
            <Col xs={12.0 / 8}> {getShortCheckPointName(props.checkPointsNames[i])}</Col>

            {[...Array(props.nearestPositions.length)].map((_, j) => (
              <Col xs={12.0 / 8} key={j}>
                {toTimeString(props.personsResults.get(props.nearestPositions[j])![i])}
              </Col>
            ))}
          </Row>
        ))}

        {/* {[...Array(list.length)].map((_, i ) => 
                    <Row key={i}>{list[i]}</Row>
                )} */}
      </Container>
    </React.Fragment>
  );
}
