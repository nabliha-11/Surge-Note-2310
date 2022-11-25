import React, { useState, useEffect } from 'react'
import './App.css'
import uuid from "react-uuid";
import axios from 'axios';


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const config = {
    headers: {
      Authorization: "JWT " + localStorage.getItem("access")
    }
  };
  const vttaddpath = "http://127.0.0.1:8000/addvtt";
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
        console.log(note)
        console.log(config)
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote('transcript')
      mic.onerror = event => {
        console.log(event.error)

      }
      console.log(note);
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    let vtt = {
      id: uuid(),
      body: note
    };
    axios
      .post(vttaddpath, vtt, config)
      .then((response) => {
        console.log(response);
      }
      );

    setNote('')
    console.log(vtt);
    console.log(config);
  }

  return (
    <div className='VoiceToText'>
      <h1 className='voice'>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App