import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Event from "./Event";
import "./EventsList.scss";

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
  const [filteredEventsData, setFilteredEventsData] = useState(eventsData);

  function sortByDateAsc(a: any, b: any): number {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA > dateB ? 1 : -1;
  }

  filteredEventsData.sort(sortByDateAsc);
  useEffect(() => {
    // initial value in useState() is not set correctly
    setFilteredEventsData(eventsData);
  });

  return (
    <Container maxWidth="lg" className="event-container">
      <Grid container spacing={3}>
        {filteredEventsData.map(
          ({ _id, title, flyerFront, venue, date, venueGmapsUrl }: any) => (
            <Event
              key={_id}
              title={title}
              flyerFront={flyerFront}
              venueName={venue.name}
              date={date}
              venueGmapsUrl={venue.direction}
            />
          )
        )}
      </Grid>
    </Container>
  );
};

export default EventsList;
