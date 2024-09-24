import React, { useState } from "react";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [groupingOption, setGroupingOption] = useState("");
  const [ordering, setOrdering] = useState("");

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleGrouping = (event) => {
    setGroupingOption(event.target.value);
  };

  const handleOrdering = (event) => {
    setOrdering(event.target.value);
  };

  return (
    <div style={{ padding: "10px", backgroundColor: "pink" }}>
      {/* Button to show dropdown */}
      <button onClick={toggleDropdown}>Options</button>

      {showDropdown && (
        <div style={{ marginTop: "10px" }}>
          {/* Grouping Dropdown */}
          <label htmlFor="grouping">Grouping</label>
          <select
            id="grouping"
            value={groupingOption}
            onChange={handleGrouping}
          >
            <option value="" disabled>
              --Select an option--
            </option>
            <option value="status">status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>

          {/* Ordering Dropdown */}
          <label htmlFor="ordering" style={{ marginLeft: "20px" }}>
            Ordering
          </label>
          <select id="ordering" value={ordering} onChange={handleOrdering}>
            <option value="" disabled>
              --Select an option--
            </option>
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default Header;
