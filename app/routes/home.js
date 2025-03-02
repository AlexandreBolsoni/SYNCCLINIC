module.exports = function(app){    
    app.get('/', function (req, res) {
        app.app.controllers.home_control.index(app,req,res);
    });
}