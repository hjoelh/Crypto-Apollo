import React from "react";
import Button from "./components/buttons";
import Table from "./components/table";
// import Particles from "react-tsparticles";
// import { options } from "./particles";

export default function App() {
  const [prices, setPrices] = React.useState([]);
  const [btnState1, setBtnState1] = React.useState(true); //eth
  const [btnState2, setBtnState2] = React.useState(false); //btc
  const [loaded, setLoaded] = React.useState(true);

  const coinbase = async (coin) => {
    // 'eth' / 'btc
    const img =
      "https://cryptoradar.co/storage/brokers/VIRZoKjLh1GpTtzktEJ1VnpyEBDYGSWqZLyp1YTf.optimized.png";
    let raw = await fetch(
      `https://api.coinbase.com/v2/prices/${coin}-usd/spot`
    );
    let json = await raw.json();
    let eth = await json.data.amount;
    return {
      exchange: "coinbase",
      price: eth,
      image: img,
    };
  };

  const coinbasePro = async (coin) => {
    const img = "https://i.imgur.com/F8iNu5I.png";
    let raw = await fetch(
      `https://api.pro.coinbase.com/products/${coin}-usd/ticker`
    );
    let json = await raw.json();
    let eth = await json.ask;
    return {
      exchange: "coinbase pro",
      price: eth,
      image: img,
    };
  };

  const gemini = async (coin) => {
    const img =
      "https://cryptoradar.co/storage/brokers/October2017/gemini.optimized.png";
    let raw = await fetch(`https://api.gemini.com/v2/ticker/${coin}usd`);
    let json = await raw.json();
    let ethBid = await json.bid;
    let ethAsk = await json.ask;
    return {
      exchange: "gemini",
      price: ethAsk,
      image: img,
    };
  };

  const kraken = async (coin) => {
    const coinUpper = coin.toUpperCase();
    const img =
      "https://cryptoradar.co/storage/brokers/teOdi9fCOU4kQCF6ceZUoVbJxjXYwTmzxWApkvOf.optimized.png";
    let raw = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.kraken.com/0/public/Ticker?pair=${coinUpper}USD`
    );

    if (coin === "eth") {
      let json = await raw.json();
      let ethAskRaw = await +json.result.XETHZUSD.a[0];
      let ethAsk = await ethAskRaw.toFixed(2);
      return {
        exchange: "kraken",
        price: ethAsk,
        image: img,
      };
    } else {
      let json = await raw.json();
      let ethAskRaw = await +json.result.XXBTZUSD.a[0];
      let ethAsk = await ethAskRaw.toFixed(2);
      return {
        exchange: "kraken",
        price: ethAsk,
        image: img,
      };
    }
  };

  const bitstamp = async (coin) => {
    const img = "https://i.imgur.com/SzVDBNQ.png";
    let raw = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/${coin}usd/`
    );
    let json = await raw.json();
    let ethBid = await json.bid;
    let ethAsk = await json.ask;
    return {
      exchange: "bitstamp",
      price: ethAsk,
      image: img,
    };
  };

  const cex = async (coin) => {
    const coinUpper = coin.toUpperCase();
    const img = "https://i.imgur.com/m5KDLuV.png";
    let raw = await fetch(
      `https://cors-anywhere.herokuapp.com/https://cex.io/api/ticker/${coinUpper}/USD`
    );
    let json = await raw.json();
  
    let ethBid = await json.bid;
    let ethAsk = await json.ask;
    return {
      exchange: "cex",
      price: ethAsk,
      image: img,
    };
  };

  const bitfinex = async (coin) => {
    const coinUpper = coin.toUpperCase();
    const img = "https://i.imgur.com/mGx8IKV.png";
    let raw = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/ticker/t${coinUpper}USD`
    );
    let json = await raw.json();
     let ethAsk = await json[2];
    return {
      exchange: "bitfinex",
      price: ethAsk,
      image: img,
    };
  };



  


  const fetchT = (coin) => {
    const sort = (array) => {
      const compareFunc = function (a, b) {
        return a.price - b.price;
      };

      if (array[0].price.length > 7) {
        array
          .sort(compareFunc)
          .map((e) => e.price = parseInt(e.price).toLocaleString());
      }

      return array.sort(compareFunc);
    };

    const initialState = (coin) =>
      Promise.all([
        coinbase(coin),
        gemini(coin),
        kraken(coin),
        bitstamp(coin),
        coinbasePro(coin),
        cex(coin),
        bitfinex(coin)
      ]).then((res) => {
        setPrices(sort(res));
        setLoaded(!loaded);
      });
    initialState(coin);
    //  setInterval(initialState, 30000);
  };

  React.useEffect(() => {
    btnState1 ? fetchT("eth") : fetchT("btc");
  }, [btnState1]);

  const onChange = () => {
    setBtnState1(!btnState1);
    setBtnState2(!btnState2);
  };

  return (
    // <div className="background">
    //     <Particles id="tsparticles" options={options} />
    <div className="main">
      <Button btnState1={btnState1} btnState2={btnState2} toggle={onChange} />
      <Table content={prices} btnState1={btnState1} loaded={loaded} />
    </div>
    // </div>
  );
}
