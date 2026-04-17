let currentQ = 0;
let userName = "";

let score = {
  gryffindor: 0,
  slytherin: 0,
  ravenclaw: 0,
  hufflepuff: 0
};

const questions = [
  {
    text: "Pick a character",
    img: 'wizard.jpg',
    options: [
      { text: "Harry", house: "gryffindor" },
      { text: "Draco", house: "slytherin" },
      { text: "Luna", house: "ravenclaw" },
      { text: "Cedric", house: "hufflepuff" }
    ]
  },
  {
    text: "You’re walking alone in the Forbidden Forest at night. Suddenly, you hear something moving behind you… what do you do?",
    img: 'forest.jpg',
    options: [
      { text: "Turn around and face it head-on", house: "gryffindor" },
      { text: "Stay calm and quietly plan your next move", house: "slytherin" },
      { text: "Observe carefully before reacting", house: "ravenclaw" },
      { text: "Call out and try to avoid conflict", house: "hufflepuff" }
    ]
  },
  {
    text: "You discover a hidden room in Hogwarts that no one knows about. What’s your first move?",
    img: 'room.jpg',
    options: [
      { text: "Explore it immediately", house: "gryffindor" },
      { text: "Think how you can use it to your advantage", house: "slytherin" },
      { text: "Study its secrets and history", house: "ravenclaw" },
      { text: "Share it with close friends", house: "hufflepuff" }
    ]
  }
];

function startQuiz() {
  userName = document.getElementById("username").value.trim();
  if (!userName) return alert("Enter your name 😏");

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  let q = questions[currentQ];

  document.getElementById("question-text").innerText = q.text;
  document.getElementById("question-img").src = q.img;

  let html = "";
  q.options.forEach(opt => {
    html += `<div class="option-card" onclick="nextQuestion('${opt.house}')">${opt.text}</div>`;
  });

  document.getElementById("options").innerHTML = html;
}

function nextQuestion(house) {
  score[house]++;
  currentQ++;

  if (currentQ < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let max = Math.max(...Object.values(score));
  let house = Object.keys(score).find(h => score[h] === max);

  let desc = {
    gryffindor: "fearless and bold 💥",
    slytherin: "ambitious and sharp 🐍",
    ravenclaw: "creative and intelligent 🧠",
    hufflepuff: "kind and loyal 💛"
  };

  let screen = document.getElementById("result-screen");
  screen.className = "screen " + house;

  screen.innerHTML = `
    <div class="result-card">
      <h2>${house.toUpperCase()}</h2>
      <p>${userName}, you are ${desc[house]}</p>
      <button onclick="location.reload()">🔁 Again</button>
    </div>
  `;

  document.getElementById("quiz-screen").classList.add("hidden");
  screen.classList.remove("hidden");
}
