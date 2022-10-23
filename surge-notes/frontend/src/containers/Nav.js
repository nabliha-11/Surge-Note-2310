import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Nav() {
  const navStyle ={
    color: 'Navy'
  };
  return (
    <nav>
        <h3>SURGE</h3>
        <ul className='nav-links'>
          <div>
          <Link style={navStyle} to="/markdown">
            <li className='nav_mark'><button>Markdown</button></li>
          </Link>
          </div>
          <Link  style={navStyle} to="/simple">
            <li className='nav_simple'><button>Rich Text Editor</button></li>
          </Link>
            
        </ul>
        <h4>Sign out</h4>
    </nav>
  );
}

export default Nav;
