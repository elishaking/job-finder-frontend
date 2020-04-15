import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";

function App() {
  return (
    <div style={{ padding: "3em 10vw" }}>
      <Router>
        <Navbar />

        <Route path="/" component={Home} exact />
        <Route path="/jobs" component={Jobs} exact />
        <Route path="/add-job" component={AddJob} exact />
      </Router>
    </div>
  );
}

export default App;
