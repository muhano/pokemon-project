import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import MyPokemon from "./pages/MyPokemon";

export const PageContext = React.createContext(0);

function App() {
  const [page, setPage] = useState(0);

  const incrementPage = () => {
    setPage(page + 10);
  };

  const decrementPage = () => {
    setPage(page - 10);
  };

  return (
    <div>
      <PageContext.Provider value={{ page, incrementPage, decrementPage }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pokemon/:name" element={<Details />} />
          <Route path="mypokemon" element={<MyPokemon />} />
        </Routes>
      </PageContext.Provider>
    </div>
  );
}

export default App;
