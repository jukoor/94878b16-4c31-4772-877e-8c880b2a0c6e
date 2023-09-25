import React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import "./App.scss";
import NavBar from "./components/NavBar";
import EventsList from "./components/EventsList";
import Event from "./components/Event";

const App: React.FC = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredEventsData, setFilteredEventsData] =
    useState<any[]>(eventData);
  const [shoppingCartCount, setshoppingCartCount] = useState(0);

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

    // Filter by key:title
    const filterBySearch = (array: Array<{ title: string }>, key: string) => {
      return array.filter((item) =>
        item.title.toLowerCase().includes(key.toLowerCase())
      );
    };

    // Use the filter function to get the filtered results
    setFilteredEventsData(filterBySearch(eventData, searchInput));
    console.log(filteredEventsData);
  };

  // Function to increment shopping basket counter in navbar
  const updateShoppingCartCount = () => {
    setshoppingCartCount(shoppingCartCount + 1);
    console.log("Shopping Cart Count: " + shoppingCartCount + 1);
  };

  return (
    <div className="App">
      <NavBar
        onSearchInput={handleSearchInput}
        shoppingCartCount={shoppingCartCount}
      />
      <Typography
        align="center"
        component="h1"
        variant="h4"
        gutterBottom
        className="event-count"
      >
        Displaying {filteredEventsData.length} Events
      </Typography>
      {eventData && (
        <EventsList
          eventsData={filteredEventsData}
          updateShoppingCartCount={updateShoppingCartCount}
        />
      )}
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
    </div>
  );
};

export default App;
