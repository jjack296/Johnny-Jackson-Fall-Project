/* IT 3203 Milestone 2: grade the quiz on the same page without a server. */
"use strict";
const form = document.getElementById("http-quiz");
const results = document.getElementById("quiz-results");
const explanations = [
  ["Hypertext Transfer Protocol", "HTTP is short for Hypertext Transfer Protocol, the set of rules browsers and servers use to exchange resources."],
  ["GET", "GET asks a server to send back a resource, such as an HTML page."],
  ["The requested resource wasn't found (404)", "A 404 response means the server could not find the requested resource."],
  ["HTTP/2", "HTTP/2 added multiplexing so several streams can share one TCP connection."],
  ["Caching, HTTPS protection, and HTTP being stateless", "Caching saves repeat work, HTTPS secures communication, and HTTP requests do not automatically remember earlier requests."],
  ["QUIC", "HTTP/3 uses QUIC, a secure transport built on UDP."]
];
function selected(name) {
  const input = form.querySelector('input[name="' + name + '"]:checked');
  return input ? input.value : "";
}
function isCorrect(index) {
  if (index === 0) return form.elements.q1.value.trim().replace(/\s+/g," ").toLowerCase() === "hypertext transfer protocol";
  if (index === 1) return selected("q2") === "GET";
  if (index === 2) return selected("q3") === "NOT_FOUND";
  if (index === 3) return selected("q4") === "HTTP/2";
  if (index === 4) {
    const answers = [...form.querySelectorAll('input[name="q5"]:checked')].map(el => el.value).sort();
    return answers.join(",") === ["cache","https","stateless"].sort().join(",");
  }
  return selected("q6") === "QUIC";
}
form.addEventListener("submit", event => {
  event.preventDefault();
  let score = 0;
  const details = document.createElement("div");
  for (let i = 0; i < explanations.length; i++) {
    const correct = isCorrect(i);
    if (correct) score++;
    const item = document.createElement("div");
    item.className = "feedback " + (correct ? "correct" : "incorrect");
    const heading = document.createElement("p");
    const bold = document.createElement("strong");
    bold.textContent = "Question " + (i+1) + ": " + (correct ? "Correct — 1/1 point" : "Incorrect — 0/1 points");
    heading.appendChild(bold);
    const answer = document.createElement("p");
    answer.textContent = "Correct answer: " + explanations[i][0];
    const explanation = document.createElement("p");
    explanation.textContent = explanations[i][1];
    item.append(heading, answer, explanation);
    details.appendChild(item);
  }
  const passed = score >= 4;
  results.replaceChildren();
  const heading = document.createElement("h2");
  heading.className = passed ? "pass" : "fail";
  heading.textContent = passed ? "You passed!" : "Keep practicing!";
  const summary = document.createElement("p");
  summary.textContent = "Your score: " + score + "/6 (" + Math.round(score/6*100) + "%). Result: " + (passed ? "Pass" : "Fail") + ".";
  results.append(heading, summary, details);
  results.hidden = false;
  results.scrollIntoView({behavior:"smooth",block:"start"});
});
/* Reset clears both native form fields and the displayed score/feedback. */
form.addEventListener("reset", () => {
  results.replaceChildren();
  results.hidden = true;
});
