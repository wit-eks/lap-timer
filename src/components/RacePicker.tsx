import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import React from 'react';
import LtIcon from './icons/LtIcon';

export class RaceGroup {
  name: string;
  icon: string;
  races: RacePointer[];
  constructor(name: string, icon: string, races: RacePointer[]) {
    this.name = name;
    this.icon = icon;
    this.races = races;
  }
}

export interface RacePointer {
  id: number;
  name: string;
  year: number;
  editionName: string;
}

export interface RacePickerProps {
  raceGroups: RaceGroup[];
  picked: number;
  onPick: any;
}

export default function RacePicker(props: RacePickerProps) {
  const [expand, setExpand] = React.useState(
    Array.from({ length: props.raceGroups.length }, (_v, i) => (i === 0 ? true : false))
  );
  const predictedMaxEditionsCount = 20;

  const handleClick = (id: number) => {
    //console.info(id);
    props.onPick(id);
  };

  const handleExpand = (i: number) => {
    //TODO can we use existing expand as source, and just reset values
    const a = expand.map((v, j) => (j === i ? !v : false));
    setExpand(a);
  };

  return (
    <React.Fragment>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Pick the race
          </ListSubheader>
        }>
        {props.raceGroups.map((o, i) => {
          return (
            <React.Fragment key={i + 1}>
              <ListItemButton onClick={() => handleExpand(i)}>
                <ListItemIcon>
                  {/* <MountainIcon /> */}
                  <LtIcon name="mountain-race-group" color="#FFFFFF" size={24} />
                </ListItemIcon>
                <ListItemText primary={o.name} />
                {!expand[i] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {o.races.map((r, j) => {
                return (
                  <Collapse
                    key={(i + 1) * predictedMaxEditionsCount + j}
                    in={expand[i]}
                    timeout="auto"
                    unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick(r.id)}>
                        <ListItemIcon>
                          {/* <RunnerIcon /> */}
                          <LtIcon name="mountain-race" color="#FFFFFF" size={18} />
                        </ListItemIcon>
                        <ListItemText primary={r.editionName} />
                      </ListItemButton>
                    </List>
                  </Collapse>
                );
              })}
            </React.Fragment>
          );
        })}
      </List>
    </React.Fragment>
  );
}
