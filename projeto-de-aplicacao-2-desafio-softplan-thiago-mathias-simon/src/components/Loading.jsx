import React from 'react';
import ReactLoading from "react-loading"

export default function Loading() {
  return (
    <div id="loading">
      <div id="divLoading">
        <ReactLoading type="spinningBubbles" color="#212121" />
      </div>
    </div>
  )
}
