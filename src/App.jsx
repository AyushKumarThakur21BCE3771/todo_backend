import { useEffect, useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import UpdatePopUp from "./components/UpdatePopUp";

function App() {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [displayUpdatePopUp, setDisplayUpdatePopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});
  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);
  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { todo: input })
      .then((res) => {
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="main">
        <div className="container">
          <h3 className="title">ToDo List</h3>
          <div className="input-holder">
            <input
              type="text"
              placeholder="Add a ToDo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={saveToDo}>Add</button>
          </div>
        </div>
        <div className="todo-list">
          {toDos.map((todoItem) => (
            <ToDo
              text={todoItem.todo}
              id={todoItem._id}
              setUpdateUI={setUpdateUI}
              setDisplayUpdatePopUp={setDisplayUpdatePopUp}
              setPopUpContent={setPopUpContent}
              key={todoItem._id}
            />
          ))}
        </div>
      </div>
      {displayUpdatePopUp && <UpdatePopUp popUpContent={popUpContent} setUpdateUI={setUpdateUI} setDisplayUpdatePopUp={setDisplayUpdatePopUp} />}
    </>
  );
}

export default App;
