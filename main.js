let playLists = []


async function getTracksFromFolder(folderLink) {
  const apiUrl = "https://cloud-api.yandex.net/v1/disk/public/resources";
  
  try {
    const response = await fetch(`${apiUrl}?public_key=${encodeURIComponent(folderLink)}`);
    const data = await response.json();
    
    if (data._embedded && data._embedded.items) {
      return data._embedded.items
        .filter(item => item.media_type === "audio") // берём только аудио
        .map((item, i) => ({
          soundid: i,
          playerSoundId: crypto.randomUUID(),
          musicUrl: item.file, // прямая ссылка на mp3
          title: item.name.replace(".mp3", ""),
          artistName: "PromoDJ",
          musicUrlInResources: "",
          coverURL: null
        }));
    } else {
      return [];
    }
  } catch (err) {
    console.error("Ошибка при получении папки:", err.message);
    return [];
  }
}

// Пример использования
(async () => {
  const folderLink = "https://disk.yandex.ru/d/PQAcoNhqR92ukw"; // <-- твоя ссылка на папку
  const tracks = await getTracksFromFolder(folderLink);
 playLists = tracks
})();

var tokenKey = "accessToken";
var userFoto = "/_im_c09ca126-6ef6-4320-850f-9f8f72aad310.png"

let username
let password
let email

let userValid = [1]
let passwordValid = [1]
let emailValid = [1]
let chackBox = false
let emailBool = false
let chackBoxBool = false

let eMAILregister = false

let arreyCollectionPlocats = []
let arreyTopMusics = [1, 2, 3, 4, 5]

let volnaSounds = []
let boolVolna = false
let pageSound = 0
let sizeSound = 10

var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

const tach = () => openFullscreen()


let urlRegister = "https://risefy-music.ru/auth/sign-up"

let urlAvtorisation = "https://risefy-music.ru/auth/sign-in"


let urlRegistr

const stateUserPlayer = () => {
  if (!localStorage.getItem(tokenKey)) {
    document.getElementById("userInfo").style.display = "flex";
    document.querySelector(".auf-container").style.display = "none";
    
    document.querySelector('.box-flex-user').style.display = "none"
    
  } else {
    document.getElementById("userInfo").style.display = "none";
    document.querySelector(".auf-container").style.display = "block";
    
    document.querySelector('.box-flex-user').style.display = "block"
  }
}

stateUserPlayer()

let spinerRigister = (boolSpiner) => {
  if (boolSpiner) {
    document.querySelector('.spinerAuf').style.display = "flex"
  }
  
  if (!boolSpiner) {
    document.querySelector('.spinerAuf').style.display = "none"
  }
}



let spinerValidInput = () => {
  
  document.querySelector('.modalValidRegistration').style.display = "flex"
  
  
  setTimeout(() => {
    document.querySelector('.modalValidRegistration').style.display = "none"
  }, 5000)
}



const getUserAufObject = (nameUser, namePassword, userEmail, politic) => {
  
  
  
  let result
  
  
  if (emailBool) {
    let resultEmail = {
      "username": nameUser,
      "password": namePassword,
      "email": userEmail,
      "acceptedPolicy": politic
    }
    result = resultEmail
  }
  
  if (!emailBool) {
    let resultDiEmail = {
      "username": nameUser,
      "password": namePassword
    }
    result = resultDiEmail
  }
  
  
  //console.log(result)
  return result
}



document.getElementById("submitLogin").addEventListener("click", async e => {
  
  // console.log(userValid, passwordValid, chackBox)
  
  if (userValid.length < 6) {
    spinerValidInput()
    return
  }
  
  if (passwordValid.length < 6) {
    spinerValidInput()
    return
  }
  
  if (emailBool == true) {
    if (emailValid.length < 8) {
      spinerValidInput()
      return
    }
  }
  
  
  if (chackBoxBool == true) {
    if (chackBox == false) {
      spinerValidInput()
      return
    }
  }
  
  
  if (emailBool) {
    let emailST = emailValid.filter(x => x == '@')
    
    // console.log(emailST)
    
    if (emailST[0] !== '@' || emailST == undefined) {
      spinerValidInput()
      return
    }
    
  }
  
  e.preventDefault();
  
  spinerRigister(true)
  
  username = document.getElementById("user").value
  
  localStorage.setItem(username, username)
  
  password = document.getElementById("password").value
  
  email = document.getElementById("email").value
  
  const response = await fetch(urlRegistr, {
    method: 'POST',
    
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getUserAufObject(
      username,
      password,
      email,
      chackBox
    ))
  });
  
  
  if (response.status == 201) {
    tach()
    
    spinerRigister(false)
    
    
    if (eMAILregister == true) {
      
      const data = await response.json();
      
      // console.log(data)
      
      document.getElementById("userInfo").style.display = "flex";
      document.querySelector(".auf-container").style.display = "none";
      
      localStorage.setItem(tokenKey, data.token)
      
      
      sessionStorage.setItem(tokenKey, data.token)
      
      localStorage.setItem(userId, data.userId)
      sessionStorage.setItem(username, username)
      
      localStorage.setItem(username, username)
      
      sessionStorage.setItem(password, password)
    }
    if (eMAILregister == false) {
      
      
      document.querySelector('.eMAILRegister').style.display = "flex"
      
      setTimeout(() => {
        document.querySelector('.eMAILRegister').style.display = "none"
      }, 3000)
      
      getButtonAvtorization()
      
    }
    
  }
  else {
    
    spinerRigister(false)
    
    if (response.status = 403) {
      document.querySelector('.spinerAufAuf').style.display = "flex"
      
      setTimeout(() => {
        document.querySelector('.spinerAufAuf').style.display = "none"
      }, 3000)
    }
    
    
  }
});


const getBody = async () => {
  
  const token = sessionStorage.getItem(tokenKey);
  
  const response = await fetch("https://risefy-music.ru/auth/sign-in", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      "username": sessionStorage.getItem(username),
      "password": sessionStorage.getItem(password),
    })
  });
  
  if (response.ok === true) {
    const data = await response.json();
    alert(data.message);
  }
  else
    console.log("Status: ", response.status);
  
};

document.getElementById("logOut").addEventListener("click", e => {
  
  e.preventDefault();
  document.getElementById("userName").innerText = "";
  document.getElementById("userInfo").style.display = "none";
  document.querySelector(".auf-container").style.display = "block";
  sessionStorage.removeItem(tokenKey);
  localStorage.removeItem(tokenKey)
  
  
  document.getElementById('user').value = ""
  document.getElementById('password').value = ""
  document.getElementById('politic').value = "false"
});

const getButtonRegistr = () => {
  
  chackBoxBool = true
  chackBox = false
  emailBool = true
  eMAILregister = false
  
  
  urlRegistr = urlRegister
  
  document.querySelector('.box-flex-user').style.display = "block"
  
  document.querySelector('.email').style.display = "block"
  
  document.querySelector('.btn-auf').value = "Регистрация"
  
  document.querySelector('.backPassword').style.display = "none"
  
}

const getButtonAvtorization = () => {
  
  chackBoxBool = false
  chackBox = true
  emailBool = false
  email = null
  
  eMAILregister = true
  
  urlRegistr = urlAvtorisation
  
  document.querySelector('.box-flex-user').style.display = "none"
  
  document.querySelector('.email').style.display = "none"
  
  document.querySelector('.backPassword').style.display = "block"
  
  document.querySelector('.btn-auf').value = "войти"
  
}

getButtonAvtorization()

const getTextValidUser = document.getElementById('user')

getTextValidUser.addEventListener("input", (e) => {
  userValid = [...e.target.value]
  if ([...e.target.value].length < 8) {
    getTextValidUser.style.color = "red"
  } else {
    getTextValidUser.style.color = "grey"
  }
  
})


const getTextValidPassword = document.getElementById('password')

getTextValidPassword.addEventListener("input", (e) => {
  passwordValid = [...e.target.value]
  if ([...e.target.value].length < 8) {
    getTextValidPassword.style.color = "red"
  } else {
    getTextValidPassword.style.color = "grey"
  }
})

const getTextValidEmail = document.getElementById('email')

getTextValidEmail.addEventListener("input", (e) => {
  emailValid = [...e.target.value]
  if ([...e.target.value].length < 8) {
    getTextValidEmail.style.color = "red"
  } else {
    getTextValidEmail.style.color = "grey"
  }
})

const getChackBoxValidPassword = document.getElementById('politic')

getChackBoxValidPassword.addEventListener("input", (e) => {
  chackBox = e.target.value
})

const openPolitic = () => {
  document.querySelector('.modalPolitica').style.display = "block"
}

const closePolitics = () => {
  document.querySelector('.modalPolitica').style.display = "none"
}



let getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

let randomAudioAlbums = [
  album = {
    music: "music-from-tik-tok",
    text: "tiktok"
  },
  album = {
    music: "club",
    text: "club"
  },
  album = {
    music: "rock",
    text: "rock"
  },
  album = {
    music: "popular",
    text: "new"
  }
]


const startOMusik = () => {
  document.querySelector('.preloder').style = "display:none;"
  openFullscreen()
  
  
  let audioRandom = parseInt(getRandomArbitrary(0, 3))
  
  getAppList(randomAudioAlbums[audioRandom].music, randomAudioAlbums[audioRandom].text, 1)
}



let arrMapLists = [
  [],
  [],
  [],
  []
]









let phonePlaylist = []

let collectionTextState
let collectionTextText


const showFile = (input) => {
  
  let files = input.files
  
  for (var i = 0; i < files.length; i++) {
    
    phonePlaylist.push(
    {
      "soundid": i,
      "playerSoundId": "",
      "musicUrl": URL.createObjectURL(files[i]),
      "title": files[i].name,
      "artistName": "с телефона",
      "musicUrlInResources": "",
      "coverURL": true
    })
  }
}

document.querySelector('.PlayPause').innerHTML = ` <div class="playSound">&#10148;</div>`

let audio = new Audio()

audio.controlsList = "nodownload";

let numberTrack = 0

let rengeAudio = 0
let ren = document.querySelector('.range')
ren.value = 0
ren.min = 0

let pauseCange = false

const onCangeInput = (valueCange) => {
  if (pauseCange) {
    return
  }
  audio.currentTime = Number(valueCange)
  rengeAudio = Number(valueCange)
}

let boolPause
let audioCurentTime

let interval
let colorEculizerInterval

let SECONDS

let playSound = document.querySelector('.playSound')
playSound.addEventListener("click", () => {
  audioPlay()
})

let colorThief = new ColorThief();
colorThief.crossOrigin = 'Anonymous'
let img = new Image();
img.crossOrigin = 'Anonymous';

let getCollorsTif = (result) => {
  
  console.log(result)
  
  img.src = String(result)
  
  
  if (result == null || result == undefined || result == "") {
    getColorBody(result)
  } else {
    
    if (img.complete) {
      let t = async () => {
        let x = await String(colorThief.getColor(img, [10]));
        return x
      }
      
      t()
        .then((x) => getColorBody(x))
    } else {
      
      img.addEventListener('load', function() {
        let t = async () => {
          let x = await String(colorThief.getColor(img, [10]));
          return x
        }
        
        t()
          .then((x) => getColorBody(x))
        
   });
    }
  }
}



const audioPlay = () => {
  
  pauseCange = false
  // audio.src = ''
  window.stop()
  
  document.querySelector('.PlayPause').innerHTML = ` <div style="transform: rotate(90deg);" onclick="stopAudio()">	&#61;</div>`
  
  if (boolVolna == true) {
    
    document.querySelector('.app4').style = `background-image: url("${volnaSounds[numberTrack].coverMediumURL}");
      `
    
    document.querySelector('.nameSound').innerHTML = `
      ${volnaSounds[numberTrack].title}
      `
    
    document.querySelector('.nameUserSound').innerHTML = `
      ${volnaSounds[numberTrack].artistName}
      `
    
    document.querySelector('.volna').style = "border-left: solid 2px deeppink;border-right: solid 2px red;"
    
    audio = new Audio(volnaSounds[numberTrack].musicUrl)
    
    getCollorsTif(volnaSounds[numberTrack].coverMediumURL)
  }
  
  else {
    
    document.querySelector('.app4').style = `background-image: url("${playLists[numberTrack].coverMediumURL}");
              `
    
    document.querySelector('.nameSound').innerHTML = `
              ${playLists[numberTrack].title}
              `
    
    document.querySelector('.nameUserSound').innerHTML = `
              ${playLists[numberTrack].artistName}
              `
    
    document.querySelector('.volna').style = "border-left: none;border-right: none;"
    
    audio = new Audio(playLists[numberTrack].musicUrl)
    
    getCollorsTif(playLists[numberTrack].coverMediumURL)
  }
  
  
  
  audio.crossOrigin = "anonymous"
  audio.type = "audio/mp3"
  
  if (!boolPause) {
    ren.min = 0
    audio.duration = 0
  }
  
  if (boolPause) {
    audio.currentTime = audioCurentTime
  }
  
  let bollNexstTime = true
  
  audio.addEventListener("canplaythrough", () => {
    audio.play()
    bollNexstTime = false
  })
  
  
  
  onload(audio)
  
  interval = setInterval(() => {
    
    if (toTime(parseInt(audio.duration) - parseInt(audio.currentTime)) < SECONDS) {
      rengeAudio = rengeAudio + 1
      ren.value = rengeAudio
      ren.max = getMax(audio.duration)
      audioCurentTime = audio.currentTime
    }
    
    SECONDS = toTime(parseInt(audio.duration) - parseInt(audio.currentTime))
    
    document.querySelector('.time').innerHTML = toTime(parseInt(audio.duration) - parseInt(audio.currentTime))
    
    
    if (toTime(parseInt(audio.duration) - parseInt(audio.currentTime)) == "00:00:00" && bollNexstTime !== true) {
      nextAudio()
    }
  }, 1000)
  
  
}



const openEculizer = () => {
  document.querySelector('.eculizer-content').style = 'left: 0'
}

const closeEculizer = () => {
  document.querySelector('.eculizer-content').style = 'left: -500px'
}

let FILSTYLE = 'black'
let SHADOW = 'deeppink'


let analyzer, canvas, ctx, audioContext


function restartDraw() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

draw();
drawSpectrumEdges()
}

function onload(audio) {
  
  canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth
  canvas.height = 250
  ctx = canvas.getContext('2d')
  
  ctx.crossOrigin = "anonymous"
  
  audioContext = new AudioContext();
  
  audioContext.crossOrigin = "anonymous"
  
  analyzer = audioContext.createAnalyser()
  
  analyzer.fftSize = 2048
  
  var source = audioContext.createMediaElementSource(audio)
  source.connect(analyzer)
  analyzer.connect(audioContext.destination)
  
  //console.log(audioContext.state)
  
    // второй canvas
  canvas2 = document.getElementById('canvas2');
  canvas2.width = window.innerWidth;
  canvas2.height = 200;
  ctx2 = canvas2.getContext('2d');
  
  restartDraw(); // твоя основная визуализация
  drawSpectrumEdges(); // запускаем вторую
  
}

///////////

// === Anime.js подключи в HTML заранее ===
let animationId = null;
const bars = 96;
const lerp = (a, b, t) => a + (b - a) * t;
const tips = new Array(bars).fill(0);

const text = "RISEFY"; // фиксированный текст

function roundedRectPath(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

function draw() {
  animationId = requestAnimationFrame(draw);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const { width, height } = canvas;
  const scale = Math.min(width, height) / 800;
  
  // === BACKGROUND DARK GRADIENT ===
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "hsl(220, 40%, 10%)");
  gradient.addColorStop(0.5, "hsl(260, 30%, 8%)");
  gradient.addColorStop(1, "hsl(200, 30%, 5%)");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // === AUDIO ===
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  
  // === GRID: larger cells, proper rounded squares, per-cell color ===
  const gridSize = 140 * scale; // увеличенный размер квадрата
  const padding = 24 * scale; // увеличенный внутренний отступ
  const radius = 18 * scale; // закругление углов
  ctx.lineWidth = 2;
  
  let index = 0;
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      const innerX = x + padding;
      const innerY = y + padding;
      const innerW = gridSize - padding * 2;
      const innerH = gridSize - padding * 2;
      
      // если из-за padding квадрат выходит за пределы — пропускаем
      if (innerW <= 0 || innerH <= 0) continue;
      
      const value = spectrum[index % bars] || 0;
      const hue = 180 + value;
      const lightness = 40 + value / 4;
      
      ctx.strokeStyle = `hsl(${hue}, 80%, ${lightness}%)`;
      roundedRectPath(ctx, innerX, innerY, innerW, innerH, radius);
      ctx.stroke();
      
      index++;
    }
  }
  
  // === SPECTRUM BARS ===
  const barWidth = width / bars;
  const maxHeight = height * 0.6;
  
  for (let i = 0; i < bars; i++) {
    const value = spectrum[i] || 0;
    const barHeight = (value / 255) * maxHeight;
    const x = i * barWidth;
    const y = height - barHeight;
    
    // MAIN BAR
    ctx.fillStyle = `hsl(${180 + value}, 80%, ${40 + value / 4}%)`;
    ctx.fillRect(x, y, barWidth * 0.8, barHeight);
    
    // TIP BOUNCE
    const targetTipY = y - 10 * scale;
    tips[i] = lerp(tips[i], targetTipY, 0.2);
    if (tips[i] > targetTipY) tips[i] -= 1.5 * scale;
    
    ctx.fillStyle = `hsl(${200 + value}, 100%, 70%)`;
    ctx.fillRect(x, tips[i], barWidth * 0.8, 4 * scale);
  }
  
  // === TEXT ===
  const fontSize = 140 * scale;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  
  const baseY = height * 0.1;
  const letterSpacing = fontSize * 0.8;
  const totalWidth = letterSpacing * text.length;
  let startX = width / 2 - totalWidth / 2 + letterSpacing / 2;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const value = spectrum[i % bars] || 0;
    const hue = 180 + value;
    const lightness = 40 + value / 4;
    
    const jitterY = (value / 255) * 30 * scale;
    
    ctx.fillStyle = `hsl(${hue}, 80%, ${lightness}%)`;
    ctx.fillText(char, startX + i * letterSpacing, baseY + jitterY);
  }
}
/////////////


function drawSpectrumEdges() {
  requestAnimationFrame(drawSpectrumEdges);
  
  const spectrum = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(spectrum);
  
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  
  const { width, height } = canvas2;
  const edgeWidth = width * 0.2;
  const barCount = 128; // больше баров → тонкие
  const barHeight = height / barCount; // минимальное расстояние
  
  // коэффициент длины: длиннее к центру, короче к краям
  function lengthFactor(i, total) {
    const center = total / 2;
    const dist = Math.abs(i - center);
    const maxDist = center;
    return 0.5 + (1 - dist / maxDist) * 0.5;
  }
  
  function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  
  // === ЛЕВАЯ ЧАСТЬ ===
  for (let i = 0; i < barCount; i++) {
    const value = spectrum[i];
    const factor = lengthFactor(i, barCount);
    const barLength = (value / 255) * edgeWidth * factor;
    const y = i * barHeight;
    
    // основной бар
    ctx2.fillStyle = "black";
    ctx2.beginPath();
    roundRect(ctx2, 0, y, barLength, barHeight * 0.3, 3); // тонкие
    ctx2.fill();
    
    // тень на верхушке (светлый отблеск)
    ctx2.fillStyle = "rgba(0,0,0,0.2)";
    ctx2.fillRect(barLength - 4, y, 4, barHeight * 0.3);
  }
  
  // === ПРАВАЯ ЧАСТЬ ===
  for (let i = 0; i < barCount; i++) {
    const value = spectrum[i];
    const factor = lengthFactor(i, barCount);
    const barLength = (value / 255) * edgeWidth * factor;
    const y = i * barHeight;
    
    ctx2.fillStyle = "black";
    ctx2.beginPath();
    roundRect(ctx2, width - barLength, y, barLength, barHeight * 0.3, 3);
    ctx2.fill();
    
    // тень на верхушке
    ctx2.fillStyle = "rgba(0,0,0,0.2)";
    ctx2.fillRect(width - barLength, y, 4, barHeight * 0.3);
  }
}
//////////////

const stopAudio = () => {
  
  pauseCange = true
  
  clearInterval(interval)
  
  
  document.querySelector('.PlayPause').innerHTML = ` <div onclick="audioPlay()">	&#10148;</div>`
  
  audio.pause()
  boolPause = true
}


let nextSound = document.querySelector('.nextSound')
nextSound.addEventListener("click", () => {
  nextAudio()
})

const nextAudio = () => {
  
  audio.src = ""
  
  if (boolVolna == true) {
    
    // console.log("page", pageSound)
    //console.log("size", sizeSound)
    
    let numberArrVolna = Array.from(String(numberTrack), Number);
    
    // console.log(numberArrVolna)
    
    //  console.log(volnaSounds)
    
    if (numberArrVolna.length > 0 &&
      (numberArrVolna[1] == 0 || numberArrVolna[2] == 0)
    ) {
      pageSound = pageSound + 1
      
      // console.log(pageSound, sizeSound)
      getVolna(pageSound, sizeSound)
    }
  }
  
  
  
  clearInterval(interval)
  
  
  
  audio.pause()
  audio.currentTime = 0
  
  rengeAudio = 0
  
  if (numberTrack < playLists.length) {
    numberTrack = numberTrack + 1
  }
  
  if (numberTrack == playLists.length) {
    numberTrack = 0
  }
  
  audio.duration = 0
  ren.max = 0
  
  boolPause = false
  
  setTimeout(x => {
    
    audioPlay()
    
  }, 200)
  
  getDisplayList(textCurl)
  
}

let backSound = document.querySelector('.backSound')
backSound.addEventListener("click", () => {
  backAudio()
})


const backAudio = () => {
  
  audio.src = ""
  
  if (boolVolna == true) {
    
    // console.log("page", pageSound)
    //console.log("size", sizeSound)
    
    let numberArrVolna = Array.from(String(numberTrack), Number);
    
    //console.log(numberArrVolna)
    
    //console.log(volnaSounds)
    
    if (numberArrVolna.length > 10 &&
      (numberArrVolna[1] == 0 || numberArrVolna[2] == 0)
    ) {
      pageSound = pageSound - 1
      
      //console.log(pageSound, sizeSound)
      getVolna(pageSound, sizeSound)
    }
  }
  
  
  clearInterval(interval)
  
  
  audio.pause()
  audio.currentTime = 0
  
  rengeAudio = 0
  
  if (numberTrack >= 0) {
    numberTrack = numberTrack - 1
  }
  
  if (numberTrack < 0) {
    numberTrack = playLists.length - 1
  }
  
  audio.duration = 0
  ren.max = 0
  
  boolPause = false
  
  setTimeout(x => {
    
    audioPlay()
    
  }, 200)
  
  getDisplayList(textCurl)
}







const colorBGBody = [
{
  "colorFon": '189, 61, 130',
  "colorSVG": "./42543-e91e6312.svg",
},
{
  "colorFon": '43, 48, 63',
  "colorSVG": "./42543-e91e6312.svg",
},
{
  "colorFon": '43, 48, 63',
  "colorSVG": "./42543-e91e6312.svg",
},
{
  "colorFon": "177, 62, 77",
  "colorSVG": "./42543-e91e6312.svg"
},
{
  "colorFon": "255, 193, 7",
  "colorSVG": "./42543-e91e631.svg"
},
{
  "colorFon": "69, 90, 100",
  "colorSVG": "./42543-e91e6312.svg"
},
{
  "colorFon": "205, 220, 57",
  "colorSVG": "./42543-e91e63.svg"
},
{
  "colorFon": "69, 90, 100",
  "colorSVG": "./42543-e91e6312.svg"
},
{
  "colorFon": "185, 65, 125",
  "colorSVG": "./42543-e91e6312.svg",
},
{
  "colorFon": "0, 66, 58",
  "colorSVG": "./42543-e91e63.svg"
},
{
  "colorFon": "155,45,100",
  "colorSVG": "./42543-e91e6312.svg"
},
{
  "colorFon": "176, 196, 222",
  "colorSVG": "./42543-e91e63.svg"
},
{
  "colorFon": "69, 90, 100",
  "colorSVG": "./42543-e91e6312.svg"
},
{
  "colorFon": '10, 102, 194',
  "colorSVG": "./42543-e91e6312.svg",
},
{
  "colorFon": "0, 91, 30",
  "colorSVG": "./42543-e91e63.svg"
},
{
  "colorFon": "218, 85, 47",
  "colorSVG": "./42543-e91e63.svg"
},
{
  "colorFon": "0, 91, 30",
  "colorSVG": "./42543-e91e63.svg"
}]


let numberBGColor = 0

const getColorBody = (colorBO) => {
  
  console.log(colorBO)
  
  let colorBODY = ""
  
  if (colorBO == null || colorBO == undefined || colorBO == "") {
    colorBODY = colorBGBody[numberBGColor].colorFon
    
  } else {
    colorBODY = colorBO
    
  }
  
  console.log(colorBODY)
  
  document.querySelector('.app3').style = `
          background-image:url("${colorBGBody[numberBGColor].colorSVG}");
          `
  
//  document.getElementById//('userInfo').style = `background//-image: url("/PRoooooodddd (1//)/IMG_20251124_193944.jpg");
//background-size: cover;
//background-repeat: no-repeat;
//background-position: bottom;`
  //`
 // background: rgb//(${colorBGBody[numberBGColor]//.colorFon});
//  `
  
  FILSTYLE = `rgb(${colorBODY})`
  //colorBGBody[numberBGColor].colorFon
  //colorBGBody[numberBGColor].colorFon
  
  if (numberBGColor == colorBGBody.length - 1) {
    numberBGColor = 0
  } else {
    numberBGColor = numberBGColor + 1
  }
  
}


const toTime = (seconds) => {
  
  if (!seconds) {
    
    return "00:00:00"
  }
  
  
  
  var date = new Date(null);
  date.setSeconds(seconds);
  
  
  
  if (date.toISOString().substr(11, 8) == undefined) {
    return "00:00:00"
  } else {
    return date.toISOString().substr(11, 8);
  }
  
  
}

const getMax = (dur) => {
  result = parseInt(dur)
  return result
  
}

const openModal = () => {
  
  if (boolVolna == true) {
    boolVolna == false
    getAppList('music-from-tik-tok', 'tiktok', 1)
  }
  
  
  tach()
  
  document.querySelector('.modal').style = "display:flex;"
  
  document.querySelector('.mapList').innerHTML = playLists.map((x, index) => `

<div onclick="plyaList(${index})" class="list" style="box-shadow: 0 5px 10px -5px ${getBoxColorList(numberTrack, index)};">
    
   
    <div class="numberTextList" style="color:${getBoxColorList(numberTrack, index)};">${index + 1}</div>
    
  
  <div class="textListCenter">
      <div class="h ${getAnimationClass(numberTrack, index)}">${getMinText(x.title)}...</div>
      <p>${x.artistName}</p>
  </div>

  <div class="timeListText" style="color:${getBoxColorList(numberTrack, index)};">
    ${getStateAudio(numberTrack, index)}
  </div>
  
</div>

  `).join("")
}


const closeModal = () => {
  document.querySelector('.modal').style = "display:none;"
}


const closeOpenPlaylist = () => {
  closeCollrctions()
  openModal()
}

let textCurl

const plyaList = (indx) => {
  
  audio.src = ""
  
  
  rengeAudio = 0
  
  audio.currentTime = 0
  audioCurentTime = 0
  
  audio.duration = 0
  ren.max = 0
  
  boolPause == false
  
  numberTrack = indx
  stopAudio()
  
  setTimeout(x => {
    
    audioPlay(indx)
    
  }, 200)
  
  getDisplayList(textCurl)
  
  document.querySelector('.mapList').innerHTML = playLists.map((x, index) => `
  
  <div class="list" style="box-shadow: 0 5px 10px -5px ${getBoxColorList(numberTrack, index)};" onclick="plyaList(${index})">
      
      <div class="numberTextList" style="color:${getBoxColorList(numberTrack,index)};">${index + 1}</div>
      

    <div class="textListCenter">
        <div class="h ${getAnimationClass(numberTrack, index)}">${getMinText(x.title)}...</div>
        <p>${x.artistName}</p>
    </div>
  
    <div class="timeListText" style="color:${getBoxColorList(numberTrack, index)};">
      ${getStateAudio(numberTrack, index)}
    </div>
    
  </div>
    `).join("")
}


const alertAudio = () => {
  if (phonePlaylist.length == 0) {
    document.querySelector('.alert').style = "display:block;"
    
    setTimeout(() => {
      document.querySelector('.alert').style = "display:none;"
    }, 3000)
    
    return true
  }
}


let getMinText = (text) => {
  return text.slice(0, 35)
}

const openCollrctions = () => {
  
  if (boolVolna == true) {
    boolVolna == false
    getAppList('music-from-tik-tok', 'tiktok', 1)
  }
  //  
  
  
  document.querySelector('.moduleSTracks').style = "display:flex;"
  
}


const closeCollrctions = () => {
  document.querySelector('.moduleSTracks').style = "display:none;"
}

async function getFetchJSON(url) {
  
  let tokenLocal = localStorage.getItem(tokenKey)
  
  let headers = {
    "Accept": "application/json",
    "Authorization": "Bearer" + " " + tokenLocal
  };
  
  const response = await fetch(url, {
    headers
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  
  let json = await response.json()
  return json
}

const getMusicsApi = async (url, text) => {
  getLoading(true)
  getFetchJSON(url)
    .then(json => newMapArrs(json))
    .then(json => {
      getDisplayList(text)
      getLoading(false)
    })
    .catch(error => {
      error.message
      document.querySelector('.publick').innerHTML = `
        ${text}
        `
      getLoading(false)
      
      document.querySelector('.contentColumnState').innerHTML = `
      <div>неполадки с интернетом...
             </div>`
      
    })
}

let numberSLK = 0

const getAppList = (params, text, nu) => {
  
  boolVolna = false
  
  numberSLK = nu
  
  closeModalPlockat()
  
  
  collectionTextState = params
  collectionTextText = text
  
  if (text == 'TopMusic') {
    
    //console.log("text")
    
    getMusicsApi(
      `https://risefy-music.ru/api/v2/getAlbumMusicsById/${params}`,
      text
    )
  }
  
  if (params !== 'tel') {
    
    if (params !== 'love') {
      getMusicsApi(
        `https://risefy-music.ru/api/v1/music/genre/${params}`,
        text
      )
    }
    if (params == 'love') {
      getMusicsApi(
        'https://risefy-music.ru/api/v2/showLikedMusic',
        text
      )
    }
    
  }
  
  if (phonePlaylist.length !== 0 && params == 'tel') {
    playLists = [...phonePlaylist]
    newMapArrs(phonePlaylist)
    getDisplayList(text)
  }
  
  if (phonePlaylist.length == 0 && params == 'tel') {
    alertAudio()
  }
  
}

const getDisplayList = (text) => {
  
  textCurl = text
  
  document.querySelector('.publick').innerHTML = `
  ${text}
  `
  
  document.querySelector('.overflouTracks').innerHTML = arrMapLists.map((list, index) => `
  
       <div id="${index}" class="overflouColumn">
       
       ${arrMapLists[index].map((x, ind) => `
       
         <div class="elementOverflou" onclick="plyaList(${x.soundid})">

            <div class="numberTextList" style="color:deeppink;color:${getBoxColorList(numberTrack, x.soundid)};! imported">${x.soundid + 1}</div>

            <div class="textListCenter">
              <div class="h">${getMinText(x.title)}</div>
              <p>${x.artistName}</p>
            </div>

            <div class="timeListText" style="color:grey;color:${getBoxColorList(numberTrack, x.soundid)};! imported">
              ${getStateAudio(numberTrack, x.soundid)}
            </div>

          </div>

       `).join("")}
       </div>
  `).join("")
}

const getBoxColorList = (treckIndex, indexList) => {
  
  if (treckIndex == indexList) {
    return "red"
  }
  
  if (treckIndex !== indexList) {
    return
  }
  
}

const getStateAudio = (treckIndex, indexList) => {
  
  if (treckIndex == indexList) {
    return "play"
  }
  
  if (treckIndex !== indexList) {
    return "stop"
  }
}

let getAnimationClass = (treckIndex, indexList) => {
  
  if (treckIndex == indexList) {
    return "animationText"
  }
  
  return
}


let getLoading = (stateLoading) => {
  if (stateLoading) {
    document.querySelector('.loading').style = "display:;"
  }
  if (!stateLoading) {
    document.querySelector('.loading').style = "display:none;"
  }
}


let newMapArrs = (resJson) => {
  
  playLists = [...resJson]
  
  resJson.map((resJ, index) => {
    resJ.playerSoundId = resJ.soundid
    resJ.soundid = index
  })
  
  
  arrMapLists[[0]] = resJson.slice(0, 4)
  arrMapLists[[1]] = resJson.slice(4, 8)
  arrMapLists[[2]] = resJson.slice(8, 12)
  arrMapLists[[3]] = resJson.slice(12, 16)
  
  if (numberSLK == 1) {
    numberTrack = 1
    backAudio()
  }
}


let getStaticServerUrl = (playL) => {
  
  if (playL.coverURL) {
    return playL.musicUrl
  } else {
    return `${playL.musicUrl.slice(0, 27)+playL.musicUrlInResources.slice(7)}`
  }
}

const asyncPostLike = async () => {
  
  let soundIdTrack
  //console.log("like", numberTrack)
  
  if (boolVolna == true) {
    soundIdTrack = volnaSounds[numberTrack].soundid
  } else {
    soundIdTrack = playLists[numberTrack].playerSoundId
  }
  
  
  let tokenLocal = localStorage.getItem(tokenKey)
  
  const response = await fetch("https://risefy-music.ru/api/v2/saveMusicToUser", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer" + " " + tokenLocal
    },
    body: JSON.stringify({
      "soundId": `${soundIdTrack}`
      
    })
  });
  const status = await response.status;
  //console.log(status)
}


const asyncDeleteLike = async () => {
  
  let soundIdTrack
  //console.log("like", numberTrack)
  
  if (boolVolna == true) {
    soundIdTrack = volnaSounds[numberTrack].soundid
  } else {
    soundIdTrack = playLists[numberTrack].playerSoundId
  }
  
  let tokenLocal = localStorage.getItem(tokenKey)
  
  const response = await fetch("https://risefy-music.ru/api/v2/deleteMusic", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer" + " " + tokenLocal
    },
    body: JSON.stringify({
      "soundId": `${soundIdTrack}`
      
    })
  });
  const status = await response.status;
}

const openModalPlockat = () => {
  
  let getPlocatsSoundPost = async () => {
    
    let tokenLocal = localStorage.getItem(tokenKey)
    
    
    const response = await fetch("https://risefy-music.ru/api/v1/music/allMusicGenres", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer" + " " + tokenLocal
      }
    });
    const status = await response.status;
    let json = await response.json()
    //console.log(status)
    return json
    
  }
  
  getPlocatsSoundPost()
    .then(json => {
      arreyCollectionPlocats = [...json]
      //console.log(arreyCollectionPlocats)
    })
    .then(json => getDisplayCollectionsPlocats())
  
  
  closeCollrctions()
  
  document.querySelector('.modalPlockat').style = "display:block;"
}

const closeModalPlockat = () => {
  document.querySelector('.modalPlockat').style = "display:none;"
}


let getDisplayCollectionsPlocats = () => {
  document.querySelector('.overflouTracksPL').innerHTML = arreyCollectionPlocats.map(plocat => `  <div class="overflouColumnPL">
          <div class="elementOverflouPL" style="background-color: rgb(46, 204, 113); background-image: url(${plocat.coverUrl});
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;">
            <div class="header_elementOverflou">
            </div>
            <div class="footer_elementOverflou">
              <div class="text_style">
                <span></span><span style="color: black;"></span><span style="color:black;">${String(plocat.genreName.split('').slice(0, 15).join(""))}</span>
              </div>
              <div class="btn_containe_plocat">
                <span class="btn-Plockat-back" onclick="closeModalPlockat()">&laquo;&laquo;</span>
                <button class="btn-Plockat-play" onclick="getAppList('${plocat.allMusicGenresUrl}', '${plocat.genreName}', 1)">&#10148;</button>
              </div>
            </div>
          </div>
        </div>`).join("")
}

const getVolna = (page, size) => {
  
  boolVolna = true
  
  let getPlocatsSoundPost = async () => {
    
    let tokenLocal = localStorage.getItem(tokenKey)
    
    const response = await fetch(`https://risefy-music.ru/api/v1/music/allMusic?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer" + " " + tokenLocal
      }
    });
    const status = await response.status;
    let json = await response.json()
    // console.log(status)
    return json
  }
  
  getPlocatsSoundPost()
    .then(json => {
      stopAudio()
      volnaSounds = []
      volnaSounds = [...json]
      //console.log(volnaSounds)
      numberTrack = 0
      nextAudio()
    })
}

const openTopMusic = () => {
  
  let getMusicTopPost = async () => {
    
    let tokenLocal = localStorage.getItem(tokenKey)
    
    const response = await fetch("https://risefy-music.ru/api/v2/getAllAlbums?page=0&size=10", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer" + " " + tokenLocal
      }
    });
    const status = await response.status;
    let json = await response.json()
    //console.log(status)
    return json
  }
  
  getMusicTopPost()
    .then(json => {
      arreyTopMusics = [...json]
      //console.log(arreyTopMusics)
    })
    .then(json => getDisplayTopMusic())
  
  document.querySelector('.modalMusicTop').style.display = "block"
}

let topLike

let getDisplayTopMusic = () => {
  document.getElementById('mainScrol').innerHTML = arreyTopMusics.map(topMusic => ` 
    <section class="section">

      <div class="section_element">

        <i class="fa fa-user-circle" aria-hidden="true"></i>

        <i class="fa fa-arrow-left" aria-hidden="true" onclick="closeTopMusic()"></i>
        <i class="fa fa-thumbs-up hovLike" aria-hidden="true" onclick="postUserLike(${topMusic.id})"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
        <i class="fa fa-external-link-square" aria-hidden="true"></i>
      </div>
      <div class="border_xxx">
        <div class="border_xxx_top"></div>
        <div class="border_xxx_bottom"></div>
      </div>
      <div class="top_block_scrin">
        <div class="user_autor">
           <i class="fa fa-thumbs-up" aria-hidden="true"></i>
  <span style="color:deeppink;">${topMusic.likes}</span>
          <br>
          <span style="color: white; font-size: 3rem;">TopTok</span>
          <div style="width:230px; color: deepskyblue;word-break:break-all;">${topMusic.userName}</div>
        </div>
        <div style="background-image: url('${topMusic.userPhotoUrl}');" class="user_img">
        </div>
      </div>
      <div class="bottom_block_scrin">
        <div class="user_sound">
          ВЫПУЩЕН <br>
          &nbsp;&nbsp;
          ${new Date(topMusic.createDate).toLocaleString()}
        </div>
      </div>
    </section>
  `).join("")
}


const closeTopMusic = () => {
  document.querySelector('.modalMusicTop').style.display = "none"
}

const mainScrol = document.getElementById('mainScrol')

let scroll

mainScrol.addEventListener("scroll", (event) => {
  scroll = mainScrol.scrollTop;
});

let numberTomMusic = 0
mainScrol.addEventListener("scrollend", () => {
  
  if (scroll == 0) {
    
    numberTomMusic = numberTomMusic - 1
  } else {
    
    numberTomMusic = numberTomMusic + 1
  }
  //console.log(numberTomMusic)
  getAppList(arreyTopMusics[numberTomMusic].id, 'TopMusic', 1)
});

const openUserMenu = () => {
  getUser()
  
  document.querySelector('.modalUserMenu').style.display = "block"
}

const closeUserMenu = () => {
  document.querySelector('.modalUserMenu').style.display = "none"
}

const showUserFiles = async () => {
  
  const formData = new FormData();
  const fileField = document.querySelector('#files_user[type="file"]');
  
  formData.append("file", fileField.files[0]);
  
  let tokenLocal = localStorage.getItem(tokenKey)
  
  const response = await fetch("https://risefy-music.ru/api/v2/upload", {
      method: "POST",
      headers: {
        "Authorization": "Bearer" + " " + tokenLocal
      },
      body: formData,
    })
    .then(response => getUser());
  const result = await response.status;
  //console.log(result);
}

const getUser = () => {
  
  let tokenLocal = localStorage.getItem(tokenKey)
  
  fetch('https://risefy-music.ru/api/v2/userData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer" + " " + tokenLocal
      }
    })
    .then(response => response.json())
    .then(json => {
      document.querySelector('.appUserFoto').innerHTML = `<img style="border-radius: 12px; box-shadow: 0 5px 15px 2px black;" src="${json.userPhoto}" width="150px">`
      
      document.querySelector('.displayUser').innerHTML = `            <span>Логин: ${json.userName}</span>`
    })
    
    .catch((error) => console.error('Error:', error));
}

const postUserLike = (id) => {
  //console.log(topLike)
  let tokenLocal = localStorage.getItem(tokenKey)
  
  fetch(`https://risefy-music.ru/api/v2/likeAlbum/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer" + " " + tokenLocal
      },
    })
    .then(response => console.log(response.status))
    
    .catch((error) => console.error('Error:', error));
}


let searchInput = document.querySelector('.inputSearch')

searchInput.addEventListener("focus", () => {
  document.querySelector('.searchMain').style.display = "block"
  searchInput.value = ""
})

searchInput.addEventListener("blur", () => {
  
  setTimeout(() => {
    document.querySelector('.searchMain').style.display = "none"
  }, 1000)
  
  searchInput.value = "трек, название, исполнитель..."
})

let tracsSearch
searchInput.addEventListener("input", (e) => {
  tracsSearch = [...e.target.value]
  searchInput.value = e.target.value
  
  //console.log(searchInput.value)
  if (tracsSearch.length > 5) {
    searchTracs(searchInput.value)
  }
})

let arreySearch = []

const searchTracs = (text) => {
  let tokenLocal = localStorage.getItem(tokenKey)
  
  fetch(`https://risefy-music.ru/api/v1/findMusic/${text}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer" + " " + tokenLocal
      },
    })
    .then(response => response.json())
    .then(json => {
      arreySearch = [...json]
      getSearchDisplay()
    })
    .catch(error => document.querySelector('.searchMain').innerHTML = 'ничего не найдено')
}

let getSearchDisplay = () => {
  document.querySelector('.searchMain').innerHTML = arreySearch.map((searchT, index) => `
     <div class="elementSearch" onclick="playSeatch(${index})">
                <img class="searchImg" src="/IMG_20240904_181211.png" width="50px">
                <div>
                  <span style="font-size: 1.2rem;">${searchT.title}</span> <br>
                  <span style="font-size:0.8rem; color:grey;">${searchT.artistName}</span>
                </div>
              </div>
  `).join("")
}

const playSeatch = (params) => {
  playLists.unshift(arreySearch[params])
  numberTrack = 1
  backAudio()
  closeCollrctions()
}