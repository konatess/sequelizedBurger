// DEPENDENCIES
var express = require("express");
var db = require("../models");

// Sets up router
var router = express.Router();

// ROUTES
// Get route for basic display
router.get("/index", function (req, res) {
    db.Burger.findAll().then(function(dbBurger) {
        var allBurgers = [];
        for (i = 0; i < dbBurger.length; i++) {
            burgerObj = {
                id: dbBurger[i].dataValues.id,
                burger_name: dbBurger[i].dataValues.name,
                devoured: dbBurger[i].dataValues.devoured
            }
            allBurgers.push(burgerObj);
        };
        
        var hbsObject = {
            burgers: allBurgers
        };
        res.render("index", hbsObject);
    });
});

// redirect to index from basic route
router.get("/", function (req, res) {
    res.redirect("/index");
})

// Post route to create new burger
router.post("/api/burgers", function (req, res) {
    var query = {}
    query.name = req.body.name
    db.Burger.create(
        query 
    ).then(function (result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});

// Update route
router.put("/api/burgers/:id", function (req, res) {
    var bID = req.params.id;

    db.Burger.update({devoured: true}, {where: {id: bID}}, function (dbBurger) {
        console.log("updating: ", dbBurger)
        // if (result.changedRows === 0) {
        //     // If no rows were changed, then the ID must not exist, so 404
        //     return res.status(404).end();
        // }
        res.status(200).end();
    });
});


module.exports = router;