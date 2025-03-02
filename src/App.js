import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import StaffLine from "./components/StaffLine";
import Drum from "./components/Drum";
import GameControls from "./components/GameControls";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [tempo, setTempo] = useState(80); // BPM

  // Sheet music notation - each object represents a note
  // position is in percentage of the staff width
  const sheetMusic = [
    { id: 1, position: 20, type: "quarter" },
    { id: 2, position: 30, type: "quarter" },
    { id: 3, position: 40, type: "quarter" },
    { id: 4, position: 50, type: "quarter" },
    { id: 5, position: 60, type: "eighth" },
    { id: 6, position: 65, type: "eighth" },
    { id: 7, position: 70, type: "quarter" },
    { id: 8, position: 80, type: "quarter" },
    { id: 9, position: 90, type: "quarter" },
  ];

  // Reference to hold the animation frame
  const animationRef = useRef(null);
  // Reference to store the last timestamp
  const lastTimeRef = useRef(0);
  // Speed of playhead movement (percentage per second)
  const playheadSpeed = tempo / 15; // Adjust this for desired speed

  // Animation function for the playhead
  const animate = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Update playhead position
    setPlayheadPosition((prev) => {
      const newPosition = prev + (playheadSpeed * deltaTime) / 1000;
      if (newPosition > 100) {
        // End of staff reached
        setIsPlaying(false);
        return 0;
      }
      return newPosition;
    });

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Start or stop the game
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Handle drum hit
  const handleDrumHit = () => {
    if (!isPlaying) return;

    // Find the closest note to the playhead
    const closestNote = sheetMusic.reduce(
      (closest, note) => {
        const distance = Math.abs(note.position - playheadPosition);
        if (distance < Math.abs(closest.position - playheadPosition)) {
          return note;
        }
        return closest;
      },
      { position: -Infinity }
    );

    // Check if hit is within the margin of error (5% of staff width)
    const hitDistance = Math.abs(closestNote.position - playheadPosition);

    if (hitDistance <= 5) {
      // Perfect hit
      setScore((prev) => prev + 100);
      setFeedback("Perfect!");
    } else if (hitDistance <= 10) {
      // Good hit
      setScore((prev) => prev + 50);
      setFeedback("Good!");
    } else if (hitDistance <= 15) {
      // Okay hit
      setScore((prev) => prev + 25);
      setFeedback("Okay");
    } else {
      // Miss
      setFeedback("Miss");
    }

    // Clear feedback after 1 second
    setTimeout(() => {
      setFeedback("");
    }, 1000);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!isPlaying) {
      // Reset playhead position when starting
      setPlayheadPosition(0);
    }
    setIsPlaying(!isPlaying);
  };

  // Reset the game
  const resetGame = () => {
    setIsPlaying(false);
    setPlayheadPosition(0);
    setScore(0);
    setFeedback("");
  };

  // Handle tempo change
  const handleTempoChange = (newTempo) => {
    setTempo(newTempo);
  };

  return (
    <div className='app'>
      <h1>Percussion Rhythm Game</h1>

      <div className='game-container'>
        <div className='staff-container'>
          <StaffLine sheetMusic={sheetMusic} playheadPosition={playheadPosition} />
        </div>

        <div className='controls-section'>
          <div className='score-display'>
            <h2>Score: {score}</h2>
            <div className='feedback'>{feedback}</div>
          </div>

          <Drum onHit={handleDrumHit} />

          <GameControls isPlaying={isPlaying} onTogglePlay={togglePlay} onReset={resetGame} tempo={tempo} onTempoChange={handleTempoChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
