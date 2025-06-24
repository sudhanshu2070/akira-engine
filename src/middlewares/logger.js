const timeLogger = (req, res, next) => { 
    const startTime = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });
    
    next(); 
};

// This middleware logs the time taken for each request
// and the status code of the response.
const errorLogger = (err, req, res, next) => {
    console.error(`Error occurred: ${err.message}`);
    console.error(err.stack);
    
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
}

module.exports = {
    timeLogger,
    errorLogger
};