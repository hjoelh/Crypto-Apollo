import React from "react";
import { FaMoneyCheckAlt, FaEthereum, FaBtc} from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

export default function Table(props) {
  return (
    <div className="tableContainer">
      {props.content.map((item) => {
        return (
          <div className="tableContent" key={uuidv4()}>
            <img src={item.image} alt='' />
            <p><span>$</span>{item.price}<span> / {props.loaded ? <FaBtc /> : <FaEthereum />}</span></p>
            <button type="button">Buy<FaMoneyCheckAlt /></button>
          </div>);})}
    </div>
  );
};
