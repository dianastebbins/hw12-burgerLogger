// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-devour").on("click", function(event) {
    const id = $(this).data("id");
    const newDevoured = $(this).data("newdevour");
    console.log("newDevoured " + newDevoured);

    const newDevouredState = {
      devoured: newDevoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // // Send the DELETE request
  // $(".delete-burger").on("click", function(event) {
  //   const id = $(this).data("id"); // $this means "the actual thing that fired the event"...in this case, the button

  //   // Send the DELETE request.
  //   $.ajax("/api/burgers/" + id, {
  //     type: "DELETE"
  //   }).then(
  //     function() {
  //       // console.log("delete burger with id " + id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      burger_name: $("#addBurger").val().trim(),
      devoured: false
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new ");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
