import React from "react";
import Button from "./components/buttons";
import Table from "./components/table";
import { gql, useQuery } from "@apollo/client";

export default function App() {
  const [coin, setCoin] = React.useState("btc");

  const GET_PRICES = gql`
    query GetPrices($coin: String!) {
      data(coin: $coin) {
        exchangeName
        price
        image
      }
    }
  `;

  const { loading, error, data, client } = useQuery(GET_PRICES, {
    variables: { coin },
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      const { data: raw } = data;
      const sorted = [...raw].sort((a, b) => a.price - b.price);

      client.writeQuery({
        query: GET_PRICES,
        variables: { coin },
        data: {
          data: sorted,
        },
      });
    },
  });

  return (
    <div className="main">
      <Button
        toggle={() => {
          if (coin === "eth") setCoin("btc");
          if (coin === "btc") setCoin("eth");
        }}
      />
      <Table content={data?.data} loading={loading} error={error} coin={coin} />
    </div>
  );
}
