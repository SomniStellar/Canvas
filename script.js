const businessCard = document.getElementById("business-card");

if (businessCard) {
  businessCard.addEventListener("click", () => {
    const isFlipped = businessCard.classList.toggle("is-flipped");
    businessCard.setAttribute("aria-pressed", String(isFlipped));
  });
}
