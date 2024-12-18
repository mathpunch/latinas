const Frame = document.querySelector(".Projects-Frame");
const HAF = document.querySelectorAll(".hideAfterFullscreen");
const IFrame = document.querySelector(".Projects-IFrame");

async function addGames() {
  try {
    const cdn = await (await fetch("./Hosting/CDN.json")).json();
    const games = await (await fetch(cdn + "list.json")).json();

    // Filter out all games except 'mathpunch V2' and 'Roblox'
    const filteredGames = games.filter(game => game.game === "mathpunch V2");

    // Add the game buttons manually
    const manualGames = [
      { game: "Roblox", gameroot: "https://mathpunch.github.io/grasshopper/" },
      { game: "Bitlife", gameroot: "https://mathpunch.github.io/panda/" },
      { game: "Stickmanhook", gameroot: "https://mathpunch.github.io/kitty/" },
      { game: "Super Mario 64", gameroot: "https://mathpunch.github.io/dog/" },
      { game: "Tiny Fishing", gameroot: "https://mathpunch.github.io/bear/" },
      { game: "Tap Tap Shots", gameroot: "https://mathpunch.github.io/snake/" },
      { game: "Drive Mad", gameroot: "https://mathpunch.github.io/shark/" },
      { game: "Wordle Unlimited", gameroot: "https://mathpunch.github.io/turtle/" },
      { game: "Fruit Ninja", gameroot: "https://mathpunch.github.io/doggy/" },
      { game: "Rooftop Snipers", gameroot: "https://mathpunch.github.io/fox/" },
      { game: "Tunnel Rush", gameroot: "https://mathpunch.github.io/bat/" },
      { game: "Burrito Bison", gameroot: "https://mathpunch.github.io/wolf/" },
      { game: "Trash Truck Simulator", gameroot: "https://mathpunch.github.io/monkey/" }
    ];

    filteredGames.push(...manualGames);

    for (const game of filteredGames) {
      const project = document.createElement("div");
      project.className = "Projects-Project";
      project.innerHTML = `
        <img src="${cdn}Icons/${game.game.replace(
        /[.\s]/g,
        ""
      )}.png" loading="lazy" onerror="this.src='./Assests/Imgs/NoIcon.png'"/>
        <h1>${game.game}</h1>`;
      document.querySelector(".Projects-Container").appendChild(project);

      project.addEventListener("click", () => {
        window.open(game.gameroot, "_blank");
      });
    }
  } catch (error) {
    console.error(error);
  }
}

Frame.querySelector(".Projects-FrameBar").addEventListener("click", (event) => {
  if (event.target.id === "close") {
    HAF.forEach((element) => element.classList.remove("hidden"));
    Frame.classList.add("hidden");
    IFrame.src = "";
  } else if (event.target.id === "fullscreen") {
    const requestFullscreen =
      IFrame.requestFullscreen ||
      IFrame.webkitRequestFullscreen ||
      IFrame.msRequestFullscreen;
    requestFullscreen.call(IFrame);
  } else if (event.target.id === "link") window.open(IFrame.src);
});

document.getElementById("GameSearchBar").addEventListener("input", () => {
  const searchedup = document
    .getElementById("GameSearchBar")
    .value.trim()
    .toLowerCase();
  const gameholders = document.querySelector(".Projects-Container");
  const gmae = gameholders.querySelectorAll(".Projects-Project");

  gmae.forEach((game) => {
    var gamenames = game.querySelector("h1").innerText.trim().toLowerCase();
    if (gamenames.includes(searchedup)) game.classList.remove("hidden");
    else game.classList.add("hidden");
  });
});

addGames();
