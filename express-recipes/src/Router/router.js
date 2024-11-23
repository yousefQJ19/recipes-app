const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const { getAll,getOne ,save,update,remove} = require("../controller/controller");


router.route("/:id").get(auth.authenticate(),getOne).put(auth.authenticate(),update).delete(auth.authenticate(),remove)
router.route("/").get(getAll).post(auth.authenticate(),save)





// Export the router
module.exports = router;