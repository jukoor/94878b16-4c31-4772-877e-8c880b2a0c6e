import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import EventsList from "./components/EventsList";
import NavBar from "./components/NavBar";

function App() {
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
      <EventsList />
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {eventData &&
          eventData.map(({ _id, title }) => (
            <li key={_id}>
              <h3>{title}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
