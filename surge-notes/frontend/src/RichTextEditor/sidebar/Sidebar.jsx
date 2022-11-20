import React, { useState, useEffect } from 'react';
import logo from '../image/im4.png';
import ocr from '../image/ocr.png';
import rb from '../image/rb2.png';
import { ImBin } from "react-icons/im"
import { AiFillFileAdd } from "react-icons/ai"
import { BiUserVoice } from "react-icons/bi";
import { RiImageEditLine } from "react-icons/ri";
import { useHistory } from 'react-router-dom';
import { HiOutlineSortDescending,HiOutlineSortAscending } from "react-icons/hi";

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  darkMode,
  setDarkMode,
}) => {
 
 
  //const sortedNotesDesc = notes.sort((a, b) => a.lastModified - b.lastModified);

//  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
const [sortstate,setsortstate]= useState(false);

const toggleState=()=>{
  setsortstate(!sortstate);
  if(!sortstate){
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    } else {
    const sortedNotes = notes.sort((a, b) => a.lastModified - b.lastModified);
    } 
}

/*const Asorting = () => {
  var sortt =1 ;
  if(sortt){
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  } else {
  const sortedNotes = notes.sort((a, b) => a.lastModified - b.lastModified);
  }
}
const Dsorting = () => {
  var sortt =0 ;
  if(sortt){
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  } else {
  const sortedNotes = notes.sort((a, b) => a.lastModified - b.lastModified);
  }
}*/

  const history = useHistory();

 /*  const navigatevtt = () => {
    // 👇️ navigate to /
    history('./RichTextEditor/vtt');
  }; */

  return (
    <div className={darkMode?"app-sidebar-dark":"app-sidebar"}>
      <div className="app-sidebar-head">
        <img src={logo} className="app-sidebar-logo" alt="" />
        <div className="side-container">
        <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
        <div className="side-switch-checkbox">
          <label className="side-switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
      </div>
        <button onClick={()=> history.push("/itt")}>
          <RiImageEditLine className="app-sidebar-ocr" alt="" />
        </button>
        <button onClick={()=> history.push("/vtt")}>
          <BiUserVoice className="app-sidebar-voice" alt="" />
          {/* <Link to="/yourRoute"></Link> */}
        </button>
      </div>
      <div className={darkMode?"app-sidebar-header-dark":"app-sidebar-header-light"}>
        <h1>Notes</h1>
        <button onClick={toggleState}>
          {sortstate ?<HiOutlineSortDescending className="app-sidebar-des" alt=""/> :<HiOutlineSortAscending className="app-sidebar-asc" alt=""/>}
          </button>
        
        <button onClick={onAddNote}>
          <AiFillFileAdd className="app-sidebar-add" alt="" />
        </button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>
                <ImBin className="app-sidebar-dlt" alt="" />
              </button>
            </div>

            <p className={darkMode?'dark-p':'light-p'}>{body && body.substr(0, 25) + "..."}</p>
            <small className={darkMode?"note-meta-dark":"note-meta-light"}>
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
