import React from "react";
import Header from "./Header";

const End = hits => {
  let hitsCounter = hits.length;
  return (
    <>
      <Header />

      <div className="end-main">{hitsCounter}</div>
    </>
  );
};

export default End;
