let container = document.getElementById('card-container');

// create path based on page title
let pageTitle = document.title;
pageTitle = pageTitle.toLowerCase();
let prefix = "../";
let suffix = ".json"
let path = prefix.concat("", pageTitle, "", suffix);

fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error(`File not found: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      data.forEach(section => {
        // create section
        const cardSection = document.createElement("div");
        cardSection.className = "py-10";
        
        // create header and append to section
        const header = document.createElement("div");
        header.innerHTML = `<h3 class="text-2xl font-semibold" id="${section.id}">${section.headerTitle}</h3>`;
        cardSection.appendChild(header);

        // create card section and append to section
        const content = document.createElement("div");
        cardSection.appendChild(content);

        // append section to container
        container.appendChild(cardSection);

        if (section.id == "col-3") {
            // three columns
            content.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6";
        } else if (section.id == "col-2") {
            // two columns
            content.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6";
        } else {
            // default one column
            content.className = "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6";
        }

        container.appendChild(content);

            section.cardContent.forEach(item => {
                // create individual text card
                const text = document.createElement("div");
                text.className = "bg-white p-2 sm:p-4 md:p-8 lg:p-12 shadow-md rounded-lg";

                let textHTML = "";

                if (item.title) {
                    textHTML += `<h4 class="text-xl font-semibold">${item.title}</h4>`;
                }

                if (item.subtitle) {
                    textHTML += `<p class="text-sm font-light">${item.subtitle}</p><br>`;
                }

                if (item.topics) {
                    // create div for tags
                    let tagSection = document.createElement("div");
                    tagSection.className = "flex flex-wrap flex-row md:flex-row gap-2 pb-5";

                    // create string for tag html
                    let htmlString = "";

                    // create new button html per button
                    item.topics.forEach(topic => {
                        let temp = `<p class="bg-[#E0E0E0] text-black px-4 py-2 rounded-full text-xs">${topic}</p>`;
                        htmlString += " " + temp;
                    });

                    // put tag html inside div
                    tagSection.innerHTML = htmlString;

                    // convert final div to string
                    let finalString = tagSection.outerHTML;

                    // add string to final card html
                    textHTML += finalString;
                }

                if (item.description) {
                    textHTML += `<p class="text-base">${item.description}</p><br>`;
                }

                if (item.buttons) {
                    // create div for buttons
                    let buttonSection = document.createElement("div");
                    buttonSection.className = "flex flex-col md:flex-row gap-2";

                    // create string for button html
                    let newString = "";

                    // create new button html per button
                    item.buttons.forEach(button => {
                        let temp = `<button class="btn"><a href=${button.buttonURL}>${button.buttonTitle}</a></button>`;
                        newString += " " + temp;
                    });

                    // put tag html inside div
                    buttonSection.innerHTML = newString;

                    // convert final div to string
                    let finalString = buttonSection.outerHTML;

                    // add string to final card html
                    textHTML += finalString;
                }

                text.innerHTML = textHTML;

                // append text to card
                content.appendChild(text);
            })
    })
})
    .catch(error => {
      console.error("Error fetching the JSON: ", error);
      container.textContent = "Error loading content";
  });