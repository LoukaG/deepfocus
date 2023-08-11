let blockSites = [];

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["blockSites"]).then((result) => {
    if (result.blockSites != undefined) {
      blockSites = result.blockSites;
      for (const url of blockSites) {
        let id = blockSites.indexOf(url);
        const blockSitesTable = document.getElementById("blockSites");

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td class="url-site">${url}</td>
          <td><button class="btn btn--primary" id="remove-${id}">-</button></td>
        `;

        blockSitesTable.appendChild(newRow);
        addRemoveButtonListenner(id);
      }
      document
        .getElementById("addUrlBtn")
        .addEventListener("click", function () {
          let urlInput = document.getElementById("addUrl");
          let url = urlInput.value.toLowerCase();

          if (blockSites.includes(url)) {
            //TODO vrai message erreur
            alert("Ce site est déjà bloqué");
            return;
          }

          if (url != "") {
            let id = blockSites.length;
            const blockSitesTable = document.getElementById("blockSites");

            const newRow = document.createElement("tr");
            newRow.innerHTML = `
              <td class="url-site">${url}</td>
              <td><button class="btn btn--primary" id="remove-${id}">-</button></td>
            `;

            blockSitesTable.appendChild(newRow);

            blockSites.push(url);
            chrome.storage.sync.set({ blockSites: blockSites }, function () {
              console.log("Variable saved to local storage.");
            });
            document.getElementById("addUrl").value = "";
            addRemoveButtonListenner(id);
          }
        });
    }
  });
});

function addRemoveButtonListenner(id) {
  document
    .getElementById("remove-" + id)
    .addEventListener("click", function () {
      let urlElement = this.parentNode.parentNode.querySelector(".url-site");
      let url = urlElement.textContent;
      let index = blockSites.indexOf(url);

      if (index !== -1) {
        blockSites.splice(index, 1);
        chrome.storage.sync.set({ blockSites: blockSites }, function () {
          urlElement.parentNode.parentNode.removeChild(urlElement.parentNode);
        });
      }
    });
}
