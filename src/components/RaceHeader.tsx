import { Typography } from '@mui/material';
import React from 'react';

interface RaceHeaderProps {
  name: string;
  editionName: string;
}

export function RaceHeader(props: RaceHeaderProps) {
  return (
    <React.Fragment>
      <Typography component="h2">{props.name}</Typography>
      <Typography component="h3">{props.editionName}</Typography>
    </React.Fragment>
  );
}
