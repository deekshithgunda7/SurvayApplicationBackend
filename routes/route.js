const express = require("express");
const controller = require("../controller/controller");

const router = express.Router();

//Survey Routes
router.get("/survey", function (req, res) {
  controller.getSurveyDetails(req, res);
});
router.get("/survey/:id", function (req, res) {
  controller.getSurveyDetailsId(req, res);
});
router.post("/survey", function (req, res) {
  controller.createSurvey(req, res);
});
router.put("/survey/:id", function (req, res) {
  controller.updateSurvey(req, res);
});
router.delete("/survey/:id", function (req, res) {
  controller.deleteSurvey(req, res);
});



//User Route
router.get("/users", function (req, res) {
  controller.getUsers(req, res);
});
router.get("/users/:id", function (req, res) {
  controller.getUserById(req, res);
});
router.post("/users", function (req, res) {
  controller.createUser(req, res);
});
router.put("/users/:id", function (req, res) {
  controller.updateUser(req, res);
});
router.delete("/users/:id", function (req, res) {
  controller.deleteUser(req, res);
});

module.exports = router;
