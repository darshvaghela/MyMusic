import React, { useEffect, useState } from "react";
import { gql, useQuery } from "urql";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";

interface DataType {
  key: number;
  songName: string;
  artist: string;
  movieName: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "songName",
    key: "songName",
  },
  {
    title: "Artist",
    dataIndex: "artist",
    key: "artist",
  },
  {
    title: "MovieName",
    dataIndex: "movieName",
    key: "movieName",
  },
];

const MyTable = (props: any) => {
  const [tableData, setTableData] = useState<DataType[]>([]);

  useEffect(() => {
    props?.data?.song.map((item: any) => {
      setTableData((prev) => [
        ...prev,
        {
          key: item.id,
          songName: item.name,
          artist: item.artist,
          movieName: item.moviename,
        },
      ]);
    });
  }, [props]);

  return (
    <>
      <div>
        {tableData?.length > 0 && (
          <Table columns={columns} dataSource={tableData} />
        )}
      </div>
    </>
  );
};

export default MyTable;
