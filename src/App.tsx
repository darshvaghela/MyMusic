import React from "react";
import MyTable from "./MyTable";
import { gql, useQuery } from "urql";

const getSong = gql`
  query {
    song {
      id
      name
      artist
      moviename
    }
  }
`;

function App() {
  const [result, reexecuteQuery] = useQuery({
    query: getSong,
  });
  const { data, fetching, error } = result;
  return (
    <>
      <MyTable data={data} />
    </>
  );
}

export default App;
