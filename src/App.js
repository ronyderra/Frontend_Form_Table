import React from 'react';
import './App.css';
import MainForm from './Components/Form/MainForm'
import MainTable from './Components/Table/MainTable'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="table" element={<MainTable />} />
      </Routes>
    </div>
  );
}

export default App;
