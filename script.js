let currentQ = 0;
let userName = "";

let score = {
  gryffindor: 0,
  slytherin: 0,
  ravenclaw: 0,
  hufflepuff: 0
};

const questions = [
  { text: "Pick a character", img: "https://source.unsplash.com/400x300/?wizard", options: [
    { text: "Harry", house: "gryffindor" },
    { text: "Draco", house: "slytherin" },
    { text: "Luna", house: "ravenclaw" },
    { text: "Cedric", house: "hufflepuff" }
  ]},
  { text: "What would you do in danger?", img: "https://source.unsplash.com/400x300/?magic,battle", options: [
    { text: "Fight", house: "gryffindor" },
    { text: "Plan", house: "slytherin" },
    { text: "Think", house: "ravenclaw" },
    { text: "Protect", house: "hufflepuff" }
  ]},
  { text: "Choose a trait", img: "https://source.unsplash.com/400x300/?fire", options: [
    { text: "Brave", house: "gryffindor" },
    { text: "Ambitious", house: "slytherin" },
    { text: "Wise", house: "ravenclaw" },
    { text: "Loyal", house: "hufflepuff" }
  ]}
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
