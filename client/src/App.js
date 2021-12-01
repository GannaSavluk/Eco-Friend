import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import Header from "./components/Header/Header";
import Blog from "./components/Blog/Blog";
import Map from "./components/Map/Map";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Logout from "./components/Auth/Logout";

function App() {
  const userId = useSelector((store) => store.auth.user?.id);
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={!userId && <Map />} />
        <Route path="/blog" element={!userId && <Blog />} />
        <Route path="/signup" element={!userId && <Signup />} />
        <Route path="/signin" element={!userId && <Signin />} />
        <Route path="/logout" element={userId && <Logout />} />
      </Routes>
    </div>
  );
}

export default App;
