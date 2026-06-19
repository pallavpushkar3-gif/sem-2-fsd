
function renderTeam() {
  var grid = document.getElementById("team-grid");

  for (var i = 0; i < teamMembers.length; i++) {
    var member = teamMembers[i];

    // Build skill badges
    var skillsHTML = "";
    for (var j = 0; j < member.skills.length; j++) {
      skillsHTML += '<span class="skill-badge">' + member.skills[j] + "</span>";
    }

    // Build the card HTML
    var card = '<div class="team-card">';
    card += '<div class="avatar-placeholder">' + member.initials + "</div>";
    card += "<h3>" + member.name + "</h3>";
    card += "<p>" + member.bio + "</p>";
    card += '<div class="skills">' + skillsHTML + "</div>";
    card += '<a href="' + member.github + '" target="_blank">GitHub →</a>';
    card += "</div>";

    grid.innerHTML += card;
  }
}

// 4. RENDER PROJECT CARDS
function renderProjects() {
  var grid = document.getElementById("projects-grid");

  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];

    var card = '<div class="project-card">';
    card += "<h3>" + project.name + "</h3>";
    card += "<p>" + project.description + "</p>";
    card += '<a href="' + project.link + '">View project →</a>';
    card += "</div>";

    grid.innerHTML += card;
  }
}