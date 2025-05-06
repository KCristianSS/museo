import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import ModelPage from "../pages/ModelPage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/model/:id" element={<ModelPage />} />  {/* Asegúrate de tener esta ruta */}
    </Routes>
  </Router>
);

export default AppRouter;
