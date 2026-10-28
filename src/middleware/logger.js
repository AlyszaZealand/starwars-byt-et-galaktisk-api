logger = {
    logMethodAndUrl: (req, res, next) => {
        console.log(`Ny request modtaget: ${req.method} ${req.url}`);
        next();
    }
};

module.exports = logger;







