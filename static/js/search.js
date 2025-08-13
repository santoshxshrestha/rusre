const search = document.getElementById("search");

search.addEventListener("input", function (event) {
  console.log("current value", event.target.value);
});
