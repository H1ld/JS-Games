// Updates game color variables
function gameColorUpdate()  {
    colorLetterWritten = document.getElementById("colorLetterWritten").value;
    unwrittenLetterColor = document.getElementById("unwrittenLetterColor").value;
    document.getElementById("popupHomepage").style.display = "none";
    document.getElementById("containerGame").style.display = "block";
}
