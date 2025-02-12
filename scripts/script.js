const container = document.getElementById('card-container');

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
      data.forEach(item => {
        const header = document.createElement("div");
        header.innerHTML = `<h3 id="${item.id}">${item.headerTitle}</h3>`;
        container.appendChild(header);

            item.cardContent.forEach(item => {
                const content = document.createElement("div");
                content.className = "card";

                if (item.id == "cardsBtn") {
                    const content = document.createElement("div");
                    content.className = "card";
                    const buttons = document.createElement("button");
                    let buttonHTML = ``;
                    let newString = "";

                    item.buttons.forEach(item => {
                        let temp = `<button><a href=${item.buttonURL}>${item.buttonTitle}</a></button>`;
                        newString = newString + " " + temp;
                    })
                    buttonHTML = newString;

                    content.innerHTML = `
                        <h4>${item.title}</h4>
                        <p class="subtitle-1">${item.subtitle1}</p>
                        <p class="subtitle-2">${item.subtitle2}</p>
                        ${item.description}
                        <div class="spacer"></div>
                        <div class="button-space">
                        ${buttonHTML}
                        </div>
                    `;
                    container.appendChild(content);
                } else if (item.id == "cardsDesc") {
                    console.log("cardsDesc");
                    content.innerHTML = `
                        ${item.description}
                    `;
                    container.appendChild(content);
                } else {
                    const content = document.createElement("div");
                    content.className = "card";

                    content.innerHTML = `
                        <h4>${item.title}</h4>
                        <p class="subtitle-1">${item.subtitle1}</p>
                        <p class="subtitle-2">${item.subtitle2}</p>
                        ${item.description}
                    `;
                    container.appendChild(content);
                }

            })
    })
})
    .catch(error => {
      console.error("Error fetching the JSON: ", error);
      container.textContent = "Error loading content";
  });


// function changeNoun() {
//     const wordArray = ["a leader", "an artist", "a designer", 
//                         "a mentor", "a coder", "a linguist", "an innovator", 
//                         "a programmer", "a trailblazer", "a writer",
//                         "a poet", "a builder", "a researcher", 
//                         "a DIY-er", "a creator", "an editor", "a doer", 
//                         "an advocate", "a strategist", "an engineer", 
//                         "a developer", "a producer", "a maker", "a teacher"];
//     const colorArray = [];
//     let randomIndex = Math.floor(Math.random() * wordArray.length);
//     document.getElementById("button-text").innerHTML = wordArray[randomIndex];
// }

// // This function changes the background color of the button to a color in the palette
// function changeColor() {
//     let dustyBlue = "#BCCBDE";
//     let midBlue = "#C2DDE6";
//     let lightBlue = "#E6E9F0";
//     let darkPurple = "#431C5D";
//     let orange = "#E05915";
//     let yellow = "#CDD422";
//     const colorArray = [dustyBlue, midBlue, lightBlue, darkPurple, orange, yellow];
//     let randomColor = Math.floor(Math.random() * colorArray.length);

//     document.getElementById("my-button").style.backgroundColor = colorArray[randomColor];

//     if (colorArray[randomColor] == "#431C5D" || colorArray[randomColor] == "#E05915") {
//         document.getElementById("my-button").style.color = 'white';
//     } else {
//         document.getElementById("my-button").style.color = 'black';
//     }

// }