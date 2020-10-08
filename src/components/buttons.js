import React from "react";
import { FaEthereum, FaBtc } from "react-icons/fa";

export default function Button(props) {
  return (
    <div className="buttonContainer">
      {/* <button className='button1' type='button'><FaEthereum />eth</button>
      <button className='button1' type='button'><FaBtc />btc</button> */}

      <label className="radioDiv">
        <input id="eth" className="button1" type="radio" name="select" checked={props.btnState1} onChange={props.toggle}></input>
        <span className="button1">
          <FaEthereum className='icon' />
        </span>
      </label>

      <label className="radioDiv">
        <input id="btc" className="button1" type="radio" name="select" checked={props.btnState2} onChange={props.toggle}></input>
        <span className="button1">
          <FaBtc className='icon' />
        </span>
      </label>
    </div>
  );
};

