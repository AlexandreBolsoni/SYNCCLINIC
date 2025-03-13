module.exports = function (app) {
    // Rota para formulário de consulta
    app.get('/admin', function (req, res) {
        app.app.controllers.admin_control.form_add_consulta(app, req, res);
    });

    // Rota para salvar consulta
    app.post('/salvar', app.upload.single('file'), function (req, res) {
        app.app.controllers.admin_control.consulta_salvar(app, req, res);
    });

    // Rota para login
    app.get('/login', function (req, res) {
        app.app.controllers.admin_control.form_login(app, req, res);
    });

    // Rota para autenticar login
    app.post('/login_autenticar', function (req, res) {
        app.app.controllers.admin_control.login_autenticar(app, req, res);
    });

    // Rota para visualizar as consultas
    app.get('/visualizar_consultas', function (req, res) {
        app.app.controllers.admin_control.visualizar_consultas(app, req, res);
    });

    // Rota para visualizar consulta com mais detalhes
    app.post('/visualizar_consulta', function (req, res) {
        app.app.controllers.admin_control.visualizar_consulta(app, req, res);
    });

    app.get('/horariosDisponiveisConsulta', function (req, res) {
        app.app.controllers.admin_control.horariosDisponiveisConsulta(app, req, res);
    });

    app.get('/duracoesDisponiveisConsulta', function (req, res) {
        app.app.controllers.admin_control.duracoesDisponiveisConsulta(app, req, res);
    });

    // Rota para sair da sessão de administrador
    app.get('/sair', (req, res) => {
        app.app.controllers.admin_control.sair(app, req, res);
    });

    app.get('/apagar_consulta', (req, res) => {
        app.app.controllers.admin_control.delete_consulta(app, req, res);
    });
};
