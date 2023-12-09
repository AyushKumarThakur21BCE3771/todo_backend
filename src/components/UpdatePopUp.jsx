import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../utils/constant";

export default function UpdatePopUp(props) {
  const [input, setInput] = useState(props.popUpContent.text);
  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${props.popUpContent.id}`, { todo: input })
      .then((res) => {
        console.log(res);
        props.setUpdateUI((prevState) => !prevState);
        props.setDisplayUpdatePopUp(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="updatePopUp">
        <div className="container">
          <h3 className="title">Update TODO App</h3>
          <div className="input-holder">
            <input
              type="text"
              placeholder={input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={updateToDo}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
