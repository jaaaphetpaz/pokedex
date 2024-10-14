import React, { useState } from "react";

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="navbar bg-base-100 border-b-2 mt-1">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl">Kanto Region Pokedex</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search by #ID or Name"
            value={searchTerm}
            onChange={handleInputChange}
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
