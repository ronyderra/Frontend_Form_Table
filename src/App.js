import React from 'react';
import './App.css';
import MainForm from './Components/Form/mainForm'
import MainTable from './Components/Table/mainTable'
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
