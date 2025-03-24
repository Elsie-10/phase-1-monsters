// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

document.addEventListener("DOMContentLoaded", () => {
    loadMonsters(); // Load the first 50 monsters
});

let page = 1; // Track current page

// 🟢 Load Monsters Function
async function loadMonsters() {
    try {
        const response = await fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`);
        const monsters = await response.json();

        const container = document.getElementById("monsters-container");

        monsters.forEach(monster => {
            const monsterDiv = document.createElement("div");
            monsterDiv.className = "monster";
            monsterDiv.innerHTML = `
                <h3>${monster.name}</h3>
                <p>Age: ${monster.age}</p>
                <p>${monster.description}</p>
            `;
            container.appendChild(monsterDiv);
        });
    } catch (error) {
        console.error("Error fetching monsters:", error);
    }
}

// 🟢 Create a New Monster
document.getElementById("monster-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const description = document.getElementById("description").value;

    const newMonster = { name, age: parseFloat(age), description };

    await fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMonster)
    });

    document.getElementById("monster-form").reset(); // Clear form
    loadMonsters(); // Refresh the list
});

// 🟠 Load More Monsters
document.getElementById("load-more").addEventListener("click", () => {
    page++; // Increase page number
    loadMonsters();
});
