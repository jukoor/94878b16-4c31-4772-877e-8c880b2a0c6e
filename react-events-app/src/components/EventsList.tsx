import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

import Event from "./Event";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: 0,
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

type Props = {
  eventsData: object[];
};

const EventsList: React.FC<Props> = ({ eventsData }) => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {eventsData.map(
          ({
            _id,
            title,
            flyerFront,
            venue,
            startTime,
            endTime,
            venueGmapsUrl,
          }: any) => (
            // TODO: Nur event ausspielen, grid und item ggf entfernen oder rüber zu Event.tsx
            <Event
              key={_id}
              title={title}
              flyerFront={flyerFront}
              venueName={venue.name}
              venueGmapsUrl={venue.direction}
              dateTimeStart={startTime}
              dateTimeEnd={endTime}
            />
          )
        )}
      </Grid>
    </Container>
  );
};

export default EventsList;
