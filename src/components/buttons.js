import React from "react";
import { FaEthereum, FaBtc } from "react-icons/fa";

export default function Button(props) {
  return (
    <div className="buttonContainer">
      <label className="radioDiv">
        <input
          id="eth"
          className="button1"
          type="radio"
          name="select"
          onChange={props.toggle}
        ></input>
        <div className="slider"></div>
        <span className="button1">
          <FaEthereum className="icon" />
        </span>
      </label>

      <label className="radioDiv">
        <input
          id="btc"
          className="button1"
          type="radio"
          name="select"
          onChange={props.toggle}
        ></input>
        <span className="button1">
          <FaBtc className="icon" />
        </span>
      </label>
    </div>
  );
}
