document.addEventListener("DOMContentLoaded", function () {
  const filterDropdown = document.getElementById("filter-options");

  // Fetch filter options from the JSON endpoint
  fetch("/catagory")
    .then((response) => response.json())
    .then((data) => {
      // Clear existing options
      filterDropdown.innerHTML = "";

      // Populate dropdown with categories
      data.catagories.forEach((category) => {
        const option = document.createElement("option");
        // option.value = category; // Use category ID or name
        option.textContent = category;
        filterDropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching filter options:", error);
      filterDropdown.innerHTML =
        '<option value="">Error loading filters</option>';
    });
});

document
  .getElementById("filter-options")
  .addEventListener("change", function () {
    const filter = this.value;
    const searchQuery = document.getElementById("search").value;

    // Call a function to fetch and display filtered results
    applyFilter(searchQuery, filter);
  });

function applyFilter(query, filter) {
  fetch(`/search?query=${query}&filter=${filter}`)
    .then((response) => response.json())
    .then((data) => {
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = ""; // Clear previous results

      data.results.forEach((result) => {
        const li = document.createElement("li");
        li.textContent = result.text;
        resultsContainer.appendChild(li);
      });
    });
}
