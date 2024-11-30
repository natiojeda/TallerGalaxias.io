document.getElementById("searchButton").addEventListener("click", () => {
    const searchValue = document.getElementById("searchInput").value.trim();

    if (!searchValue) {
        alert("Please enter a search term.");
        return;
    }

    fetch(`https://images-api.nasa.gov/search?q=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            const items = data.collection.items;

            if (items.length === 0) {
                displayNoResults();
            } else {
                displayResults(items);
            }
        })
        .catch(error => {
            console.error("Error fetching data from NASA API:", error);
            alert("An error occurred while fetching data. Please try again later.");
        });
});

function displayNoResults() {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = `
        <div class="col-12">
            <p class="text-center text-muted">No results found. Try a different search term.</p>
        </div>
    `;
}

function displayResults(items) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; 

    items.forEach(item => {
        const data = item.data[0];
        const links = item.links || [];

        if (links.length > 0) {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${links[0].href}" class="card-img-top" alt="${data.title}">
                    <div class="card-body">
                        <h5 class="card-title">${data.title || "No Title Available"}</h5>
                        <p class="card-text">${data.description || "No Description Available"}</p>
                        <p class="text-muted">${data.date_created ? new Date(data.date_created).toLocaleDateString() : "No Date"}</p>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(card);
        }
    });
}
