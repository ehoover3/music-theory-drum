import React from "react";

function Debug({ count, measure, progressBar }) {
  return (
    <div>
      <div>count: {count}</div>
      <div>measure: {measure}</div>
      <div>progress bar: {progressBar}</div>
    </div>
  );
}

export default Debug;
