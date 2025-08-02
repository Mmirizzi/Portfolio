const projectsGrid = document.querySelector(".projects-grid");

fetch("https://api.github.com/users/Mmirizzi/repos")
  .then((response) => response.json())
  .then((repos) => {
    const featuredRepos = repos.filter(repo => 
      repo.topics && repo.topics.includes("featured")
    );

    featuredRepos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";

      const name = repo.name.replace(/[-_]/g, " ");
      const description = repo.description || "Nessuna descrizione disponibile";

      const html = `
        <h3>${name}</h3>
        <p>${description}</p>
        <p>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Live Demo</a> | ` : ""}
          <a href="${repo.html_url}" target="_blank">Codice su GitHub</a>
        </p>
      `;

      card.innerHTML = html;
      projectsGrid.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Errore nel recupero dei repository:", error);
    projectsGrid.innerHTML = "<p>Impossibile caricare i progetti al momento.</p>";
  });
