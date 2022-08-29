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
import Login from "./modules/Auth/Login/Login";
import Register from "./modules/Auth/Regsiter/Register";
import "./App.css";
import store from "./redux/Store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div className="App">
      <Router>
        {/* <Link to={"/create"}>Link to create</Link> */}
        <Navbar></Navbar>

        <Routes>
          {isLogin && (
            <Route
              path="/users/create"
              element={<CreateUser></CreateUser>}
            ></Route>
          )}
          <Route path="/users/:slug" element={<Details></Details>}></Route>
          <Route path="/auth/login" element={<Login></Login>}></Route>
          <Route path="/users/register" element={<Register></Register>}></Route>
          <Route path="/" exact element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
