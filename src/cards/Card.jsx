import React, { useState } from "react";
import "./Navbar.css";
import Cardbox from "./CardBox";
import BACKLOG from "../asset/icons_FEtask/Backlog.svg";
import IN_PROGRESS from "../asset/icons_FEtask/Cancelled.svg";
import COMPLETED from "../asset/icons_FEtask/Done.svg";
import TODO from "../asset/icons_FEtask/To-do.svg";
import HIGHPRIORITY from "../asset/icons_FEtask/HighPriority.svg";
import LOWPRIORITY from "../asset/icons_FEtask/LowPriority.svg";
import MEDIUM from "../asset/icons_FEtask/MediumPriority.svg";
import UrgentPriority from "../asset/icons_FEtask/UrgentPriority.svg";
import NOPRIORITY from "../asset/icons_FEtask/NoPriority.svg";
import usr1 from "../asset/icons_FEtask/usr1.avif";
import usr2 from "../asset/icons_FEtask/usr2.avif";
import usr3 from "../asset/icons_FEtask/usr3.avif";
import usr4 from "../asset/icons_FEtask/usr4.avif";
import usr5 from "../asset/icons_FEtask/usr5.avif";
import add from "../asset/icons_FEtask/add.svg";
import dotmenu from "../asset/icons_FEtask/dotmenu.svg";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const getIcon = (status) => {
  if (!status) {
    console.error("Invalid or undefined status:", status);
    return null; // Return null if status is undefined
  }

  switch (status.toLowerCase()) {
    case "backlog":
      return BACKLOG;
    case "in progress":
      return IN_PROGRESS;
    case "completed":
      return COMPLETED;
    case "todo":
      return TODO;
    case "no priority":
      return NOPRIORITY;

    case "3":
      return HIGHPRIORITY;
    case "1":
      return LOWPRIORITY;
    case "2":
      return MEDIUM;
    case "4":
      return UrgentPriority;
    case "0":
      return NOPRIORITY;
    case "usr-1":
      return usr1;

    case "usr-2":
      return usr2;
    case "usr-3":
      return usr3;
    case "usr-4":
      return usr4;
    case "usr-5":
      return usr5;

    default:
      console.error("Invalid status:", status);
      return null;
  }
};
function Header({ tickets, users }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [groupingOption, setGroupingOption] = useState("");
  const [ordering, setOrdering] = useState("");

  const toggleDropdown = () =>
    setShowDropdown((prev) => {
      console.log("prev", prev);
      //set a timmer that chnages it back after 2 sec
      setTimeout(() => {
        setShowDropdown(false);
      }, 4000);
      return !prev;
    });

  const handleGrouping = (event) => {
    setGroupingOption(event.target.value);
  };

  const handleOrdering = (event) => {
    setOrdering(event.target.value);
  };
  function getUserIdByName(name) {
    const user = users.find((user) => user.name === name);
    return user ? user.id : "User not found"; // Return user ID if found, otherwise return an error message
  }

  // Function to group and sort tickets
  const groupAndSortTickets = (tickets, users, groupBy, sortBy) => {
    let groupedTickets = {};

    switch (groupBy) {
      case "status":
        groupedTickets = groupByField(tickets, "status");
        break;
      case "user":
        groupedTickets = groupByUser(tickets, users);
        break;
      case "priority":
        groupedTickets = groupByField(tickets, "priority");
        break;
      default:
        groupedTickets = { allTickets: tickets };
        break;
    }

    for (const group in groupedTickets) {
      groupedTickets[group] = sortTickets(groupedTickets[group], sortBy);
    }

    return groupedTickets;
  };

  const groupByField = (tickets, field) => {
    return tickets.reduce((grouped, ticket) => {
      // if (field === "status") {
      //   grouped["completed"] = [];
      // }
      const key = ticket[field];
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
      if (field === "status") {
      }
      console.log("grouped", grouped);
      return grouped;
    }, {});
  };

  const groupByUser = (tickets, users) => {
    const userMap = users.reduce((map, user) => {
      map[user.id] = user.name;
      return map;
    }, {});

    return tickets.reduce((grouped, ticket) => {
      const userName = userMap[ticket.userId];
      if (!grouped[userName]) grouped[userName] = [];
      grouped[userName].push(ticket);
      return grouped;
    }, {});
  };

  const sortTickets = (tickets, sortBy) => {
    if (sortBy === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  // Example to handle ticket grouping and sorting
  const groupedAndSortedTickets = groupAndSortTickets(
    tickets,
    users,
    groupingOption,
    ordering
  );

  return (
    <>
      <nav className="navbar">
        {/* Button to show dropdown */}
        <button className="dropdown-btn " onClick={toggleDropdown}>
          <div className="icon-text-container">
            <HiAdjustmentsHorizontal />
            <>display</>
          </div>
        </button>

        {showDropdown && (
          <div className="dropdown-menu">
            {/* Grouping Dropdown */}
            <div className="dropdown-group">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={groupingOption}
                onChange={handleGrouping}
              >
                <option value="" disabled>
                  --Select an option--
                </option>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Ordering Dropdown */}
            <div className="dropdown-group">
              <label htmlFor="ordering">Ordering</label>
              <select id="ordering" value={ordering} onChange={handleOrdering}>
                <option value="" disabled>
                  --Select an option--
                </option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </nav>

      {/* Render grouped and sorted tickets in separate columns */}
      {groupingOption ? (
        <div className="main-body">
          {Object.keys(groupedAndSortedTickets).map((group) => (
            <div key={group}>
              <div className="heading">
                <div className="heading-left">
                  {groupingOption === "user" ? (
                    <img
                      className="card-userId"
                      src={getIcon(getUserIdByName(group))}
                      alt="group"
                    />
                  ) : (
                    <img src={getIcon(group)} alt="group" />
                  )}{" "}
                  {/* <img src={getIcon(group)} alt="group" /> */}
                  <h2>{group}</h2>
                  <div className="heading-count">{group.length}</div>
                </div>
                <div className="heading-right">
                  <img src={add} alt="" />
                  <img src={dotmenu} alt="" />
                </div>
              </div>
              {groupedAndSortedTickets[group].map((ticket) => (
                <>
                  {" "}
                  <Cardbox
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    tag={ticket.tag}
                    userId={ticket.userId}
                    status={ticket.status}
                    userImage={getIcon(ticket.userId)}
                    // priority={ticket.priority}
                    groupingOption={groupingOption}
                    statusimage={getIcon(ticket.status)}
                    priorityimage={getIcon(ticket.priority.toString())}
                  />
                  {/* <img src={ticket.status.toLowerCase()} alt={ticket.status} /> */}
                </>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="main-page-starting">
            Please Select A Display Grouping Option
          </div>
        </>
      )}
    </>
  );
}

export default Header;
