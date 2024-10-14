import { useState } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Main searchTerm={searchTerm} />
    </>
  );
}

export default App;
