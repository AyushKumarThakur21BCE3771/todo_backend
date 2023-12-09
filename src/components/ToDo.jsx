import axios from "axios";
import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { baseURL } from "../utils/constant";

export default function ToDo(props) {
  const deleteToDo = () => {
    axios
      .delete(`${baseURL}/delete/${props.id}`)
      .then((res) => {
        console.log(res.data);
        props.setUpdateUI((prevState)=> !prevState);
      })
      .catch((err) => console.log(err));
  };
  const updateToDo = () => {
    const text = props.text;
    const id = props.id;
    props.setDisplayUpdatePopUp(true);
    props.setPopUpContent({text, id});
  }
  return (
    <div className="todo">
      <h4>{props.text}</h4>
      <div className="icons">
        <MdEdit onClick={updateToDo}/>
        <MdDeleteForever onClick={deleteToDo} />
      </div>
    </div>
  );
}
