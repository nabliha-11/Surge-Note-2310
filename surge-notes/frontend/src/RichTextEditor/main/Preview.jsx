import React from "react";
import ReactMarkdown from "react-markdown";
import TurndownService from "turndown";






const Preview = ({ activeNote }) =>{
  let turndownService = new TurndownService();

  let markdown = turndownService.turndown(activeNote.body);
return (
<div className="app-main-note-preview">
    <h1>Preview</h1>
<h2 className="preview-title">{activeNote.title}</h2>
<div className="markdown-preview">
  {markdown}
</div>
</div>
);
}
 
export default Preview;