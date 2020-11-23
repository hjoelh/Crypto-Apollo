import React from "react";
import { FaMoneyCheckAlt, FaEthereum, FaBtc} from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

export default function Table(props) {

  const TableComponent = () => {
    return (
      <div className="tableContainer">

      {props.content?.map((item) => {
        return (
          <div className="tableContent" key={uuidv4()}>
            <img src={item.image} alt='' />
            <p>
              <span>$</span>
                {item.price}
              <span> / {props.coin === "btc" ? <FaBtc /> : <FaEthereum />}</span>
            </p>
            <button type="button">Buy<FaMoneyCheckAlt /></button>
          </div>);})}
  
          {props.content?.length > 1 ? 
          <div className="bestPrice">
            <p>Best price!</p>
          </div> : ''}
      </div>
    )
  };

  if (props.loading) return (
  <div className='tableContainer'>
    <h3 className="loading">
      Loading.....
    </h3>
    <TableComponent />
  </div>
  );

  
  if (props.error) return (
    <h2 style={{textAlign: 'center', paddingTop: '75px'}}>
      Error... 
    </h2>
  );

  return (
    <TableComponent />
  );
  
};
