import React, { useEffect } from 'react';
import logo from '../image/im4.png';
import ocr from '../image/ocr.png';
import rb from '../image/rb2.png';
import {ImBin} from "react-icons/im"
import {AiFillFileAdd} from "react-icons/ai"
import {BiUserVoice} from "react-icons/bi";

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-head">
        <img src={logo} className="app-sidebar-logo" alt="" />
        <h1>SURGE</h1>
        <button>
        <img src={ocr} className="app-sidebar-ocr" alt="" />
          </button>
          <button>
            <BiUserVoice className="app-sidebar-voice" alt="" />          
            </button>
      </div>
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>
        <AiFillFileAdd className="app-sidebar-add" alt="" />
          </button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
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

            <p>{body && body.substr(0, 25) + "..."}</p>
            <small className="note-meta">
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
