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

        // create header and append to section if it exists
        if (section.headerTitle != null) {
            const header = document.createElement("div");
            header.innerHTML = `<h2 id="${section.id}">${section.headerTitle}</h2>`;
            cardSection.appendChild(header);
        }

        // create card section and append to section
        const content = document.createElement("div");
        cardSection.appendChild(content);

        // append section to container
        container.appendChild(cardSection);

        if (section.id == "col-3") {
            // three columns
            content.className = "col-3";
        }else if (section.id == "col-2") {
            // two columns
            content.className = "col-2";
        } else {
            // default one column
            content.className = "col-1";
        }

        container.appendChild(content);

        section.cardContent.forEach(item => {
            // create individual text card
            const text = document.createElement("div");
            text.className = "card";

            let textHTML = "";

            if (item.title) {
                textHTML += `<h3>${item.title}</h3>`;
            }

            if (item.subtitle) {
                textHTML += `<p class="subtitle">${item.subtitle}</p>`;
            }

            if (item.topics) {
                // create div for tags
                let tagSection = document.createElement("div");
                tagSection.className = "tag-section";

                // create string for tag html
                let htmlString = "";

                // create new button html per button
                item.topics.forEach(topic => {
                    // let temp = `<div class="theme"><p>${topic}</p></div>`;
                    let temp = `<p class="theme">${topic}</p>`
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
                textHTML += `<p>${item.description}</p>`;
            }

            if (item.buttons) {
                // create div for buttons
                let buttonSection = document.createElement("div");
                buttonSection.className = "button-space";

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