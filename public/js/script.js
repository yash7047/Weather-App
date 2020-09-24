var knowButton = document.getElementById("know");
var res = document.querySelector(".result");
var res1 = document.querySelector(".result1");

knowButton.addEventListener("click", function () {
    if (this.textContent === "Show More") {
        res.style.display = "block";
        res1.style.display = "none";
        this.textContent = "Show Less";
    } else {
        res1.style.display = "block";
        res.style.display = "none";
        this.textContent = "Show More";
    }
});