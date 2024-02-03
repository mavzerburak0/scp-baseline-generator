import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Examples from './components/Examples.tsx';
import BestPractices from './components/BestPractices.tsx';
import About from './components/About.tsx';

function MyRoutes() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
          <App />
        } />
      <Route path="/about" element={
        <About />
      } />
    </Routes>
  </BrowserRouter>
  );
}

function Main() {
  return (
    <MyRoutes />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Main />);
