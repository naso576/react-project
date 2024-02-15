const history1 =require("../controllers/history1.controller.js");
var router = require("express").Router();



router.post("/addhistory1", history1.createHistory1);


router.get("/findHistory", history1.findHistory1);

router.put("/updateHistory",history1.updateHistory);

router.put("/updateHistory1",history1.updateHistory1);


router.put("/updateHistory2",history1.updateHistory2);


router.get("/:id", history1.findPatientHistory);

module.exports = router;    

