const { getSuggestionModel } = require("../model/Suggestion");
const { getSponsorApplicationModel } = require("../model/SponsorApplication");
const { getSponsorModel } = require("../model/Sponsor");
const { getOrganizationModel } = require("../model/Organization");
const fs = require("fs");
const path = require("path");

const EXPLORE_JSON_PATH = path.join(__dirname, "../explore_db.json");
const MEMBERSHIP_JSON_PATH = path.join(__dirname, "../membership_db.json");

// Helper to read offline Explore JSON DB
const getExploreJSON = () => {
    try {
        if (!fs.existsSync(EXPLORE_JSON_PATH)) {
            fs.writeFileSync(EXPLORE_JSON_PATH, JSON.stringify({
                suggestions: [],
                sponsor_applications: [],
                sponsors: [],
                organizations: []
            }, null, 2));
        }
        const data = fs.readFileSync(EXPLORE_JSON_PATH, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading explore JSON DB:", err);
        return { suggestions: [], sponsor_applications: [], sponsors: [], organizations: [] };
    }
};

// Helper to write offline Explore JSON DB
const saveExploreJSON = (data) => {
    try {
        fs.writeFileSync(EXPLORE_JSON_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing explore JSON DB:", err);
    }
};

// Helper to read offline Membership JSON DB (joins & users)
const getMembershipJSON = () => {
    try {
        if (!fs.existsSync(MEMBERSHIP_JSON_PATH)) {
            fs.writeFileSync(MEMBERSHIP_JSON_PATH, JSON.stringify({
                users: [],
                joins: []
            }, null, 2));
        }
        const data = fs.readFileSync(MEMBERSHIP_JSON_PATH, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading membership JSON DB:", err);
        return { users: [], joins: [] };
    }
};

// Helper to write offline Membership JSON DB
const saveMembershipJSON = (data) => {
    try {
        fs.writeFileSync(MEMBERSHIP_JSON_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing membership JSON DB:", err);
    }
};

// 1. Join Us (Mail sending to subhash1422005s@gmail.com simulation + DB save)
exports.joinUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Simulate sending email to subhash1422005s@gmail.com
        console.log("\n========================================================");
        console.log("📧  [EMAIL SENT SUCCESS] - TO: subhash1422005s@gmail.com");
        console.log(`👤  From: ${name} <${email}>`);
        console.log(`💬  Message: ${message}`);
        console.log("========================================================\n");

        if (global.isOfflineMode) {
            const db = getMembershipJSON();
            const newJoin = { id: Date.now().toString(), name, email, message, createdAt: new Date().toISOString() };
            db.joins.push(newJoin);
            saveMembershipJSON(db);
            return res.status(200).json({ success: true, msg: "Message sent and stored successfully (Offline Mode)" });
        }

        // Save to membership DB joins collection (we can dynamically resolve join schema if needed, or save to JSON as secondary store)
        const db = getMembershipJSON();
        const newJoin = { id: Date.now().toString(), name, email, message, createdAt: new Date().toISOString() };
        db.joins.push(newJoin);
        saveMembershipJSON(db);

        res.status(200).json({ success: true, msg: "Message sent and stored successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

// 2. Add Suggestion (Store in suggestions db inside explore db)
exports.addSuggestion = async (req, res) => {
    try {
        const { name, email, suggestion } = req.body;

        if (global.isOfflineMode) {
            const db = getExploreJSON();
            const newSuggestion = {
                id: Date.now().toString(),
                name: name || "Anonymous",
                email: email || "Anonymous",
                suggestion,
                createdAt: new Date().toISOString()
            };
            db.suggestions.push(newSuggestion);
            saveExploreJSON(db);
            console.log(`[Offline Mode] Suggestion stored: "${suggestion.substring(0, 30)}..."`);
            return res.status(201).json({ success: true, msg: "Suggestion stored successfully (Offline Mode)" });
        }

        const SuggestionModel = getSuggestionModel();
        if (!SuggestionModel) {
            return res.status(500).json({ success: false, msg: "DB Connection not ready" });
        }

        const newSug = new SuggestionModel({ name, email, suggestion });
        await newSug.save();
        console.log(`[MongoDB Mode] Suggestion stored in explore database!`);
        res.status(201).json({ success: true, msg: "Suggestion stored successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

// 3. Become a Sponsor (Store in become-a-sponsor db inside explore db)
exports.becomeSponsor = async (req, res) => {
    try {
        const { companyName, hrContact, ownerName, cin, gst, mobileNumber, email, productDetails, companyMotto } = req.body;

        if (global.isOfflineMode) {
            const db = getExploreJSON();
            const newApp = {
                id: Date.now().toString(),
                companyName,
                hrContact,
                ownerName,
                cin,
                gst,
                mobileNumber,
                email,
                productDetails,
                companyMotto,
                createdAt: new Date().toISOString()
            };
            db.sponsor_applications.push(newApp);
            saveExploreJSON(db);
            console.log(`[Offline Mode] Sponsor Application stored for: ${companyName}`);
            return res.status(201).json({ success: true, msg: "Application submitted successfully (Offline Mode)" });
        }

        const SponsorApplicationModel = getSponsorApplicationModel();
        if (!SponsorApplicationModel) {
            return res.status(500).json({ success: false, msg: "DB Connection not ready" });
        }

        const newApp = new SponsorApplicationModel({
            companyName,
            hrContact,
            ownerName,
            cin,
            gst,
            mobileNumber,
            email,
            productDetails,
            companyMotto
        });
        await newApp.save();
        console.log(`[MongoDB Mode] Sponsor Application stored in explore database!`);
        res.status(201).json({ success: true, msg: "Application submitted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

// Seed lists if empty helper
const seedSponsorsAndOrgs = async () => {
    if (global.isOfflineMode) return;
    try {
        const SponsorModel = getSponsorModel();
        const OrganizationModel = getOrganizationModel();
        if (!SponsorModel || !OrganizationModel) return;

        // Seed Sponsors if empty
        const spCount = await SponsorModel.countDocuments();
        if (spCount === 0) {
            const initialSponsors = [
                { name: 'Innovate Solutions', logo: 'https://logo.clearbit.com/ibm.com', description: 'Driving the future of tech.', details: 'Innovate Solutions is a leader in cloud computing and AI-driven platforms.' },
                { name: 'Global Ventures', logo: 'https://logo.clearbit.com/gv.com', description: 'Investing in tomorrow\'s leaders.', details: 'Global Ventures is a venture capital firm that invests in early-stage technology companies.' },
                { name: 'Creative Minds Co.', logo: 'https://logo.clearbit.com/adobe.com', description: 'Powering creativity and design.', details: 'Creative Minds Co. specializes in branding and marketing.' },
                { name: 'Local Business Hub', logo: 'https://logo.clearbit.com/shopify.com', description: 'Supporting local communities.', details: 'The Local Business Hub supports small businesses within the community.' },
                { name: 'Quantum Analytics', logo: 'https://logo.clearbit.com/sap.com', description: 'Unlocking data potential.', details: 'Quantum Analytics provides advanced data science and business intelligence.' },
                { name: 'Digital Forge', logo: 'https://logo.clearbit.com/digitalocean.com', description: 'Building the digital world.', details: 'Digital Forge is a software development company that creates custom applications.' }
            ];
            await SponsorModel.insertMany(initialSponsors);
            console.log("Seeded initial sponsors into explore DB");
        }

        // Seed Orgs if empty
        const orgCount = await OrganizationModel.countDocuments();
        if (orgCount === 0) {
            const initialOrgs = [
                { category: 'colleges', name: 'IIT Madras', logo: 'https://logo.clearbit.com/iitm.ac.in' },
                { category: 'colleges', name: 'Anna University', logo: 'https://logo.clearbit.com/annauniv.edu' },
                { category: 'colleges', name: 'VIT University', logo: 'https://logo.clearbit.com/vit.ac.in' },
                { category: 'colleges', name: 'SRM University', logo: 'https://logo.clearbit.com/srmist.edu.in' },
                { category: 'colleges', name: 'PSG Tech', logo: 'https://logo.clearbit.com/psgtech.edu' },
                
                { category: 'companies', name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
                { category: 'companies', name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
                { category: 'companies', name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
                { category: 'companies', name: 'Zoho Corporation', logo: 'https://logo.clearbit.com/zoho.com' },
                { category: 'companies', name: 'Cognizant', logo: 'https://logo.clearbit.com/cognizant.com' },

                { category: 'schools', name: 'Kendriya Vidyalaya', logo: 'https://www.google.com/s2/favicons?sz=128&domain=kvsangathan.nic.in' },
                { category: 'schools', name: 'DAV Public School', logo: 'https://logo.clearbit.com/davuniversity.org' },
                { category: 'schools', name: 'Delhi Public School', logo: 'https://logo.clearbit.com/dpsfamily.org' },
                
                { category: 'shops', name: 'Reliance Smart', logo: 'https://logo.clearbit.com/relianceretail.com' },
                { category: 'shops', name: 'More Supermarket', logo: 'https://logo.clearbit.com/moremegamart.com' },
                { category: 'shops', name: 'Nilgiris', logo: 'https://logo.clearbit.com/nilgirissupermarket.com' }
            ];
            await OrganizationModel.insertMany(initialOrgs);
            console.log("Seeded initial organizations into explore DB");
        }
    } catch (err) {
        console.error("Error seeding explore database:", err);
    }
};

// Trigger seed checks
setTimeout(seedSponsorsAndOrgs, 4000);

// 4. Get Sponsors List
exports.getSponsors = async (req, res) => {
    try {
        if (global.isOfflineMode) {
            const db = getExploreJSON();
            // Seed offline mock if empty
            if (db.sponsors.length === 0) {
                db.sponsors = [
                    { id: 1, name: 'Innovate Solutions', logo: 'https://logo.clearbit.com/ibm.com', description: 'Driving the future of tech.', details: 'Innovate Solutions is a leader in cloud computing.' },
                    { id: 2, name: 'Global Ventures', logo: 'https://logo.clearbit.com/gv.com', description: 'Investing in tomorrow\'s leaders.', details: 'Global Ventures is a venture capital firm.' },
                    { id: 3, name: 'Creative Minds Co.', logo: 'https://logo.clearbit.com/adobe.com', description: 'Powering creativity and design.', details: 'Creative Minds Co. specializes in design.' },
                    { id: 4, name: 'Local Business Hub', logo: 'https://logo.clearbit.com/shopify.com', description: 'Supporting local communities.', details: 'The Local Business Hub supports small businesses.' },
                    { id: 5, name: 'Quantum Analytics', logo: 'https://logo.clearbit.com/sap.com', description: 'Unlocking data potential.', details: 'Quantum Analytics provides data science services.' },
                    { id: 6, name: 'Digital Forge', logo: 'https://logo.clearbit.com/digitalocean.com', description: 'Building the digital world.', details: 'Digital Forge is a software development company.' }
                ];
                saveExploreJSON(db);
            }
            return res.json(db.sponsors);
        }

        const SponsorModel = getSponsorModel();
        if (!SponsorModel) {
            return res.status(500).json({ success: false, msg: "DB Connection not ready" });
        }

        const sponsors = await SponsorModel.find();
        res.json(sponsors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

// 5. Get Organizations List
exports.getOrganizations = async (req, res) => {
    try {
        if (global.isOfflineMode) {
            const db = getExploreJSON();
            // Seed offline mock if empty
            if (db.organizations.length === 0) {
                db.organizations = [
                    { id: 1, category: 'colleges', name: 'IIT Madras', logo: 'https://logo.clearbit.com/iitm.ac.in' },
                    { id: 2, category: 'colleges', name: 'Anna University', logo: 'https://logo.clearbit.com/annauniv.edu' },
                    { id: 3, category: 'colleges', name: 'VIT University', logo: 'https://logo.clearbit.com/vit.ac.in' },
                    { id: 4, category: 'colleges', name: 'SRM University', logo: 'https://logo.clearbit.com/srmist.edu.in' },
                    { id: 5, category: 'colleges', name: 'PSG Tech', logo: 'https://logo.clearbit.com/psgtech.edu' },
                    
                    { id: 6, category: 'companies', name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
                    { id: 7, category: 'companies', name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
                    { id: 8, category: 'companies', name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
                    { id: 9, category: 'companies', name: 'Zoho Corporation', logo: 'https://logo.clearbit.com/zoho.com' },
                    { id: 10, category: 'companies', name: 'Cognizant', logo: 'https://logo.clearbit.com/cognizant.com' },

                    { id: 11, category: 'schools', name: 'Kendriya Vidyalaya', logo: 'https://www.google.com/s2/favicons?sz=128&domain=kvsangathan.nic.in' },
                    { id: 12, category: 'schools', name: 'DAV Public School', logo: 'https://logo.clearbit.com/davuniversity.org' },
                    { id: 13, category: 'schools', name: 'Delhi Public School', logo: 'https://logo.clearbit.com/dpsfamily.org' },
                    
                    { id: 14, category: 'shops', name: 'Reliance Smart', logo: 'https://logo.clearbit.com/relianceretail.com' },
                    { id: 15, category: 'shops', name: 'More Supermarket', logo: 'https://logo.clearbit.com/moremegamart.com' },
                    { id: 16, category: 'shops', name: 'Nilgiris', logo: 'https://logo.clearbit.com/nilgirissupermarket.com' }
                ];
                saveExploreJSON(db);
            }
            return res.json(db.organizations);
        }

        const OrganizationModel = getOrganizationModel();
        if (!OrganizationModel) {
            return res.status(500).json({ success: false, msg: "DB Connection not ready" });
        }

        const orgs = await OrganizationModel.find();
        res.json(orgs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};
