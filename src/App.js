import React from "react";
import Button from "./components/buttons";
import Table from "./components/table";
// import Particles from "react-tsparticles";
// import { options } from "./particles";

export default function App() {
  const [prices, setPrices] = React.useState([
    {
      exchange: "coinbase",
      price: "400",
      image:
        "https://cryptoradar.co/storage/brokers/VIRZoKjLh1GpTtzktEJ1VnpyEBDYGSWqZLyp1YTf.optimized.png",
    },
    {
      exchange: "gemini",
      price: "256",
      image:
        "https://cryptoradar.co/storage/brokers/October2017/gemini.optimized.png",
    },
    {
      exchange: "gemini",
      price: "453",
      image:
        "https://i.imgur.com/F8iNu5I.png",
    },
    {
      exchange: "gemini",
      price: "256",
      image:
        "https://cryptoradar.co/storage/brokers/teOdi9fCOU4kQCF6ceZUoVbJxjXYwTmzxWApkvOf.optimized.png",
    }
  
]);

  const coinbase = async () => {
    const img =
      "https://cryptoradar.co/storage/brokers/VIRZoKjLh1GpTtzktEJ1VnpyEBDYGSWqZLyp1YTf.optimized.png";
    let raw = await fetch(`https://api.coinbase.com/v2/prices/eth-usd/spot`);
    let json = await raw.json();
    let eth = await json.data.amount;
    return {
      exchange: "coinbase",
      price: eth,
      image: img,
    };
  };

  const coinbasePro = async () => {
    const img =
      "https://i.imgur.com/F8iNu5I.png";
    let raw = await fetch(`https://api.pro.coinbase.com/products/eth-usd/ticker`);
    let json = await raw.json();
    let eth = await json.ask;
    return {
      exchange: "coinbase pro",
      price: eth,
      image: img,
    };
  };

  const gemini = async () => {
    const img =
      "https://cryptoradar.co/storage/brokers/October2017/gemini.optimized.png";
    let raw = await fetch("https://api.gemini.com/v2/ticker/ethusd");
    let json = await raw.json();
    let ethBid = await json.bid;
    let ethAsk = await json.ask;
    return {
      exchange: "gemini",
      price: ethAsk,
      image: img,
    };
  };

  const kraken = async () => {
    const img =
      "https://cryptoradar.co/storage/brokers/teOdi9fCOU4kQCF6ceZUoVbJxjXYwTmzxWApkvOf.optimized.png";
    let raw = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.kraken.com/0/public/Ticker?pair=ETHUSD"
    );
    let json = await raw.json();
    let ethAskRaw = await +json.result.XETHZUSD.a[0];
    let ethAsk = await ethAskRaw.toFixed(2);

    return {
      exchange: "kraken",
      price: ethAsk,
      image: img,
    };
  };

  const bitstamp = async () => {
    const img =
      "https://i.imgur.com/SzVDBNQ.png";
    let raw = await fetch("https://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/ethusd/");
    let json = await raw.json();
    let ethBid = await json.bid;
    let ethAsk = await json.ask;
    return {
      exchange: "bitstamp",
      price: ethAsk,
      image: img,
    };
  };


  const fetchT = () => {
    const sort = (array) => {
      const compareFunc = function (a, b) {
        return a.price - b.price;
      };
      return array.sort(compareFunc);
    };

    const initialState = () =>
      Promise.all([coinbase(), gemini(), kraken(), bitstamp(), coinbasePro()]).then((res) =>
        setPrices(sort(res))
      );
    initialState();
    setInterval(initialState, 30000);
  };

  //  React.useEffect(() => {
  //    fetchT()
  //  }, [])

  return (
    // <div className="background">
    //     <Particles id="tsparticles" options={options} />
    <div className="main">
      <Button />
      <Table content={prices} />
    </div>
    // </div>
  );
}
