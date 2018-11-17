// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".devour").on("click", function (event) {
        console.log($(this).data("id"))
        var id = $(this).data("id");
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: {devoured: true}
        }).then(
            function () {
                console.log("devoured", id);
                // Reload the page to get the updated list
                location.reload();
            }
        )
    });
    $("#submit").on("click", function (event) {
        // Form validation: Require name
        function validateForm() {
            var isValid = true;
            $("#burger_name").each(function () {
                if ($(this).val() === "") {
                    isValid = false;
                }
            });
            return isValid;
        }
        // If validation passes
        if (validateForm()) {
            // Create an object of the user's data
            var name = $("#burger_name").val().trim()
            var burgerData = {
                name: name
            };
            // AJAX post the data to the friends API.
            $.post("/api/burgers", burgerData, function (data) {
                window.location.reload(true);
            });
        }
        else {
            alert("Your burger is missing a name!");
        }
    });
});
