module.exports = {
    pesquisa_cpf: function (app, req, res) {
        res.render("pesquisa/pesquisar_cpf", { flagAdmin: req.session.autorizado });
    },

    consultas_paciente: function (app, req, res) {
        const cpf = req.body.CPF;
        const connection = app.config.dbConnection();
        const consultaDAO = new app.app.models.clinicaDAO(connection);

        consultaDAO.buscarPorCPF(cpf, function (error, result) {
            if (error || result.length === 0) {
                return res.render("admin/visualizar_consulta", { erro: "Nenhuma consulta encontrada para este CPF", consulta: [], flagAdmin: req.session.autorizado });
            }
            res.render("admin/visualizar_consulta", { consulta: result, flagAdmin: req.session.autorizado });
        });
    }
}
