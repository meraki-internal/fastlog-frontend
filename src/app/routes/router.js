const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
    return res.json({messager: "Hello, world!"});
})
module.exports = route;