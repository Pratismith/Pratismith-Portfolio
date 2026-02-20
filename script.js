window.onload = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


/* Init ParticlesJS */
const particlesContainer = document.getElementById("particles-js");
if (particlesContainer) {
  // Determine correct path for particles.json based on location
  const configPath = window.location.pathname.includes("/blogs/") 
    ? "../particles.json" 
    : "particles.json";

  particlesJS.load("particles-js", configPath, function () {
    console.log("Particles.js loaded");
  });
}



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

if (input && terminalBody) {
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
}

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


/* Mobile Menu Toggle */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    
    // Animate Links
    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        // slight delay for staggering effect handled via CSS transition-delay
        // but we can add keyframes if we wanted more complex animation
      }
    });

    // Toggle Hamburger Icon (optional: change to X)
    hamburger.classList.toggle("toggle");
  });
}

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});


/* Scroll Animations */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});


/* Terminal Typing Effect */
function typeText(element, text, speed = 50, callback) {
  let i = 0;
  element.innerHTML = "";
  let timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      terminalBody.scrollTop = terminalBody.scrollHeight;
    } else {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

if (terminalBody) {
  // Clear initial static content (except input)
  // We will reconstruct the welcome message dynamically
  const inputLine = terminalBody.querySelector(".input-line");
  terminalBody.innerHTML = ""; // Clear everything
  
  // Create lines
  const line1 = document.createElement("div");
  line1.classList.add("line");
  terminalBody.appendChild(line1);

  const line2 = document.createElement("div");
  line2.classList.add("line");
  
  const separator = document.createElement("div");
  separator.classList.add("line");
  separator.textContent = "---------------------------------------------";

  // Sequence
  typeText(line1, "Welcome to Pratismith Gogoi's Portfolio!", 40, () => {
     terminalBody.appendChild(line2);
     typeText(line2, "Type 'help' to see available commands.", 30, () => {
         terminalBody.appendChild(separator);
         terminalBody.appendChild(inputLine);
         inputLine.querySelector("input").focus();
     });
  });
}



