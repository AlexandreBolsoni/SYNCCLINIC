module.exports = function (app) {
    app.get('/consulta', function (req, res) {
        app.app.controllers.consulta_control.visualizar_consulta(app, req, res);
    });
};