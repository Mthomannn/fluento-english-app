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

const answers = document.querySelectorAll(".answer");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-question");

answers.forEach((answer) => {
  answer.addEventListener("click", () => {
    answers.forEach((item) => {
      item.disabled = true;
      item.classList.remove("correct", "incorrect");
    });

    const correct = answer.dataset.correct === "true";
    answer.classList.add(correct ? "correct" : "incorrect");
    if (!correct) {
      document.querySelector('[data-correct="true"]').classList.add("correct");
      feedback.textContent = "Quase! Usamos “at” para horários específicos.";
      feedback.className = "feedback error";
    } else {
      feedback.textContent = "Muito bem! “I wake up at 7” está correto.";
      feedback.className = "feedback success";
    }
    nextButton.disabled = false;
  });
});

nextButton.addEventListener("click", () => {
  feedback.textContent = "Aula concluída! Você ganhou 10 XP.";
  feedback.className = "feedback success";
  nextButton.textContent = "Concluído ✓";
  nextButton.disabled = true;
});
