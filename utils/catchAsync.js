// function to try catch every asnyc function 
module.exports = func => {
    return function(req, res, next) {
        // Returns a function that exepts a function and executes that function but 
        // catches any errors an pass this error to next error handling middleware
        // it catches the error and pass the error as an argument to next .catch(next)
        func(req, res, next).catch(next);
    }
}