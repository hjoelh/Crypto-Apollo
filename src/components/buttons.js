import React from "react";
import { FaEthereum, FaBtc } from "react-icons/fa";

const Button = () => {
  return (
    <div className="buttonContainer">
      {/* <button className='button1' type='button'><FaEthereum />eth</button>
      <button className='button1' type='button'><FaBtc />btc</button> */}

      <label class="radioDiv">
        <input id="eth" className="button1" type="radio" name="select"></input>
        <span className="button1">
          <FaEthereum className='icon' />
        </span>
      </label>

      <label class="radioDiv">
        <input id="btc" className="button1" type="radio" name="select"></input>
        <span className="button1">
          <FaBtc className='icon' />
        </span>
      </label>
    </div>
  );
};

export default Button;
