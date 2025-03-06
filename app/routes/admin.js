module.exports = function (app) {
    // Rota para formulário de agendamento
    app.get('/admin', function (req, res) {
        app.app.controllers.admin_control.form_add_agendamento(app, req, res);
    });

    // Rota para salvar agendamento
    app.post('/agenda/salvar', function (req, res) {
        app.app.controllers.admin_control.agendamento_salvar(app, req, res);
    });

    // Rota para login
    app.get('/login', function (req, res) {
        app.app.controllers.admin_control.form_login(app, req, res);
    });

    // Rota para autenticar login
    app.post('/login_autenticar', function (req, res) {
        app.app.controllers.admin_control.login_autenticar(app, req, res);
    });

    // Rota para visualizar agenda
    app.get('/visualizar_agenda', function (req, res) {
        app.app.controllers.admin_control.visualizar_agenda(app, req, res);
    });

    // Rota para visualizar agendamento por CPF
    app.post('/visualizar_agendamento', function (req, res) {
        app.app.controllers.admin_control.visualizar_agendamento(app, req, res);
    });
};
