"use strict"

const projectCount = 9;

loadProjectsMainPageSkeleton();
loadProjectsMainPage();

function loadProjectsMainPageSkeleton() {
	for (let i = 1; i <= projectCount; i++) {
		let project = document.createElement("div");
		project.className = "row";

		let thumbnail = document.createElement("div");
		thumbnail.className = "thumbnail";
		project.appendChild(thumbnail);

		let information = document.createElement("div");
		information.className = "information";

		let title = document.createElement("div");
		title.innerText = "The qu ick brown fox jum ps ov er.";
		title.className = "title placeholder-font";

		let date = document.createElement("div");
		date.innerText = "Da te goes here"
		date.className = "date placeholder-font";

		let description = document.createElement("div");
		description.innerText = "asdfasdf";
		description.className = "description placeholder-font";

		let summary = document.createElement("div");
		summary.className = "summary";

		let projectPageLink = document.createElement("a");
		projectPageLink.innerText = "Read more";
		projectPageLink.className = "project-page-link";

		projectPageLink.addEventListener("click", function() {
			let projectChosen = this.parentElement;
			if (this.innerText === "Read more") {
				projectChosen.children[3].style.display = "block";
				projectChosen.children[3].className += " animated fadeIn";
				this.innerText = "Read less";
			} else {
				projectChosen.children[3].style.display = "none";
				this.innerText = "Read more";
			}
		}, false);
		
		let breakFloat = document.createElement("div");
		breakFloat.classList.add("break-float");

		information.appendChild(title);
		information.appendChild(date);
		information.appendChild(description);
		project.appendChild(information);
		project.appendChild(breakFloat);
		project.appendChild(summary);
		project.appendChild(projectPageLink);

		let projectsList = document.getElementById("projects-list");
		projectsList.appendChild(project);
	}
}

function loadProjectsMainPage() {
	let request = new XMLHttpRequest();
	request.open("GET", "/projects.json");
	request.send(null);

	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				let projects = JSON.parse(request.response).projects;
				let content = document.getElementById("projects-list");
				for (let i = 1; i <= projectCount; i++) {
					let child = content.childNodes[(projectCount) - i];

					let thumbnailImage = document.createElement("img");
					thumbnailImage.src = projects[i-1].thumbnail;
					
					let thumbnail = child.childNodes[0];
					thumbnail.appendChild(thumbnailImage);
					thumbnail.classList.remove("placeholder-for-image");

					let title = child.childNodes[1].childNodes[0];
					title.innerText = projects[i-1].title;
					title.classList.remove("placeholder-font");

					let date = child.childNodes[1].childNodes[1];
					date.innerText = projects[i-1].date;
					date.classList.remove("placeholder-font");

					let description = child.childNodes[1].childNodes[2];
					description.innerText = projects[i-1].description;
					description.classList.remove("placeholder-font");

					let summary = child.childNodes[3];

					let technologies = document.createElement("p");
					technologies.innerText = "Technologies: " + projects[i-1].technologies;
					technologies.className = "technologies";
					summary.appendChild(technologies);

					for (let s = 0; s < projects[i-1].summary.length; s++) {
						let summaryRow = document.createElement("div");
						summaryRow.className = "summary-row";
						summaryRow.innerText = projects[i-1].summary[s].text;
						summary.appendChild(summaryRow);
						let images = document.createElement("div");
						images.classList.add("summary-screenshots");
						if (projects[i-1].summary[s].images) {
							for (let si = 0; si < projects[i-1].summary[s].images.length; si++) {
								let image = document.createElement("img");
								image.setAttribute("src", "img/screenshots/" + projects[i-1].summary[s].images[si]);
								image.style["width"] = "100px";
								image.style["vertical-align"] = "top";
								images.appendChild(image);
							}
							summary.appendChild(images);
						}
					}

					if (projects[i-1].links !== undefined) {
						let demoLinks = document.createElement("p");
						for (let dlink = 0; dlink < projects[i-1].links.demo.length; dlink++) {
							let link = document.createElement("a");
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
