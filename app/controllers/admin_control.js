module.exports = {
    form_add_agendamento: function (app, req, res) {
        res.render('admin/form_agendar');
    },

    agendamento_salvar: function (app, req, res) {
        const agenda = req.body;
        
        // Validação
        req.assert('nome', 'Nome não pode ser vazio').notEmpty();
        req.assert('sobrenome', 'Sobrenome não pode ser vazio').notEmpty();
        req.assert('CPF', 'CPF não pode ser vazio').notEmpty();
        req.assert('CPF', 'Número de CPF faltando ou sobrando').len(11, 14);
        req.assert('telefone', 'Campo telefone não pode ser vazio').notEmpty();
        req.assert('telefone', 'Telefone inválido, lembre-se do DDD').len(11, 14);
        req.assert('telefone', 'Telefone não é válido').isNumeric();
        req.assert('data_agendamento', 'Data não pode ser vazia').notEmpty();
        req.assert('hora_agendamento', 'Hora não pode ser vazia').notEmpty();
        
        const errors = req.validationErrors();
        
        if (errors) {
            res.render('admin/form_agendar', { validacao: errors, agenda: agenda });
            return;
        }

        // Conexão com o banco e salvar dados
        const connection = app.config.dbConnection();
        const salvarAgendaDAO = new app.app.models.agendamentoDAO(connection);
        
        salvarAgendaDAO.salvar(agenda, function (error, result) {
            if (error) {
                res.status(500).send("Erro ao salvar o agendamento");
                return;
            }
            res.redirect('/visualizar_agenda');
        });
    },

    form_login: function (app, req, res) {
        res.render("admin/form_login", { validacao: {} });
    },

    login_autenticar: function (app, req, res) {
        const campoDeUsuario = req.body;
        
        // Validação de usuário e senha
        req.assert('usuario', 'O usuário é obrigatório').notEmpty();
        req.assert('senha', 'A senha é obrigatória').notEmpty();
        
        const erros = req.validationErrors();
        
        if (erros) {
            res.render("admin/form_login", { validacao: erros });
            return;
        }

        // Conexão com o banco e autenticar usuário
        const connection = app.config.dbConnection();
        const adminDAO = new app.app.models.AdminDAO(connection);
        
        adminDAO.autenticar(campoDeUsuario, function (error, result) {
            if (result.length > 0) {
                req.session.usuario = result[0];  // Sessão do usuário autenticado
                res.redirect("/admin");
            } else {
                res.render("admin/form_login", { validacao: [{ msg: "Usuário ou senha incorretos" }] });
            }
        });
    },

    visualizar_agenda: function (app, req, res) {
        const connection = app.config.dbConnection();
        const agendaDAO = new app.app.models.agendamentoDAO(connection);
        
        agendaDAO.listar(function (error, result) {
            if (error) {
                res.status(500).send("Erro ao buscar a agenda");
                return;
            }
            res.render("admin/visualizar_agenda", { agenda: result });
        });
    },

    visualizar_agendamento: function (app, req, res) {
        const cpf = req.body.CPF;
        const connection = app.config.dbConnection();
        const agendaDAO = new app.app.models.agendamentoDAO(connection);
        
        agendaDAO.buscarPorCPF(cpf, function (error, result) {
            if (error || result.length === 0) {
                res.render("admin/visualizar_agendamento", { erro: "Nenhum agendamento encontrado para este CPF", agendamento: null });
                return;
            }
            res.render("admin/visualizar_agendamento", { agendamento: result });
        });
    }
};
