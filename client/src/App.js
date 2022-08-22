import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import CreateUser from "./modules/User/CreateUser";
import Home from "./modules/Home/Home";
import Navbar from "./modules/Navbar/Navbar";
import Details from "./modules/User/Details";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Link to={"/create"}>Link to create</Link> */}
        <Navbar></Navbar>

        <Routes>
          <Route
            path="/users/create"
            element={<CreateUser></CreateUser>}
          ></Route>
          <Route path="/users/:slug" element={<Details></Details>}></Route>
          <Route path="/" exact element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
