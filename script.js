window.onload = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


/* Init ParticlesJS */
particlesJS.load("particles-js", "particles.json", function () {
  console.log("Particles.js loaded");
});

const input = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");

const commands = {
  help: "Available commands: cd, ls, clear, projects, resume, github, linkedin",
  cd: "Use: cd [about], cd [projects], cd [contact]",
  ls: `
    <span class="cmd-link" data-cmd="projects">Projects</span>  
    <span class="cmd-link" data-cmd="resume">Resume</span>  
    <span class="cmd-link" data-cmd="github">Github</span>  
    <span class="cmd-link" data-cmd="linkedin">LinkedIn</span>`,
};

function handleCommand(command) {
  let outputLine = document.createElement("div");
  outputLine.classList.add("line");

  // handle clear
  if (command === "clear") {
    terminalBody.innerHTML = "";
    terminalBody.appendChild(input.parentElement);
    return;
  }

  // handle cd commands
  if (command.startsWith("cd ")) {
    const arg = command.split(" ")[1];
    if (arg === "projects") {
      outputLine.innerHTML = "Opening Projects page...";
      terminalBody.insertBefore(outputLine, input.parentElement);
      setTimeout(() => (window.location.href = "projects.html"), 800);
      return;
    } else if (arg === "about") {
      outputLine.innerHTML = "Opening About page...";
      terminalBody.insertBefore(outputLine, input.parentElement);
      setTimeout(() => (window.location.href = "about.html"), 800);
      return;
    } else if (arg === "contact") {
      outputLine.innerHTML = "Opening Contact page...";
      terminalBody.insertBefore(outputLine, input.parentElement);
      setTimeout(() => (window.location.href = "contact.html"), 800);
      return;
    } else {
      outputLine.innerHTML = `Directory not found: ${arg}`;
      terminalBody.insertBefore(outputLine, input.parentElement);
      return;
    }
  }

  // direct commands
  if (command === "projects") {
    outputLine.innerHTML = "Opening Projects page...";
    terminalBody.insertBefore(outputLine, input.parentElement);
    setTimeout(() => (window.location.href = "projects.html"), 800);
  } else if (command === "resume") {
    outputLine.innerHTML = "Downloading Resume...";
    terminalBody.insertBefore(outputLine, input.parentElement);
    setTimeout(() => window.open("assets/resume.pdf", "_blank"), 800);
  } else if (command === "github") {
    outputLine.innerHTML = "Redirecting to GitHub...";
    terminalBody.insertBefore(outputLine, input.parentElement);
    setTimeout(() => window.open("https://github.com/Pratismith", "_blank"), 800);
  } else if (command === "linkedin") {
    outputLine.innerHTML = "Redirecting to LinkedIn...";
    terminalBody.insertBefore(outputLine, input.parentElement);
    setTimeout(() => window.open("https://www.linkedin.com/in/pratismith-gogoi/", "_blank"), 800);
  } else if (commands[command]) {
    // predefined help/ls
    outputLine.innerHTML = commands[command];
    terminalBody.insertBefore(outputLine, input.parentElement);
  } else {
    // invalid
    outputLine.innerHTML = `Command not found: ${command}`;
    terminalBody.insertBefore(outputLine, input.parentElement);
  }
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let command = input.value.trim().toLowerCase();
    if (command.length === 0) return;

    const newLine = document.createElement("div");
    newLine.classList.add("line");
    newLine.innerHTML = `<span class="prompt">$</span> ${command}`;
    terminalBody.insertBefore(newLine, input.parentElement);

    handleCommand(command);

    input.value = "";
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

// Clickable ls results
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cmd-link")) {
    let cmd = e.target.getAttribute("data-cmd");
    // instead of fake keypress, directly run it
    const newLine = document.createElement("div");
    newLine.classList.add("line");
    newLine.innerHTML = `<span class="prompt">$</span> ${cmd}`;
    terminalBody.insertBefore(newLine, input.parentElement);

    handleCommand(cmd);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

// Always scroll to top when Home is clicked
document.querySelectorAll(".home-link").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    // make sure it always goes to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, null, "index.html"); // optional: reset URL
  });
});

// // Hover Preview Images
// document.querySelectorAll(".hover-preview").forEach(link => {
//   link.addEventListener("mouseenter", function() {
//     let imgUrl = this.getAttribute("data-img");
//     let preview = document.createElement("div");
//     preview.classList.add("img-preview");
//     preview.style.backgroundImage = `url(${imgUrl})`;
//     this.appendChild(preview);
//   });

//   link.addEventListener("mouseleave", function() {
//     let preview = this.querySelector(".img-preview");
//     if (preview) preview.remove();
//   });
// });



// Project hover image preview
document.querySelectorAll(".hover-preview").forEach(card => {
  card.addEventListener("mouseenter", function() {
    let imgUrl = this.getAttribute("data-img");
    let preview = document.createElement("div");
    preview.classList.add("img-preview");
    preview.style.backgroundImage = `url(${imgUrl})`;
    document.body.appendChild(preview);

    // Fade in
    setTimeout(() => preview.classList.add("show"), 10);
  });

  card.addEventListener("mouseleave", function() {
    let preview = document.querySelector(".img-preview");
    if (preview) {
      preview.classList.remove("show");
      setTimeout(() => preview.remove(), 400); // fade out
    }
  });
});
