module.exports = function (app) {
    app.get('/admin', function (req, res) {
        app.app.controllers.admin_control.form_add_agendamento(app, req, res);
    });
    app.post('/agenda/salvar', function (req, res) {
        app.app.controllers.admin_control.agendamento_salvar(app, req, res);
    });

    app.get('/login', function (req, res) {
        app.app.controllers.admin.form_login(app, req, res);
    });
    app.post('/login_autenticar', function (req, res) {
        app.app.controllers.admin.login_autenticar(app, req, res);
    });
    app.get('/visualizar_agenda', function (req, res) {
        app.app.controllers.admin_control.visualizar_agenda(app, req, res);
    });
    app.post('/visualizar_agendamento', function (req, res) {
  app.app.controllers.admin_control.visualizar_agendamento(app, req, res);
})
}

