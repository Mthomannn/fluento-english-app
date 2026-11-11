const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");

function showView(name) {
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${name}-view`));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view], [data-view-target]").forEach((element) => {
  element.addEventListener("click", () => showView(element.dataset.view || element.dataset.viewTarget));
});

const questions = [
  {
    title: "Complete: <em>There ___ a table in the kitchen.</em>",
    options: ["are", "is", "be", "have"],
    correct: 1,
    explanation: "A table é singular, então usamos “there is”."
  },
  {
    title: "Complete: <em>He ___ English every day.</em>",
    options: ["study", "studies", "studying", "is study"],
    correct: 1,
    explanation: "Com “he”, study muda para studies no presente simples."
  },
  {
    title: "Complete: <em>I ___ like a tea.</em>",
    options: ["would", "am", "do", "can"],
    correct: 0,
    explanation: "“I would like” é uma forma educada de fazer um pedido."
  }
];

let currentQuestion = 0;
const questionTitle = document.querySelector("#question-title");
const questionCount = document.querySelector(".question-count");
const answers = document.querySelectorAll(".answer");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-question");

function renderQuestion() {
  const question = questions[currentQuestion];
  questionTitle.innerHTML = question.title;
  questionCount.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = "Continuar →";

  answers.forEach((answer, index) => {
    answer.textContent = question.options[index];
    answer.dataset.correct = String(index === question.correct);
    answer.disabled = false;
    answer.className = "answer";
  });
}

answers.forEach((answer) => {
  answer.addEventListener("click", () => {
    const question = questions[currentQuestion];
    answers.forEach((item) => {
      item.disabled = true;
      item.classList.remove("correct", "incorrect");
    });

    const correct = answer.dataset.correct === "true";
    answer.classList.add(correct ? "correct" : "incorrect");
    if (!correct) {
      document.querySelector(`[data-correct="true"]`).classList.add("correct");
      feedback.textContent = `Quase! ${question.explanation}`;
      feedback.className = "feedback error";
    } else {
      feedback.textContent = `Muito bem! ${question.explanation}`;
      feedback.className = "feedback success";
    }
    nextButton.disabled = false;
  });
});

nextButton.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  feedback.textContent = "Aula concluída! Você ganhou 10 XP.";
  feedback.className = "feedback success";
  nextButton.textContent = "Concluído ✓";
  nextButton.disabled = true;
});

renderQuestion();
