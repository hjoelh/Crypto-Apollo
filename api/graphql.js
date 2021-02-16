
const { ApolloServer, gql } = require("apollo-server-lambda")
const fetch = require("node-fetch");

const typeDefs = gql`
  type Exchange {
    exchangeName: String
    price: String
    image: String
  }
  type Query {
    data(coin: String!): [Exchange]
  }
`;

const resolvers = {
  Query: {
    data: (parent, { coin }, context, info) => [
      {
        exchangeName: () => "Coinbase",
        price: async () => {
          const raw = await fetch(
            `https://api.coinbase.com/v2/prices/${coin}-usd/spot`
          );
          const json = await raw.json();
          return json.data.amount;
        },
        image: () =>
          "https://cryptoradar.co/storage/brokers/VIRZoKjLh1GpTtzktEJ1VnpyEBDYGSWqZLyp1YTf.optimized.png",
      },

      {
        exchangeName: () => "Coinbase Pro",
        price: async () => {
          const raw = await fetch(
            `https://api.pro.coinbase.com/products/${coin}-usd/ticker`
          );
          const json = await raw.json();
          return json.ask;
        },
        image: () => "https://i.imgur.com/F8iNu5I.png",
      },

      {
        exchangeName: () => "Gemini",
        price: async () => {
          const raw = await fetch(
            `https://api.gemini.com/v2/ticker/${coin}usd`
          );
          const json = await raw.json();
          return json.ask;
        },
        image: () =>
          "https://cryptoradar.co/storage/brokers/October2017/gemini.optimized.png",
      },

      {
        exchangeName: () => "Kraken",
        price: async () => {
          const raw = await fetch(
            `https://api.kraken.com/0/public/Ticker?pair=${coin.toUpperCase()}USD`
          );
          const json = await raw.json();

          if (coin === "eth") {
            const result = +json.result.XETHZUSD.a[0];
            return result.toFixed(2);
          }

          if (coin === "btc") {
            const result = +json.result.XXBTZUSD.a[0];
            return result.toFixed(2);
          }
        },
        image: () =>
          "https://cryptoradar.co/storage/brokers/teOdi9fCOU4kQCF6ceZUoVbJxjXYwTmzxWApkvOf.optimized.png",
      },

      {
        exchangeName: () => "Bitstamp",
        price: async () => {
          const raw = await fetch(
            `https://www.bitstamp.net/api/v2/ticker/${coin}usd/`
          );
          const json = await raw.json();
          return json.ask;
        },
        image: () => "https://i.imgur.com/SzVDBNQ.png",
      },

      {
        exchangeName: () => "Cex",
        price: async () => {
          const raw = await fetch(
            `https://cex.io/api/ticker/${coin.toUpperCase()}/USD`
          );
          const json = await raw.json();
          return json.ask;
        },
        image: () => "https://i.imgur.com/m5KDLuV.png",
      },

      {
        exchangeName: () => "Bitfinex",
        price: async () => {
          const raw = await fetch(
            `https://api-pub.bitfinex.com/v2/ticker/t${coin.toUpperCase()}USD`
          );
          const json = await raw.json();
          return json[2];
        },
        image: () => "https://i.imgur.com/mGx8IKV.png",
      },
    ],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

if (isProduction) {
  exports.handler = server.createHandler();
}

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
