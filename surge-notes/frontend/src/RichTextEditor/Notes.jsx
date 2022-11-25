import { useEffect, useState } from "react";
import uuid from "react-uuid";
import axios from 'axios';
import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import React from "react";



function Jret() {
  let j;
  axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
    email: "cifib74850@24rumen.com",
    password: "chan42069$2"
  }).then((response) => localStorage.setItem("access", response['data']['access']));
  return j;
}

function Notes() {

  var J = localStorage.getItem("access");

  console.log(J);



  var config = {
  }


  const noteAddPath = "http://127.0.0.1:8000/addnote";
  const noteDeletePath = "http://127.0.0.1:8000/deletenote";
  const noteUpdatePath = "http://127.0.0.1:8000/updatenote";
  const notefetchPath = "http://127.0.0.1:8000/fetchnotes";

  // const [notes, setNotes] = useState(
  //   localStorage.notes ? JSON.parse(localStorage.notes) : []
  // );

  const Fetchnotes = () => {


    config = {
      headers: {
        Authorization: "JWT " + J
      }

    };



    let qset = []
    const [arr, setArr] = useState([]);
    axios
      .get(notefetchPath, config)
      .then((response) => {
        qset.push(...response.data);
      }
      );
    //useEffect(() => {
    // setArr(qset);
    //}, [])

    return qset;
  };
  const [notes, setNotes] = useState(
    Fetchnotes()
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // const newNote = {
  //   id: uuid(),
  //   title: "Note from heaven",
  //   body: "",
  //   lastModified: Date.now()
  // };
  // const newNote2 = {
  //   id: uuid(),
  //   title: "Note from heaven2",
  //   body: "",
  //   lastModified: Date.now()
  // };
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now()
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    console.log(Notes);

    let postNote = newNote;

    postNote.lastModified = postNote.lastModified / 1000;

    axios
      .post(noteAddPath, newNote, config)
      .then((response) => console.log(response.data[0]));

  };




  const onDeleteNote = (noteId) => {

    const deleteNote = { 'id': noteId }

    setNotes(notes.filter(({ id }) => id !== noteId));
    axios
      .post(noteDeletePath, deleteNote, config)
      .then((response) => console.log(response.data[0]))
      ;
  };

  const onUpdateNote = (updatedNote) => {
    axios
      .post(noteUpdatePath, updatedNote, config)
      .then((response) => console.log(response.data[0]));

    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "App-dark" : "App-light"}>
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        //sortedNotesDesc={sortedNotesDesc}
        //sortedNotes={sortedNotes}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}

export default Notes;
