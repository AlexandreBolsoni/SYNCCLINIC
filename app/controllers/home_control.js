module.exports.index = function(app,req,res){
    res.render('home/index', {flagAdmin: req.session.autorizado});
}