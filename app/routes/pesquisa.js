module.exports = function (app) {
    // Rota GET para exibir a página de pesquisa
    app.get('/pesquisa_cpf', function (req, res) {
        app.app.controllers.pesquisa_control.pesquisa_cpf(app, req, res);
    });

    // Rota POST para buscar consultas pelo CPF
    app.post('/pesquisa_cpf', function (req, res) {
        app.app.controllers.pesquisa_control.consultas_paciente(app, req, res);
    });
};
