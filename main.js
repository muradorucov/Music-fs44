const data = [
  {
    id: 1,
    title: "Jah Khalib - Медина",
    author: "Jah Khalib",
    src: "./files/audio/Jah Khalib - Медина.mp3",
    img: "./files/image/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Monica Belluci",
    author: "Malena",
    src: "./files/audio/Monica Belluci - Malena.mp3",
    img: "./files/image/monica.webp",
  },
  {
    id: 3,
    title: "Hani Bes (Official Video Klip 2021 )",
    author: "Mehman Huseynov",
    src: "./files/audio/Mehman Huseynov- Hani Bes (Official Video Klip 2021 ).mp3",
    img: "./files/image/hanibes.jpg"
  },
  {
    id: 4,
    title: "Namiq Qaracuxurlu",
    author: "Cavanligimin Ogrusu",
    src: "./files/audio/namiq.mp3",
    img: "./files/image/namiq).jpg",
  },
  {
    id: 5,
    title: "Savai",
    author: "Dark Life",
    src: "./files/audio/Savai - Dark Life (Instrumental).mp3",
    img: "./files/image/darklife.jpg",
  },
  {
    id: 6,
    title: "SHOUSE",
    author: "Love Tonight",
    src: "./files/audio/Lovetonight.mp3",
    img: "./files/image/LoveTonight.png",
  },
  {
    id: 7,
    title: "Tom Odell",
    author: "Another Love",
    src: "./files/audio/Tom Odell - Another Love (Official Video).mp3",
    img: "./files/image/another.jpg",
  },
  {
    id: 8,
    title: "Xpert",
    author: "Və bir də",
    src: "./files/audio/Xpert - Və bir də (Official Music Video).mp3",
    img: "./files/image/expert).jpg",
  },
]


const audio = document.querySelector("audio");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const marquee = document.querySelector(".music-info-active");
const image = document.querySelector(".music-image");
const cover = document.querySelector(".cover");
const musicList = document.querySelector(".music-list");
const scrollbar = document.querySelector("#scrollbar");
const currentTimeElem = document.querySelector(".currentTime")
let index = 0;


audio.src = data[index].src;
marquee.innerText = data[index].title;
image.src = data[index].img;
marquee.stop();
let lastDuration;



data.forEach((music, i) => {
  musicList.innerHTML += `
      <div class="music" onclick="selectMusic(this,${i})">
        <img src="${music.img}">
        <div class="info">
          <p title="${music.author}">${music.author.slice(0, 10)}...</p>
          <p title="${music.title}">${music.title.slice(0, 10)}...</p>
          <p class="time">04 : 05 </p>
        </div>
      </div>
`
})
activeMusic();


playBtn.addEventListener("click", () => {
  musicPlay();
  audio.currentTime = lastDuration;
})

pauseBtn.addEventListener("click", () => {
  audio.pause();
  cover.classList.add("animation-pause")
  marquee.stop();
  // playBtn.disabled = false;
  // pauseBtn.disabled = true;
})

prevBtn.addEventListener("click", () => {
  if (index === 0) {
    index = data.length - 1
  } else {
    index--;
  }
  musicPlay();
  activeMusic();
  scrollbar.value = 0;
})

nextBtn.addEventListener("click", () => {
  if (index === data.length - 1) {
    index = 0
  }
  else {
    index++;
  }
  musicPlay();
  activeMusic();
  scrollbar.value = 0;
})

function musicPlay() {
  audio.src = data[index].src;
  marquee.innerText = data[index].title;
  image.src = data[index].img;
  cover.classList.remove("animation-pause");
  marquee.stop();
  marquee.start();
  audio.play();
}


audio.addEventListener("loadedmetadata", () => {
  scrollbar.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
  let time = audio.currentTime;
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  currentTimeElem.innerHTML = `${minute < 10 ? "0" + minute
    : minute}: ${second < 10 ? "0" + second : second}`
})

audio.addEventListener("ended", () => {
  if (index === data.length - 1) {
    index = 0
  }
  else {
    index++;
  }
  musicPlay();
  activeMusic();
  scrollbar.value = 0;
})

scrollbar.addEventListener("input", () => {
  lastDuration = scrollbar.value;
  audio.currentTime = scrollbar.value;
})

function selectMusic(musicDiv, i) {
  const musics = document.querySelectorAll(".music");
  musics.forEach(item => item.classList.remove("music-active"))
  musicDiv.classList.add("music-active");
  index = i;
  scrollbar.value = 0;
  musicPlay()
}

function activeMusic() {
  const musics = document.querySelectorAll(".music");
  musics.forEach(item => item.classList.remove("music-active"))
  musics.forEach((item, i) => {
    i === index && item.classList.add("music-active")
  })
}




