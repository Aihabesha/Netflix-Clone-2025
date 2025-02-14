import React from "react";
import Row from "../Row/Row";
import "./RowList.css";
import requests from "../../../Utils/requests";

function RowList() {
  return (
    <>
      <Row
        title="Only on Netflix"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />

      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />

      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} isLargeRow />

      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow
      />

      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        isLargeRow
      />

      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        isLargeRow
      />

      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        isLargeRow
      />

      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        isLargeRow
      />
    </>
  );
}

export default RowList;
