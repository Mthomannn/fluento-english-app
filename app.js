const STORAGE_KEY = "fluento-progress-v1";

const units = [
  {
    title: "Alphabet & spelling", category: "COMUNICAÇÃO", objective: "Soletrar nomes, cidades e e-mails.", color: "green",
    questions: [{ title: "Complete: <em>How do you ___ your name?</em>", options: ["spell", "spells", "spelling", "spelled"], correct: 0, explanation: "Depois de “do you”, usamos a forma base: spell." }]
  },
  {
    title: "Family & possessives", category: "GRAMÁTICA", objective: "Apresentar familiares usando my, your, his e her.", color: "yellow",
    questions: [{ title: "<em>Her sister</em> significa:", options: ["irmã dele", "irmã dela", "irmã deles", "minha irmã"], correct: 1, explanation: "Her indica posse feminina: irmã dela." }]
  },
  {
    title: "Jobs & work", category: "VOCABULÁRIO", objective: "Dizer profissão e local de trabalho.", color: "blue",
    questions: [{ title: "Complete: <em>He is ___ doctor.</em>", options: ["a", "an", "the", "one"], correct: 0, explanation: "Doctor começa com som de consoante: a doctor." }]
  },
  {
    title: "Home & location", category: "GRAMÁTICA", objective: "Descrever cômodos e localizar objetos.", color: "coral",
    questions: [
      { title: "Complete: <em>There ___ a table in the kitchen.</em>", options: ["are", "is", "be", "have"], correct: 1, explanation: "A table é singular, então usamos there is." },
      { title: "Complete: <em>The keys are ___ the table.</em>", options: ["on", "at", "to", "by"], correct: 0, explanation: "Usamos on quando algo está sobre uma superfície." },
      { title: "Escolha a tradução de <em>bedroom</em>:", options: ["cozinha", "banheiro", "quarto", "sala"], correct: 2, explanation: "Bedroom significa quarto." }
    ]
  },
  {
    title: "Routine & simple present", category: "GRAMÁTICA", objective: "Falar de hábitos e horários.", color: "gray",
    questions: [{ title: "Complete: <em>He ___ English every day.</em>", options: ["study", "studies", "studying", "is study"], correct: 1, explanation: "Com he, study muda para studies no presente simples." }]
  },
  {
    title: "Questions & polite requests", category: "COMUNICAÇÃO", objective: "Fazer perguntas e pedir ajuda com cortesia.", color: "green",
    questions: [{ title: "Complete: <em>Where ___ the train station?</em>", options: ["are", "is", "do", "be"], correct: 1, explanation: "The train station é singular: Where is...?" }]
  },
  {
    title: "Food & ordering", category: "SITUAÇÕES REAIS", objective: "Pedir alimentos e bebidas com educação.", color: "yellow",
    questions: [{ title: "Complete: <em>I ___ like a tea.</em>", options: ["would", "am", "do", "can"], correct: 0, explanation: "I would like é uma forma educada de fazer um pedido." }]
  },
  {
    title: "Directions & time", category: "SITUAÇÕES REAIS", objective: "Pedir direções e combinar horário e local.", color: "blue",
    questions: [{ title: "Complete: <em>Turn ___ at the next street.</em>", options: ["left", "next", "between", "straight"], correct: 0, explanation: "Turn left significa vire à esquerda." }]
  }
];

const defaultProgress = { completed: [], answered: 0, studyMinutes: 0, streak: 0, lastStudyDate: null };
let progress = loadProgress();
let currentUnit = 3;
let currentQuestion = 0;
let questionAnswered = false;

const views = document.querySelectorAll(".view");
const navItems = document.querySelectorAll(".nav-item");
const questionTitle = document.querySelector("#question-title");
const questionCount = document.querySelector("#question-count");
const answers = [...document.querySelectorAll(".answer")];
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-question");
const listenButton = document.querySelector("#listen-example");
const lessonList = document.querySelector("#lesson-list");

function loadProgress() {
  try { return { ...defaultProgress, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return { ...defaultProgress }; }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn("Não foi possível salvar o progresso local.", error);
  }
  renderDashboard();
  renderLessons();
  renderStats();
}

function todayKey() { return new Date().toISOString().slice(0, 10); }

function recordStudy(minutes = 5) {
  const today = todayKey();
  if (progress.lastStudyDate !== today) {
    progress.streak = progress.lastStudyDate ? progress.streak + 1 : 1;
    progress.lastStudyDate = today;
  }
  progress.answered += 1;
  progress.studyMinutes += minutes;
  saveProgress();
}

function showView(name, updateUrl = true) {
  const validName = ["home", "lessons", "practice", "progress"].includes(name) ? name : "home";
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${validName}-view`));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === validName));
  if (updateUrl && window.location.hash !== `#${validName}`) window.history.pushState({ view: validName }, "", `#${validName}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-view], [data-view-target]");
  if (target) {
    event.preventDefault();
    const unit = target.dataset.startUnit;
    if (unit !== undefined) startUnit(Number(unit));
    else showView(target.dataset.view || target.dataset.viewTarget);
  }
});

document.addEventListener("keydown", (event) => {
  const card = event.target.closest(".lesson-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    startUnit(Number(card.dataset.startUnit));
  }
});

window.addEventListener("popstate", () => showView(window.location.hash.slice(1), false));
window.addEventListener("hashchange", () => showView(window.location.hash.slice(1), false));

function renderLessons() {
  lessonList.innerHTML = units.map((unit, index) => {
    const done = progress.completed.includes(index);
    const locked = index > 0 && !progress.completed.includes(index - 1);
    const status = done ? "Concluída" : locked ? "Bloqueada" : "Disponível";
    const icon = done ? "✓" : String(index + 1).padStart(2, "0");
    return `<article class="list-row ${done ? "done" : ""} ${locked ? "locked" : "current"}">
      <span class="list-icon ${unit.color}">${icon}</span>
      <div><span>A1 ${index + 1} · ${unit.category}</span><h3>${unit.title}</h3><small>${unit.objective}</small></div>
      ${locked ? `<strong>${status}</strong>` : `<button class="small-button" data-start-unit="${index}" data-view-target="practice">${done ? "Revisar" : "Começar"}</button>`}
    </article>`;
  }).join("");
}

function renderDashboard() {
  const completed = progress.completed.length;
  const percent = Math.round((completed / units.length) * 100);
  const dailyMinutes = Math.min(15, progress.studyMinutes);
  document.querySelector("#continue-progress").style.width = `${percent}%`;
  document.querySelector("#continue-progress-label").textContent = `${percent}% concluído`;
  document.querySelector("#continue-time-label").textContent = completed === units.length ? "Trilha concluída" : `${units.length - completed} aulas restantes`;
  document.querySelector("#daily-minutes").textContent = dailyMinutes;
  document.querySelector("#daily-progress").style.width = `${(dailyMinutes / 15) * 100}%`;
  document.querySelector("#daily-description").textContent = dailyMinutes >= 15 ? "Meta diária concluída. Excelente consistência!" : `Complete mais ${15 - dailyMinutes} min para manter sua meta de hoje.`;
  document.querySelector("#daily-message").textContent = dailyMinutes >= 15 ? "Meta alcançada!" : "Você consegue!";
}

function renderStats() {
  const completed = progress.completed.length;
  document.querySelector("#streak-value").textContent = progress.streak;
  document.querySelector("#study-time-value").textContent = progress.studyMinutes;
  document.querySelector("#completed-value").textContent = completed;
  document.querySelector("#completion-label").textContent = `${Math.round((completed / units.length) * 100)}% da trilha`;
}

function startUnit(index) {
  if (index > 0 && !progress.completed.includes(index - 1)) {
    showToast("Conclua a aula anterior para desbloquear esta unidade.");
    return;
  }
  currentUnit = index;
  currentQuestion = 0;
  renderQuestion();
  showView("practice");
}

function renderQuestion() {
  const unit = units[currentUnit];
  const question = unit.questions[currentQuestion];
  questionAnswered = false;
  document.querySelector("#practice-eyebrow").textContent = `A1 ${currentUnit + 1} · ${unit.category}`;
  document.querySelector("#practice-title").textContent = unit.title;
  questionTitle.innerHTML = question.title;
  questionCount.textContent = `Pergunta ${currentQuestion + 1} de ${unit.questions.length}`;
  document.querySelector("#quiz-progress").style.width = `${((currentQuestion + 1) / unit.questions.length) * 100}%`;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === unit.questions.length - 1 ? "Concluir aula →" : "Continuar →";
  answers.forEach((answer, index) => {
    answer.textContent = question.options[index] || "";
    answer.dataset.correct = String(index === question.correct);
    answer.disabled = !question.options[index];
    answer.className = "answer";
  });
}

answers.forEach((answer) => answer.addEventListener("click", () => {
  if (questionAnswered) return;
  questionAnswered = true;
  const question = units[currentUnit].questions[currentQuestion];
  const correct = answer.dataset.correct === "true";
  answers.forEach((item) => { item.disabled = true; });
  answer.classList.add(correct ? "correct" : "incorrect");
  if (!correct) document.querySelector('[data-correct="true"]').classList.add("correct");
  feedback.textContent = `${correct ? "Muito bem!" : "Quase!"} ${question.explanation}`;
  feedback.className = `feedback ${correct ? "success" : "error"}`;
  nextButton.disabled = false;
  recordStudy(5);
}));

nextButton.addEventListener("click", () => {
  const unit = units[currentUnit];
  if (currentQuestion < unit.questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }
  if (!progress.completed.includes(currentUnit)) progress.completed.push(currentUnit);
  saveProgress();
  showToast(`${unit.title} concluída! Próxima aula desbloqueada.`);
  renderQuestion();
  setTimeout(() => showView("lessons"), 650);
});

listenButton.addEventListener("click", () => {
  const phrase = "There is a table in the kitchen.";
  if (!("speechSynthesis" in window)) {
    feedback.textContent = "Seu navegador não oferece reprodução de áudio.";
    feedback.className = "feedback error";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  listenButton.textContent = "Reproduzindo...";
  window.speechSynthesis.speak(utterance);
  utterance.onend = () => { listenButton.textContent = "Ouvir exemplo"; };
});

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 2800);
}

renderDashboard();
renderLessons();
renderStats();
renderQuestion();
showView(window.location.hash.slice(1) || "home", false);
