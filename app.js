const STORAGE_KEY = "fluento-progress-v1";

const units = [
  {
    title: "Alphabet & spelling", category: "COMUNICAÇÃO", objective: "Soletrar nomes, cidades e e-mails.", summary: "Pergunte “How do you spell it?” e confirme letras parecidas.", example: "My last name is Costa. C-O-S-T-A.", translation: "Meu sobrenome é Costa. C-O-S-T-A.", vocabulary: [["alphabet", "alfabeto"], ["spell", "soletrar"], ["last name", "sobrenome"]], color: "green",
    questions: [{ title: "Complete: <em>How do you ___ your name?</em>", options: ["spell", "spells", "spelling", "spelled"], correct: 0, explanation: "Depois de “do you”, usamos a forma base: spell." }, { title: "What does <em>last name</em> mean?", options: ["primeiro nome", "sobrenome", "apelido", "cidade"], correct: 1, explanation: "Last name significa sobrenome." }, { title: "Choose the correct phrase:", options: ["My first name is Costa.", "My last name is Costa.", "I live in Costa.", "Spell Costa please."], correct: 1, explanation: "A frase do currículo é: My last name is Costa." }]
  },
  {
    title: "Family & possessives", category: "GRAMÁTICA", objective: "Apresentar familiares usando my, your, his e her.", summary: "Use my, your, his e her para apresentar pessoas e falar de relações.", example: "This is my brother. His wife is a doctor.", translation: "Este é meu irmão. A esposa dele é médica.", vocabulary: [["mother", "mãe"], ["brother", "irmão"], ["wife", "esposa"]], color: "yellow",
    questions: [{ title: "<em>Her sister</em> significa:", options: ["irmã dele", "irmã dela", "irmã deles", "minha irmã"], correct: 1, explanation: "Her indica posse feminina: irmã dela." }, { title: "Complete: <em>This is ___ brother.</em>", options: ["my", "his", "her", "your"], correct: 0, explanation: "My significa meu ou minha." }, { title: "Choose the correct sentence:", options: ["His wife is a doctor.", "He wife is a doctor.", "Her wife is a doctor.", "Him wife is a doctor."], correct: 0, explanation: "His indica posse masculina: a esposa dele." }]
  },
  {
    title: "Jobs & work", category: "VOCABULÁRIO", objective: "Dizer profissão e local de trabalho.", summary: "Aprenda a perguntar “What do you do?” e falar sobre profissões.", example: "What do you do? I’m an engineer.", translation: "O que você faz? Sou engenheira.", vocabulary: [["teacher", "professor(a)"], ["nurse", "enfermeiro(a)"], ["engineer", "engenheiro(a)"]], color: "blue",
    questions: [{ title: "Complete: <em>He is ___ doctor.</em>", options: ["a", "an", "the", "one"], correct: 0, explanation: "Doctor começa com som de consoante: a doctor." }, { title: "Complete: <em>I’m ___ engineer.</em>", options: ["a", "an", "the", "one"], correct: 1, explanation: "Engineer começa com som de vogal: an engineer." }, { title: "Choose the translation for <em>nurse</em>:", options: ["professor", "enfermeiro(a)", "engenheiro", "médico"], correct: 1, explanation: "Nurse significa enfermeiro ou enfermeira." }]
  },
  {
    title: "Home & location", category: "GRAMÁTICA", objective: "Descrever cômodos e localizar objetos.", summary: "Use there is e there are para descrever sua casa e in, on e under para localizar objetos.", example: "There are two bedrooms and a small garden.", translation: "Há dois quartos e um jardim pequeno.", vocabulary: [["kitchen", "cozinha"], ["bedroom", "quarto"], ["garden", "jardim"]], color: "coral",
    questions: [
      { title: "Complete: <em>There ___ a table in the kitchen.</em>", options: ["are", "is", "be", "have"], correct: 1, explanation: "A table é singular, então usamos there is." },
      { title: "Complete: <em>The keys are ___ the table.</em>", options: ["on", "at", "to", "by"], correct: 0, explanation: "Usamos on quando algo está sobre uma superfície." },
      { title: "Escolha a tradução de <em>bedroom</em>:", options: ["cozinha", "banheiro", "quarto", "sala"], correct: 2, explanation: "Bedroom significa quarto." }
      , { title: "There are two bedrooms and a small <em>___</em>.", options: ["garden", "kitchen", "street", "table"], correct: 0, explanation: "Garden significa jardim." }
    ]
  },
  {
    title: "Routine & simple present", category: "GRAMÁTICA", objective: "Falar de hábitos e horários.", summary: "Use a forma base com I, you, we e they; acrescente -s com he, she e it.", example: "I usually have breakfast at home.", translation: "Geralmente tomo café da manhã em casa.", vocabulary: [["wake up", "acordar"], ["work", "trabalhar"], ["breakfast", "café da manhã"]], color: "gray",
    questions: [{ title: "Complete: <em>He ___ English every day.</em>", options: ["study", "studies", "studying", "is study"], correct: 1, explanation: "Com he, study muda para studies no presente simples." }, { title: "Choose the natural sentence:", options: ["I usually have breakfast at home.", "I usual breakfast have home.", "Usually I have breakfast in home.", "I have breakfast usually at the."], correct: 0, explanation: "Usually vem antes do verbo principal." }, { title: "Complete: <em>I ___ up at seven.</em>", options: ["wake", "wakes", "waking", "am wake"], correct: 0, explanation: "Com I, usamos a forma base: wake." }]
  },
  {
    title: "Questions & polite requests", category: "COMUNICAÇÃO", objective: "Fazer perguntas e pedir ajuda com cortesia.", summary: "Use What, Where, When, Who e How para fazer perguntas e Could you para pedir ajuda.", example: "Excuse me, where is the nearest pharmacy?", translation: "Com licença, onde fica a farmácia mais próxima?", vocabulary: [["where is", "onde fica"], ["repeat", "repetir"], ["nearest", "mais próxima"]], color: "green",
    questions: [{ title: "Complete: <em>Where ___ the train station?</em>", options: ["are", "is", "do", "be"], correct: 1, explanation: "The train station é singular: Where is...?" }, { title: "Choose the polite request:", options: ["Repeat that.", "Could you repeat that, please?", "You repeat that.", "Repeating now."], correct: 1, explanation: "Could you... please? é uma forma educada de pedir." }, { title: "Complete: <em>Excuse me, ___ is the pharmacy?</em>", options: ["where", "what", "who", "when"], correct: 0, explanation: "Where pergunta localização." }]
  },
  {
    title: "Food & ordering", category: "SITUAÇÕES REAIS", objective: "Pedir alimentos e bebidas com educação.", summary: "Use I’d like para pedir comida e bebida com naturalidade.", example: "I’d like a coffee without sugar and a sandwich.", translation: "Eu gostaria de um café sem açúcar e um sanduíche.", vocabulary: [["coffee", "café"], ["menu", "cardápio"], ["sandwich", "sanduíche"]], color: "yellow",
    questions: [{ title: "Complete: <em>I ___ like a tea.</em>", options: ["would", "am", "do", "can"], correct: 0, explanation: "I would like é uma forma educada de fazer um pedido." }, { title: "Choose the natural order:", options: ["I’d like a coffee, please.", "I like would coffee please.", "A coffee I would like.", "I’d a coffee like."], correct: 0, explanation: "I’d like + item + please é a estrutura natural." }, { title: "What does <em>menu</em> mean?", options: ["conta", "cardápio", "garçom", "cozinha"], correct: 1, explanation: "Menu significa cardápio." }]
  },
  {
    title: "Directions & time", category: "SITUAÇÕES REAIS", objective: "Pedir direções e combinar horário e local.", summary: "Aprenda Go straight, Turn left, next to e across from para se localizar.", example: "Go straight and turn right at the next street.", translation: "Siga em frente e vire à direita na próxima rua.", vocabulary: [["go straight", "siga em frente"], ["turn left", "vire à esquerda"], ["next to", "ao lado de"]], color: "blue",
    questions: [{ title: "Complete: <em>Turn ___ at the next street.</em>", options: ["left", "next", "between", "straight"], correct: 0, explanation: "Turn left significa vire à esquerda." }, { title: "Complete: <em>Go ___ for two blocks.</em>", options: ["straight", "next", "left", "between"], correct: 0, explanation: "Go straight significa siga em frente." }, { title: "What does <em>next to</em> mean?", options: ["em frente", "ao lado de", "atrás de", "dentro de"], correct: 1, explanation: "Next to significa ao lado de." }]
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
const completionPanel = document.querySelector("#completion-panel");
const reviewLessonButton = document.querySelector("#review-lesson");
const nextLessonButton = document.querySelector("#next-lesson");
let detailUnit = 3;

function openLesson(index) {
  if (index > 0 && !progress.completed.includes(index - 1)) {
    showToast("Conclua a aula anterior para desbloquear esta unidade.");
    return;
  }
  detailUnit = index;
  const unit = units[index];
  document.querySelector("#detail-category").textContent = `A1 ${index + 1} · ${unit.category}`;
  document.querySelector("#detail-title").textContent = unit.title;
  document.querySelector("#detail-objective").textContent = unit.objective;
  document.querySelector("#detail-summary").textContent = unit.summary;
  document.querySelector("#detail-example").textContent = unit.example;
  document.querySelector("#detail-translation").textContent = unit.translation;
  document.querySelector("#detail-status").textContent = progress.completed.includes(index) ? "Concluída" : "Disponível";
  document.querySelector("#vocabulary-list").innerHTML = unit.vocabulary.map(([english, portuguese]) => `<span class="vocabulary-chip"><strong>${english}</strong><small>${portuguese}</small></span>`).join("");
  showView("lesson-detail");
}

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
  const validName = ["home", "lessons", "lesson-detail", "practice", "progress"].includes(name) ? name : "home";
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${validName}-view`));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === validName));
  if (updateUrl && window.location.hash !== `#${validName}`) window.history.pushState({ view: validName }, "", `#${validName}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const openTarget = event.target.closest("[data-open-unit]");
  if (openTarget) {
    event.preventDefault();
    openLesson(Number(openTarget.dataset.openUnit));
    return;
  }
  const target = event.target.closest("[data-view], [data-view-target]");
  if (target) {
    event.preventDefault();
    const unit = target.dataset.startUnit;
    if (unit !== undefined) startUnit(Number(unit));
    else showView(target.dataset.view || target.dataset.viewTarget);
  }
});

document.querySelector("#detail-practice").addEventListener("click", () => startUnit(detailUnit));
document.querySelector("#detail-listen").addEventListener("click", () => speak(units[detailUnit].example, document.querySelector("#detail-listen")));

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
      ${locked ? `<strong>${status}</strong>` : `<div class="row-actions"><button class="link-button" data-open-unit="${index}">Ver aula</button><button class="small-button" data-start-unit="${index}" data-view-target="practice">${done ? "Revisar" : "Praticar"}</button></div>`}
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
  document.querySelector("#practice-objective").textContent = unit.objective;
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
  completionPanel.hidden = true;
  document.querySelector(".quiz-card").hidden = false;
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
  document.querySelector(".quiz-card").hidden = true;
  completionPanel.hidden = false;
  showToast(`${unit.title} concluída! Próxima aula desbloqueada.`);
});

reviewLessonButton.addEventListener("click", () => {
  currentQuestion = 0;
  renderQuestion();
});

nextLessonButton.addEventListener("click", () => {
  const next = currentUnit + 1;
  if (next < units.length) {
    openLesson(next);
    startUnit(next);
  } else {
    showView("progress");
  }
});

listenButton.addEventListener("click", () => {
  speak(units[currentUnit].example, listenButton);
});

function speak(phrase, button) {
  if (!("speechSynthesis" in window)) {
    feedback.textContent = "Seu navegador não oferece reprodução de áudio.";
    feedback.className = "feedback error";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  button.textContent = "Reproduzindo...";
  window.speechSynthesis.speak(utterance);
  utterance.onend = () => { button.textContent = button.id === "detail-listen" ? "▶ Ouvir pronúncia" : "Ouvir exemplo"; };
}

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
