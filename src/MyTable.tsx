import React, { useEffect, useState } from "react";
import { gql, useQuery } from "urql";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Pagination } from "antd";

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const offset = (page - 1) * 5;

  const getSong = gql`
  query {
    song(limit: ${pageSize.toString()}, offset: ${offset.toString()} ) {
      id
      name
      artist
      moviename
    }
    song_aggregate {
      aggregate {
        count
      }
    }
  }
`;

  const [songResult, reexecuteQuery] = useQuery({
    query: getSong,
  });

  const songData = songResult?.data;
  const totalSongs = songResult?.data?.song_aggregate?.aggregate.count;

  const handleOnPageChange = (newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (tableData.length > 0) {
      setTableData([]);
    }
    songData?.song.map((item: any) => {
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
  }, [songData, page]);
  return (
    <>
      <div>
        {tableData?.length > 0 && (
          <>
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
            <div style={{ float: "right", marginTop: "20px" }}>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={totalSongs}
                onChange={handleOnPageChange}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyTable;
