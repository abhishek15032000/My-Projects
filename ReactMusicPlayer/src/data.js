import { v4 as uuidv4 } from "uuid";

//returns array of objects (data)
function chillHop() {
  return [
    {
      name: "Beaver Creek",
      cover:
        "https://i1.sndcdn.com/artworks-Wb77clyfN6CC1O4P-VrJNaQ-t500x500.jpg",
      artist: "Aso,Middle School ,Aviino",
      source: `https://mp3.chillhop.com/serve.php/?mp3=10075`,
      id: uuidv4(),
      color: ["#BC333A", "#F2E980"],
      active: false,
    },
    {
      name: "Daylight",
      cover:
        "https://chillhop.com/wp-content/uploads/2023/02/71374d07888a8b1b3fbef53b82d283f53209cc1a-1024x1024.jpg",
      artist: "Aiguille",
      source: `https://mp3.chillhop.com/serve.php/?mp3=10076`,
      id: uuidv4(),
      color: ["#EE808B", "#935397"],
      active: false,
    },
    {
      name: "Keep Going",
      cover:
        "https://chillhop.com/wp-content/uploads/2022/08/113a9b73235cab31646ef0059864aec70e793dd2-1024x1024.jpg",
      artist: "Sworn",
      source: `https://mp3.chillhop.com/serve.php/?mp3=10077`,
      id: uuidv4(),
      color: ["#CCBB99", "#73A081"],
      active: false,
    },
    {
      name: "Nightfall",
      cover:
        "https://chillhop.com/wp-content/uploads/2021/12/754c5a4edf9d3bb338dfe89062760f22b7aaec70-1024x1024.jpg",
      artist: "Alguille",
      source: `https://mp3.chillhop.com/serve.php/?mp3=10078`,
      id: uuidv4(),
      color: ["#B97C51", "#EBF3FB"],
      active: false,
    },
  ];
}

export default chillHop;
