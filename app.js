const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");

function showView(name, updateUrl = true) {
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${name}-view`));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === name));
  if (updateUrl && window.location.hash !== `#${name}`) {
    window.history.pushState({ view: name }, "", `#${name}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view], [data-view-target]").forEach((element) => {
  element.addEventListener("click", (event) => {
    const target = element.dataset.view || element.dataset.viewTarget;
    if (element.tagName === "A") event.preventDefault();
    showView(target);
  });
});

document.querySelectorAll(".lesson-card").forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") showView(card.dataset.viewTarget);
  });
});

window.addEventListener("popstate", () => showView(window.location.hash.slice(1) || "home", false));
window.addEventListener("hashchange", () => showView(window.location.hash.slice(1) || "home", false));

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
const listenButton = document.querySelector("#listen-example");

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

listenButton.addEventListener("click", () => {
  const phrase = "There is a table in the kitchen.";
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
    listenButton.textContent = "Reproduzindo...";
    utterance.onend = () => { listenButton.textContent = "Ouvir exemplo"; };
  } else {
    feedback.textContent = "Seu navegador não oferece reprodução de áudio.";
    feedback.className = "feedback error";
  }
});

renderQuestion();
showView(window.location.hash.slice(1) || "home", false);
