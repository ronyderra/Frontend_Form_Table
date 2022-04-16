import React from 'react';
import './App.css';
import MainForm from './Components/Form/mainForm'
import Table from './Components/Table/table'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="table" element={<Table />} />
      </Routes>

    </div>
  );
}

export default App;
