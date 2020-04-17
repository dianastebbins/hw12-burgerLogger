// use Express package to create and run a router server
const express = require("express");

// create the router instance
const router = express.Router();

// import the model (burger.js) to use its database functions
const burger = require("../models/burger.js");

// picks a random burger picture to insert
function burgerPicker() {
  const burgerPicArray = [
    {name:"burger", height:"250", width:"250"}, 
    {name:"grill", height:"250", width:"350"}, // let wider pictures display nicely
    {name:"plated", height:"250", width:"250"},  
    {name:"sliders", height:"250", width:"350"},  
    {name:"steaming", height:"250", width:"350"},
    {name:"veggie", height:"250", width:"250"},
    {name:"chicken", height:"250", width:"300"}
  ];
  const randomIndex = Math.floor(Math.random() * 7);
  return burgerPicArray[randomIndex];
}

// create all routes and set up logic within those routes where required
router.get("/", function(req, res) {
  const displayBurger = burgerPicker();
  
  burger.all(function(data) {
    const hbsObject = {
      burgers: data,
      pic_path: `/assets/images/${displayBurger.name}.jpg`,
      pic_height: displayBurger.height,
      pic_width: displayBurger.width
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name"
  ], [
    req.body.burger_name
  ], function(result) {
    // send back the ID of the new burger
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // if no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// no delete in this app, but leaving it here for completeness
router.delete("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.delete(condition, function(result) {
    console.log(result);

    if (result.affectedRows === 0) {
      // if no rows were affected, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// export routes for server.js to use.
module.exports = router;
