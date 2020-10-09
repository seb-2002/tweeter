$(document).ready(() => {
  let textarea = $("section.new-tweet form textarea");

  textarea.on("keyup", function () {
    // counting characters
    let maxCharacters = 140;
    let characters = $(this).val().length;
    let count = maxCharacters - characters;

    // targeting the html to change the text as the count changes
    let clientCounter = $(this).closest("form").find("output");
    clientCounter.text(count);

    // turn the clientCounter red when the count is negative
    if (count < 0) {
      clientCounter.addClass("warning");
    } else {
      clientCounter.removeClass("warning");
    }
  });
});
