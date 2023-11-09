"use strict"

var projectCount = 8;

loadProjectsMainPageSkeleton();
loadProjectsMainPage();

function loadProjectsMainPageSkeleton() {
	for (var i = 1; i <= projectCount; i++) {
		var project = document.createElement("div");
		project.className = "row";

		var thumbnail = document.createElement("div");
		thumbnail.className = "thumbnail";
		project.appendChild(thumbnail);

		var information = document.createElement("div");
		information.className = "information";

		var title = document.createElement("div");
		title.innerText = "The qu ick brown fox jum ps ov er.";
		title.className = "title placeholder-font";

		var date = document.createElement("div");
		date.innerText = "Da te goes here"
		date.className = "date placeholder-font";

		var description = document.createElement("div");
		description.innerText = "asdfasdf";
		description.className = "description placeholder-font";

		var summary = document.createElement("div");
		summary.className = "summary";

		var projectPageLink = document.createElement("a");
		projectPageLink.innerText = "Read more";
		projectPageLink.className = "project-page-link";

		projectPageLink.addEventListener("click", function() {
			var projectChosen = this.parentElement;
			if (this.innerText === "Read more") {
				projectChosen.children[3].style.display = "block";
				projectChosen.children[3].className += " animated fadeIn";
				this.innerText = "Read less";
			} else {
				projectChosen.children[3].style.display = "none";
				this.innerText = "Read more";
			}
		}, false);
		
		var breakFloat = document.createElement("div");
		breakFloat.classList.add("break-float");

		information.appendChild(title);
		information.appendChild(date);
		information.appendChild(description);
		project.appendChild(information);
		project.appendChild(breakFloat);
		project.appendChild(summary);
		project.appendChild(projectPageLink);

		var projectsList = document.getElementById("projects-list");
		projectsList.appendChild(project);
	}
}

function loadProjectsMainPage() {
	var request = new XMLHttpRequest();
	request.open("GET", "/projects.json");
	request.send(null);

	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				var projects = JSON.parse(request.response).projects;
				var content = document.getElementById("projects-list");
				for (var i = 1; i <= projectCount; i++) {
					var child = content.childNodes[(projectCount) - i];

					var thumbnailImage = document.createElement("img");
					thumbnailImage.src = projects[i-1].thumbnail;
					
					var thumbnail = child.childNodes[0];
					thumbnail.appendChild(thumbnailImage);
					thumbnail.classList.remove("placeholder-for-image");

					var title = child.childNodes[1].childNodes[0];
					title.innerText = projects[i-1].title;
					title.classList.remove("placeholder-font");

					var date = child.childNodes[1].childNodes[1];
					date.innerText = projects[i-1].date;
					date.classList.remove("placeholder-font");

					var description = child.childNodes[1].childNodes[2];
					description.innerText = projects[i-1].description;
					description.classList.remove("placeholder-font");

					var summary = child.childNodes[3];

					var technologies = document.createElement("p");
					technologies.innerText = "Technologies: " + projects[i-1].technologies;
					technologies.className = "technologies";
					summary.appendChild(technologies);

					for (var s = 0; s < projects[i-1].summary.length; s++) {
						var summaryRow = document.createElement("div");
						summaryRow.className = "summary-row";
						summaryRow.innerText = projects[i-1].summary[s].text;
						summary.appendChild(summaryRow);
						var images = document.createElement("div");
						images.classList.add("summary-screenshots");
						if (projects[i-1].summary[s].images) {
							for (var si = 0; si < projects[i-1].summary[s].images.length; si++) {
								var image = document.createElement("img");
								image.setAttribute("src", "img/screenshots/" + projects[i-1].summary[s].images[si]);
								image.style["width"] = "100px";
								image.style["vertical-align"] = "top";
								images.appendChild(image);
							}
							summary.appendChild(images);
						}
					}

					if (projects[i-1].links !== undefined) {
						var demoLinks = document.createElement("p");
						for (var dlink = 0; dlink < projects[i-1].links.demo.length; dlink++) {
							var link = document.createElement("a");
							link.innerText = projects[i-1].links.demo[dlink];
							link.href = projects[i-1].links.demo[dlink];
							link.setAttribute("target", "_blank");
							link.className = "link";
							demoLinks.appendChild(link);
						}
						demoLinks.className = "demo-links";
						summary.appendChild(demoLinks);
					}
				}
			}
		}
	}
}
