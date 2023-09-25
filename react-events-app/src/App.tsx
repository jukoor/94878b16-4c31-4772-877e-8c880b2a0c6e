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
  const [filteredEventsData, setFilteredEventsData] =
    useState<any[]>(eventData);

  useEffect(() => {
    fetch(`https://teclead-ventures.github.io/data/london-events.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setEventData(data);
        setFilteredEventsData(data);
      })
      .catch((error) => {
        console.log(error.message);
        setEventData([]);
        setFilteredEventsData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchInput = event.target.value;

    // Filter by title key
    const filterBySearch = (array: Array<{ title: string }>, key: string) => {
      return array.filter((item) =>
        item.title.toLowerCase().includes(key.toLowerCase())
      );
    };

    // Use the filter function to get the filtered results
    setFilteredEventsData(filterBySearch(eventData, searchInput));
  };

  return (
    <div className="App">
      <NavBar onSearchInput={handleSearchInput} />
      {eventData && <EventsList eventsData={filteredEventsData} />}
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
    </div>
  );
};

export default App;
