const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const path = require("path");

app.listen(PORT, () => {
    console.log(`Serveren kører på port ${PORT}`);
});
