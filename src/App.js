import React from "react";
import Button from "./components/buttons";
import Table from "./components/table";
import { gql, useQuery } from "@apollo/client";

export default function App() {
  const [coinType, setCoinType] = React.useState("btc");

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
    variables: { coin: coinType },
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      const raw = data.data.map((e) => ({
        ...e,
      }));

      const sorted = raw.sort((a, b) => a.price - b.price);

      client.writeQuery({
        query: GET_PRICES,
        variables: { coin: coinType },
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
          if (coinType === "eth") setCoinType("btc");
          if (coinType === "btc") setCoinType("eth");
        }}
      />
      <Table
        content={data?.data}
        loading={loading}
        error={error}
        coin={coinType}
      />
    </div>
  );
}
