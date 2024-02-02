import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Examples from './components/Examples.tsx';
import BestPractices from './components/BestPractices.tsx';
import About from './components/About.tsx';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Header />}>
//       <Route index element={<Home />} />
//       <Route path="login" element={<Login />} />
//       <Route path="register" element={<Register />} />
//     </Route>
//   )
// )

// function Main() {
//   return (
//     <RouterProvider router={router}>
//       <App />
//     </RouterProvider>
//   )
// }

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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Main />
)
