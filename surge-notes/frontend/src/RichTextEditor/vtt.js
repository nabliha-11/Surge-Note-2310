import React, { useState, useEffect } from 'react'
import './App.css';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function getvtt() {
  axios
    .post(vttaddpath, vtt, config)
    .then((response) => {
      console.log(response);
    }
    );


}

function App() {
  const config = {
    headers: {
      Authorization: "JWT " + localStorage.getItem("access")
    }
  };
  const vttaddpath = "http://127.0.0.1:8000/addvtt";
  const vttdelete = "http://127.0.0.1:8000/deletevtt";

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
        console.log('kinda workign on click ig');
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
        console.log(transcript)
        mic.onerror = event => {
          console.log(event.error)
        }
      }
    }

    const handleSaveNote = () => {
      console.log(vtt);
      setSavedNotes([...savedNotes, note]);
      vtt = {
        id: uuid(),
        body: note
      };
      setNote("");
      axios
        .post(vttaddpath, vtt, config)
        .then((response) => {
          console.log(response);
        }
        );

      console.log(vtt);
      console.log(J);
    };

    return (
      <>
        <h1 style={{ color: "white" }}>Voice Notes</h1>
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
      </>
    )
  }
}
export default Apps