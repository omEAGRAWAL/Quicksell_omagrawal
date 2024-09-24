import "./App.css";
// import Header from "./header/Header";
import Card from "./cards/Home";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({}); // Initialize state as an empty object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const result = await res.json();
        console.log(result);
        setData(result); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this effect will only run once on mount

  return (
    <div className="App">
      {/* Render the Card component and pass fetched data */}
      {data.tickets && data.users ? ( // Only render if data is available
        <Card
          tickets={data.tickets} // Pass tickets data
          users={data.users} // Pass users data
        />
      ) : (
        <p>Loading...</p> // Display loading message while fetching
      )}
    </div>
  );
}

export default App;
