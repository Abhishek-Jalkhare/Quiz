const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "2",
    userAnswer: "",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "1",
    userAnswer: "",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "3",
    userAnswer: "",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    correctAnswer: "0",
    userAnswer: "",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    correctAnswer: "0",
    userAnswer: "",
  },
];

const grade = ["F", "D", "C", "B", "A", "A+"];
let i = 0,
  marks = 0;

const quizdiv = document.querySelector(".quiz");
const start = document.querySelector(".start");
const result = document.querySelector(".result");

start.addEventListener("click", function () {
  quizdiv.classList.remove("hidden");
  document.querySelector(".main").classList.add("hidden");
  display(i);
});

quizdiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("options")) {
    quiz[i].userAnswer = e.target.id;
    display(++i);
  }
});

const mrkh1 = document.querySelector(".result .review .marksscored");
const gradeh1 = document.querySelector(".result .review .grade");
const ques = document.querySelector(".solution .ques");

function display(i) {
  if (i == quiz.length) {
    marks = calculateMarks();
    result.classList.remove("hidden");
    quizdiv.classList.add("hidden");
    mrkh1.innerHTML = `${marks} / ${quiz.length}`;
    gradeh1.innerHTML = `${grade[marks]}`;

    quiz.forEach(function (e) {
      ques.innerHTML += `<div class="que text-[28px] font-[400] text-white w-full bg-black/30 backdrop-blur-sm border-2 border-[#2E7BAE] rounded-2xl p-8">
        <div class="flex gap-[10px] items-center">
          <div class="icon h-[50px] w-[50px] rounded-full overflow-hidden flex items-center justify-center ${e.correctAnswer == e.userAnswer ? 'bg-green-500' : 'bg-red-500'}">
            <i class="${e.correctAnswer == e.userAnswer ? 'ri-check-line text-3xl' : 'ri-close-line text-3xl'}"></i>
          </div>
          <h1>${e.question}</h1>
        </div>
        <div class="options flex flex-col text-[24px] mt-[20px] w-full gap-4">
          <div class="correct">
            <h1 class="text-green-500">Correct Answer: ${e.options[Number(e.correctAnswer)]}</h1>
          </div>
          <div class="${e.correctAnswer == e.userAnswer ? "hidden" : ""}">
            <h1 class="text-red-500">Your Answer: ${e.options[Number(e.userAnswer)]}</h1>
          </div>
        </div>
      </div>`;
    });
    return;
  }

  const progressPercent = (i * 100) / quiz.length;
  
  document.querySelector('.que').textContent = quiz[i].question;
  const optionsContainer = document.querySelector('.options');
  optionsContainer.innerHTML = quiz[i].options.map((option, index) => `
    <button class="options text-center w-full h-[70px] border-2 border-[#2E7BAE] text-white text-[22px] rounded-xl hover:bg-gradient-to-r hover:from-[#2E7BAE] hover:to-[#1a4971] transform hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm bg-opacity-20 bg-black" id="${index}">
      ${option}
    </button>
  `).join('');

  document.querySelector('.progress-text').textContent = `${Math.round(progressPercent)}%`;
  document.querySelector('.progress').style.width = `${progressPercent}%`;
}

function calculateMarks() {
  let marks = 0;
  quiz.forEach(function (e) {
    if (e.correctAnswer == e.userAnswer) marks++;
  });
  return marks;
}
