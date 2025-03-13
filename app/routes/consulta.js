module.exports = function (app) {
    app.get('/consulta', function (req, res) {
        app.app.controllers.consulta.visualizar_consulta(app, req, res);
    });
};