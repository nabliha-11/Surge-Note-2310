import React from "react";
import ReactMarkdown from "react-markdown";

const Preview = ({ activeNote }) =>{
return (
<div className="app-main-note-preview">
    <h1>Preview</h1>
<h2 className="preview-title">{activeNote.title}</h2>
<ReactMarkdown className="markdown-preview">
  {activeNote.body}
</ReactMarkdown>
</div>
);
}
 
export default Preview;