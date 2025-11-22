const search = document.getElementById("search");
const resultsElem = document.getElementById("results");
const loading = document.getElementById("loading");
const categorySelect = document.getElementById("filter-options");

let searchTimeout;
let categoriesLoaded = false;

async function fetchCategories() {
  try {
    const res = await fetch("/catagory");
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data.catagories)) {
      data.catagories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
      });
      categoriesLoaded = true;
    }
  } catch (e) {
    console.error("Failed to load categories", e);
  }
}

function triggerSearch() {
  const keyword = search.value.trim();
  const category = categorySelect.value.trim();

  clearTimeout(searchTimeout);

  if (!keyword && !category) {
    resultsElem.innerHTML = "";
    loading.style.display = "none";
    return;
  }

  searchTimeout = setTimeout(async () => {
    loading.style.display = "block";

    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (category) params.append("category", category);

    try {
      const res = await fetch(`/quote/search?${params.toString()}`);

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
}

search.addEventListener("input", triggerSearch);
categorySelect.addEventListener("change", triggerSearch);

function displayResults(results) {
  const frag = document.createDocumentFragment();
  results.forEach((q, index) => {
    const li = document.createElement("li");
    li.className = "result-item";
    li.style.animationDelay = `${index * 0.1}s`;
    li.setAttribute("role", "listitem");

    li.innerHTML = `
      <div class="quote-text">${escapeHtml(q.Quote)}</div>
      <div class="quote-author">${escapeHtml(q.Author)}</div>
      <div class="quote-category">${escapeHtml(q.Category)}</div>
    `;
    frag.appendChild(li);
  });
  resultsElem.innerHTML = "";
  resultsElem.appendChild(frag);
  resultsElem.classList.add("fade-in");
}

function showNoResults(message) {
  const li = document.createElement("li");
  li.className = "no-results";
  li.textContent = message;
  li.setAttribute("role", "status");
  resultsElem.innerHTML = "";
  resultsElem.appendChild(li);
  resultsElem.classList.add("fade-in");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

window.addEventListener("load", () => {
  search.focus();
  if (!categoriesLoaded) {
    fetchCategories();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    search.focus();
  }
});
