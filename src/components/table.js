import React from "react";
import { FaMoneyCheckAlt, FaEthereum, FaBtc} from "react-icons/fa";

const Table = (props) => {
  return (
    <div className="tableContainer">
      {props.content.map((item) => {
        return (
          <div className="tableContent">
            <img src={item.image} />
            <p><span>$</span>{item.price}<span> / <FaEthereum /></span></p>
            <button type="button">Buy<FaMoneyCheckAlt /></button>
          </div>);})}
    </div>
  );
};

export default Table;
