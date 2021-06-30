import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//!to get the data from Local Storage
const getLocalItem = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function Todo() {
  const [input, setInput] = useState("");
  //   const [todo, setTodo] = useState([]);
  const [todo, setTodo] = useState(getLocalItem());

  //!add todo
  const AddTodo = () => {
    if (!input) {
      toast.error("please write something");
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: input };
      setTodo([...todo, allInputData]);
      setInput("");
      toast.success("SuccessFully Added", {
        autoClose: 2000,
      });
    }
  };

  //! add data to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todo));
  }, [todo]);

  //!Delete single todo
  const deleteTodoItem = (deleteItemId) => {
    const updatedTodo = todo.filter((element) => {
      return element.id !== deleteItemId;
    });
    toast("Delete SuccessFully", {
      autoClose: 3000,
    });
    setTodo(updatedTodo);
  };

  //!delete all
  const removeAll = () => {
    setTodo([]);
    toast.warn("All Todos Deleted SuccessFully", {
      autoClose: 3000,
    });
  };

  //!delete Single Item from Local storage
  const editItem = (itemId) => {
    let newEditItem = todo.find((element) => {
      return itemId === element.id;
    });
    // console.log(newEditItem);
    setInput(newEditItem.name);
  };
  return (
    <Container maxWidth="sm" className="App">
      <Typography className="title" style={{ fontSize: 30 }}>
        Add Your List Here
      </Typography>
      <TextField
        className="input"
        label="Write here Your Note"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        className="btn"
        variant="contained"
        color="primary"
        onClick={AddTodo}
      >
        Add Note
      </Button>
      <div className="list">
        {todo.map((item) => {
          return (
            <div className="listItem" key={item.id}>
              {item.name}
              <Box>
                <IconButton onClick={() => editItem(item.id)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => deleteTodoItem(item.id)}>
                  <DeleteOutlineTwoToneIcon color="secondary" />
                </IconButton>
              </Box>
            </div>
          );
        })}
      </div>
      <Box className="removeTodo">
        <Button
          className="removeBtn"
          variant="outlined"
          color="secondary"
          onClick={removeAll}
        >
          Remove All
          <DeleteTwoToneIcon color="secondary" />
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default Todo;
