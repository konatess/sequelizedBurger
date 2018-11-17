// DEPENDENCIES
var express = require("express");
var burgerDo = require("../models/burger");

// Sets up router
var router = express.Router();

// ROUTES
// Get route for basic display
router.get("/index", function (req, res) {
    burgerDo.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

// Post route to create new burger
router.post("/api/burgers", function (req, res) {
    burgerDo.making(req.body.name, function (result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});

// Update route
router.put("/api/burgers/:id", function (req, res) {
    var id = req.params.id;

    burgerDo.eating(id, function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    });
});


module.exports = router;