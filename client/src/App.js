import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import "./App.css";
import UserProfile from "./components/Account/UserProfile";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <p>App component</p> */}
      <UserProfile />
    </div>
  );
}

export default App;
