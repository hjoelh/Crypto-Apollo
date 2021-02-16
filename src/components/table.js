import React from "react";
import { FaMoneyCheckAlt, FaEthereum, FaBtc } from "react-icons/fa";

export default function Table({ content, loading, error, coin }) {
  const TableComponent = () => {
    return (
      <div className="tableContainer">
        {content?.map((item) => {
          return (
            <div className="tableContent" key={item.exchangeName}>
              <img src={item.image} alt="" />
              <p>
                <span>$</span>
                {item.price}
                <span> / {coin === "btc" ? <FaBtc /> : <FaEthereum />}</span>
              </p>
              <button type="button">
                Buy
                <FaMoneyCheckAlt />
              </button>
            </div>
          );
        })}

        {content?.length > 1 ? (
          <div className="bestPrice">
            <p>Best price!</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  if (loading)
    return (
      <div className="tableContainer">
        <h3 className="loading">Loading.....</h3>
        <TableComponent />
      </div>
    );

  if (error)
    return (
      <h2 style={{ textAlign: "center", paddingTop: "75px" }}>Error...</h2>
    );

  return <TableComponent />;
}
