import React from "react";
const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioReference,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    // showing it in the ui when song is selected from the library
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentSong(selectedSong[0]);
    //  audioReference.current.play();
    // check if song is playing

    // change state to active which is being played
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    if (isPlaying) {
      audioReference.current.play();
    }
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
