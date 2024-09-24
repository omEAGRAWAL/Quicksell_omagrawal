import React from "react";
import "./sd.css";
import { GoDotFill } from "react-icons/go";

const Card = (props) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-id">{props.id}</div>
        <div className="card-userId">
          {props.groupingOption === "user" ? (
            <></>
          ) : (
            <img
              src={props.userImage} // Get the correct user image
              alt="User Avatar"
              className="avatar"
            />
          )}
        </div>
      </div>

      <div className="card-title">
        <div className="card-title-status">
          {props.groupingOption === "status" ? (
            <></>
          ) : (
            <img src={props.statusimage} alt="Status" className="status-ic" />
          )}
        </div>
        <div className="card-title-text">
          <h3>{props.title}</h3>
        </div>
      </div>

      <div className="card-footer">
        {props.groupingOption === "priority" ? (
          <></>
        ) : (
          <img
            src={props.priorityimage} // Get the correct status icon//PRIORITY ICON
            // alt="{${props.statusText} Icon}"
            alt="Priority Icon"
            className="status-icon"
          />
        )}
        <div className="card-tag">
          <div>
            <GoDotFill />
          </div>
          {!props.tag ?<></>: <div>{props.tag}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
