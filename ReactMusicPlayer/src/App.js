import "./styles/app.scss";
import React, { useState, useRef } from "react";
import Player from "./Components/Player";
import Song from "./Components/Song";
import Library from "./Components/Library";
import Nav from "./Components/Nav";
// Import hard coded data
import data from "./data";
function App() {
  const audioReference = useRef(null);
  const [songs, setSongs] = useState(data());
  //grab first song as the default current song
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  // song Information
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  // library button clicked or not
  const [librarystatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate percentage for animation of input type range

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };
  // console.log(isPlaying);

  return (
    <div className={`App ${librarystatus ? "library-active" : ""}`}>
      <Nav librarystatus={librarystatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioReference={audioReference}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />

      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioReference={audioReference}
        isPlaying={isPlaying}
        setSongs={setSongs}
        librarystatus={librarystatus}
        setLibraryStatus={setLibraryStatus}
      />

      <audio
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.source}
        ref={audioReference}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
}

export default App;
