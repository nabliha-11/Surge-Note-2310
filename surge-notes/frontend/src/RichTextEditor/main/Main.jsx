import React from "react";
import { useState } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import MDEditor from "@uiw/react-md-editor";


  

const Main = ({ activeNote, onUpdateNote }) => {
 
  const editor=useRef(null)
  const [content,SetContent]=useState('')
 
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
     <div className="app-main">
      <div className="app-main-note-edit">
        <h2>Title</h2>
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <h2>Note</h2>
        <div className="contents" data-color-mode='light'>       
         <MDEditor
         id="body"
         textareaProps={{
          placeholder: 'Write your note here...',
          
        }}

         height={400} 
         ref={editor}
         value={activeNote.body}
         onChange={
          newCOntent => {SetContent(newCOntent);
          onEditField("body",newCOntent)
          }
        }
         />
        </div>

        
        
      </div>
   
   </div>
    
  );
};

export default Main;
