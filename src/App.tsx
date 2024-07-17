import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import './App.css'

function App() {
  return (
    <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/detail/:id" element={<Home></Home>} />
        <Route path="/cart" element={<Home></Home>} />
      </Routes>
    </Suspense>
  );
}

export default App;
