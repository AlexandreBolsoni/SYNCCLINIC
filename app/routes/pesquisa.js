module.exports = function (app) {
    app.get('/pesquisa_cpf', function (req, res) {
        app.app.controllers.pesquisa_control.pesquisa_cpf(app,req,res);
    });
}