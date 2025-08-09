const nextButton = document.getElementsByClassName("next");
const quote = document.getElementsByClassName("quote");
const author = document.getElementsByClassName("author");

nextButton[0].addEventListener("click", async () => {
  try {
    const response = await fetch("/quote/random");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    quote[0].textContent = data.Quote;
    author[0].textContent = data.Author;
  } catch (error) {
    console.error("Failed to fetch quote:", error);
  }
});
