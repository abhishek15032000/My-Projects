import React from "react";
import LibrarySong from "./LibrarySong";
const Library = ({
  songs,
  setCurrentSong,
  audioReference,
  isPlaying,
  setSongs,
  librarystatus,
}) => {
  return (
    <div className={`library ${librarystatus ? "active-library" : ""}`}>
      <div className="library-songs">
        <h2>Library</h2>
        {songs.map((song) => {
          return (
            <LibrarySong
              songs={songs}
              setCurrentSong={setCurrentSong}
              key={song.id}
              song={song}
              id={song.id}
              audioReference={audioReference}
              isPlaying={isPlaying}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
