document.getElementById("search-btn").addEventListener("click", function () {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let modalContent = '';
            let found = false;

            // Search through countries
            data.countries.forEach(country => {
                if (country.country.toLowerCase().includes(searchTerm)) {
                    found = true;
                    modalContent += `<h2>${country.country}</h2>`;
                    country.cities.forEach(city => {
                        modalContent += `
                            <div class="city-modal">
                                <img src="${city.img}" alt="${city.name}">
                                <h2>${city.name}</h2>
                                <p>${city.description}</p>
                            </div>
                        `;
                    });
                }
            });

            // Search through recommendations
            data.recommendations.forEach(rec => {
                if (rec.category.toLowerCase().includes(searchTerm)) {
                    found = true;
                    modalContent += `<h2>${rec.category}</h2>`;
                    rec.items.forEach(item => {
                        modalContent += `
                            <div class="city-modal">
                                <img src="${item.img}" alt="${item.name}">
                                <h2>${item.name}</h2>
                                <p>${item.description}</p>
                            </div>
                        `;
                    });
                }
            });

            // Show modal or no results message
            const modalContainer = document.getElementById("modal-container");
            if (found) {
                modalContainer.innerHTML = modalContent;
                modalContainer.style.visibility = "visible"; // Show modal
            } else {
                modalContainer.innerHTML = "<p>No results found</p>";
                modalContainer.style.visibility = "visible"; // Show modal
            }
        });
});

document.getElementById("clear-btn").addEventListener("click", function () {
    document.getElementById("search-input").value = "";
    document.getElementById("modal-container").style.visibility = "hidden"; // Hide modal
});










