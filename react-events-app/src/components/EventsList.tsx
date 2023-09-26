import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Event from "./Event";
import "./EventsList.scss";

type Props = {
  eventsData: object[];
  updateShoppingCartCount: (selectedEventId: string, index: number) => void;
};

const EventsList: React.FC<Props> = ({
  eventsData,
  updateShoppingCartCount,
}) => {
  const [filteredEventsData, setFilteredEventsData] = useState(eventsData);

  function sortByDateAsc(a: any, b: any): number {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    let sortResult;
    if (dateA > dateB) {
      sortResult = 1;
    } else {
      sortResult = -1;
      // higher date
    }
    return sortResult;
  }

  filteredEventsData.sort(sortByDateAsc);
  useEffect(() => {
    // initial value in useState() is not set correctly
    setFilteredEventsData(eventsData);
  }, [eventsData]);

  return (
    <Container maxWidth="lg" className="event-container">
      <Grid container spacing={3}>
        {filteredEventsData.map(
          (
            { _id, title, flyerFront, venue, date, startTime, endTime }: any,
            index
          ) => (
            <Event
              key={_id}
              index={index}
              id={_id}
              title={title}
              flyerFront={flyerFront}
              venueName={venue.name}
              date={date}
              startTime={startTime}
              endTime={endTime}
              venueGmapsUrl={venue.direction}
              updateShoppingCartCount={updateShoppingCartCount}
            />
          )
        )}
      </Grid>
    </Container>
  );
};

export default EventsList;
