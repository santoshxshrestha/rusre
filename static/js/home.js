const nextBtn = document.getElementById("next");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

async function fetchRandomQuote() {
  try {
    nextBtn.disabled = true;
    quoteEl.classList.add("loading");
    authorEl.classList.add("loading");
    const response = await fetch("/quote/random");
    if (!response.ok) throw new Error("Bad network response");
    const data = await response.json();
    quoteEl.textContent = data.Quote || "No quote available.";
    authorEl.textContent = data.Author || "Unknown";
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    quoteEl.textContent = "Failed to load quote.";
    authorEl.textContent = "Try again.";
  } finally {
    quoteEl.classList.remove("loading");
    authorEl.classList.remove("loading");
    nextBtn.disabled = false;
  }
}

nextBtn.addEventListener("click", fetchRandomQuote);
window.addEventListener("load", fetchRandomQuote);

