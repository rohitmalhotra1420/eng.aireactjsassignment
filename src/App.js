import React from 'react';
import logo from './logo.svg';
import './App.css';
import StoryList from './features/StoryList';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
