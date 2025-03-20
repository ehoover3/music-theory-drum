import React from "react";
import MusicInstrument from "./MusicInstrument.jsx";

function UserInteraction({ addDot }) {
  return (
    <div>
      <MusicInstrument addDot={addDot} />
    </div>
  );
}

export default UserInteraction;
