import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import CreateUser from "./modules/User/CreateUser";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreateUser></CreateUser>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
