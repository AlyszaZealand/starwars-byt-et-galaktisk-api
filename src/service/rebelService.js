const path = require('path');
const fs = require('fs-extra');


async function handleGetFile() {
    const filePath = path.join(__dirname,'..','data','DeathStarPlans.txt')

    const fileExists = await fs.pathExists(filePath);
    if (!fileExists) {
        return null;
    }
    return filePath;
}



module.exports = {handleGetFile};
