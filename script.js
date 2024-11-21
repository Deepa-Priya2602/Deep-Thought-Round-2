document.addEventListener("DOMContentLoaded", () => {
  // Fetch the task data from a local JSON file or API
  fetch("taskData.json")
    .then((response) => response.json())
    .then((taskData) => renderTask(taskData))
    .catch((error) => console.error("Error fetching data:", error));
});

function renderTask(task) {
  // Populating task title and description
  document.getElementById("task-title").innerText =
    "Technical Project Management";
  document.getElementById("task-heading").innerText = task.task_title;
  document.getElementById("task-description").innerText = task.task_description;

  // adding items in side bar
  const listOfItems = document.getElementById("sidebar");
  task.assets.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerText = item.asset_title;
    listOfItems.appendChild(listItem);
  });

  //making boxes and adding content
  const assetsGrid = document.getElementById("assets-grid");
  task.assets.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");

    const cardHeader = `
            <div class="card-header">
                <h2>${item.asset_title}</h2>
                <i class="info-icon" title="More information">ℹ</i>
            </div>
        `;

    let content = ""; //decrp + rest_content
    if (item.asset_content_type === "video") {
      content = `
                <iframe src="${item.asset_content}" title="${item.asset_title}" allowfullscreen></iframe>
            `;
    } else if (item.asset_content_type === "article") {
      content = `<a href="${item.asset_content}" target="_blank">Read More</a>`;
    } else if (item.asset_content_type === "threadbuilder") {
      content = `<textarea placeholder="Write your thoughts here..."></textarea>`;
    }
    const description = `
            <p class="description"><strong>Description:</strong> ${item.asset_description}</p>
        `;
    //put all the content inside the box
    box.innerHTML = cardHeader + description + content;
    assetsGrid.appendChild(box);
  });

  const switchSidebar = document.getElementById("switch_sidebar");
  const sidebar = document.getElementById("sidebar");

  switchSidebar.addEventListener("click", () => {
    if (sidebar.style.left === "0px") {
      sidebar.style.left = "200px";
    } else {
      sidebar.style.left = "0px";
    }
  });
}
