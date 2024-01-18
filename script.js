window.onload = function () {
    document.getElementById("formButton").addEventListener("click", toggleForm);
    document.getElementById("addToLeaderboardButton").addEventListener("click", addToLeaderboard);
};

function toggleForm() {
    var form = document.getElementById("leaderboardForm");
    var buttonText = document.getElementById("formButton");

    if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "flex";
        buttonText.textContent = "X";
    } else {
        form.style.display = "none";
        buttonText.textContent = "Show Form";
    }
}

function addToLeaderboard() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var country = document.getElementById("country").value;
    var score = parseInt(document.getElementById("score").value);

    if (isNaN(score)) {
        alert("Please enter a valid score.");
        return;
    }

    var leaderboardList = document.getElementById("leaderboardList");
    var listItem = document.createElement("li");
    var div = document.createElement("div");
    div.textContent = `${firstName} ${lastName} - Score: ${score}`;
    var incrementButton = createButton("+5", function () {
        score += 5;
        div.textContent = `${firstName} ${lastName} - Score: ${score}`;
        sortLeaderboard();
    });
    var decrementButton = createButton("-5", function () {
        score -= 5;
        div.textContent = `${firstName} ${lastName} - Score: ${score}`;
        sortLeaderboard();
    });

    listItem.appendChild(div);
    listItem.appendChild(incrementButton);
    listItem.appendChild(decrementButton);

    leaderboardList.appendChild(listItem);
    sortLeaderboard();
}

function sortLeaderboard() {
    var leaderboardList = document.getElementById("leaderboardList");
    var itemsArray = Array.from(leaderboardList.children);

    itemsArray.sort(function (a, b) {
        var scoreA = parseInt(a.querySelector("div").textContent.split(":")[1]);
        var scoreB = parseInt(b.querySelector("div").textContent.split(":")[1]);
        return scoreB - scoreA;
    });

    while (leaderboardList.firstChild) {
        leaderboardList.removeChild(leaderboardList.firstChild);
    }

    itemsArray.forEach(function (item) {
        leaderboardList.appendChild(item);
    });
}

function createButton(text, clickHandler) {
    var button = document.createElement("button");
    button.textContent = text;
    button.onclick = clickHandler;
    return button;
}
