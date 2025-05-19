import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./Root.css";


function Root() {
  return (
    <Router>
      <Routes>
        <Route index element={<p>Index</p>} />
      </Routes>
    </Router>
  );
}

export default Root;
