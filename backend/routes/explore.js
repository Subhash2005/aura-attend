const express = require("express");
const router = express.Router();
const {
    joinUs,
    addSuggestion,
    becomeSponsor,
    getSponsors,
    getOrganizations
} = require("../controllers/exploreController");

router.post("/join", joinUs);
router.post("/suggestions", addSuggestion);
router.post("/become-sponsor", becomeSponsor);
router.get("/sponsors", getSponsors);
router.get("/organizations", getOrganizations);

module.exports = router;
