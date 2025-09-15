const search = document.getElementById("search");
const resultsElem = document.getElementById("results");
const loading = document.getElementById("loading");

let searchTimeout;

search.addEventListener("input", async (e) => {
  const keyword = e.target.value.trim();

  clearTimeout(searchTimeout);

  if (!keyword) {
    resultsElem.innerHTML = "";
    loading.style.display = "none";
    return;
  }

  searchTimeout = setTimeout(async () => {
    loading.style.display = "block";

    try {
      const res = await fetch(
        `/quote/search?keyword=${encodeURIComponent(keyword)}`,
      );

      loading.style.display = "none";
      resultsElem.innerHTML = "";

      if (!res.ok) {
        showNoResults("No quotes found");
        return;
      }

      const data = await res.json();

      if (Array.isArray(data.results) && data.results.length > 0) {
        displayResults(data.results);
      } else {
        showNoResults("No quotes found");
      }
    } catch (err) {
      loading.style.display = "none";
      console.error("Error:", err);
      showNoResults("Something went wrong. Please try again.");
    }
  }, 300);
});

function displayResults(results) {
  resultsElem.innerHTML = results
    .map(
      (q, index) => `
                    <li class="result-item" style="animation-delay: ${index * 0.1}s">
                        <div class="quote-text">${escapeHtml(q.Quote)}</div>
                        <div class="quote-author">${escapeHtml(q.Author)}</div>
                    </li>
                `,
    )
    .join("");

  resultsElem.classList.add("fade-in");
}

function showNoResults(message) {
  resultsElem.innerHTML = `<li class="no-results">${message}</li>`;
  resultsElem.classList.add("fade-in");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

window.addEventListener("load", () => {
  search.focus();
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    search.focus();
  }
});
