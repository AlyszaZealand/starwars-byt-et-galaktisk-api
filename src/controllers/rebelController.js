const rebelService = require("../service/rebelService");


async function handleDownload(req, res){
    try {
        const filePath = await rebelService.handleGetFile();

        if (!filePath) {
            return res.status(404).json({ error: "Filen blev ikke fundet." });
        }

        res.download(filePath, 'DeathStarPlans.txt', (err) => {
            if (err && !res.headersSent) {
                console.error("Fejl ved download:", err);
                res.status(500).json({ error: "Kunne ikke hente filen." });
            }
        });

    } catch (error) {
        console.error("Error handling download:", error);
        res.status(500).send("Error handling download");
    }
}

async function goToLuke(req, res) {
    res.redirect('/characters/1');
}



module.exports = {handleDownload, goToLuke};