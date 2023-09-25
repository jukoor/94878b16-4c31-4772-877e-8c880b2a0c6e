import React from "react";
import { useEffect, useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import EventsList from "./components/EventsList";
import Event from "./components/Event";

const App: React.FC = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://teclead-ventures.github.io/data/london-events.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEventData(data);
      })
      .catch((error) => {
        console.log(error.message);
        setEventData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      {eventData && <EventsList eventsData={eventData} />}
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
    </div>
  );
};

export default App;
