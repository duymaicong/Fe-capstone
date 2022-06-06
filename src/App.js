import React from "react";
import "./App.css";
import SwitchRoutes from "./components/routes";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";

function App() {
  return (
    <div className="App">
      <SwitchRoutes />
    </div>
  );
}

export default App;
