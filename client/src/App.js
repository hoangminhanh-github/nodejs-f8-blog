import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const data = await axios.get("http://localhost:3001/");
    setData(data.data);
  };

  return (
    <div className="App">
      {data?.map((res, index) => (
        <div key={index}>
          <span>{res.firstName}</span>
          <span>{res.lastName}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
