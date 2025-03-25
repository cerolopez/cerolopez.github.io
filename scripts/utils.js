function copyToClipboard() {
    const email = "lopezceciliarose@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const textElement = document.getElementById("copy-text");
        textElement.innerHTML = "<strong>copied!</strong>";
        setTimeout(() => {
            textElement.innerHTML = "<strong>click to copy</strong>";
        }, 1500);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}