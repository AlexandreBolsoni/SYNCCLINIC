module.exports.pesquisa_cpf = function (app, req, res) {
    const connection = app.config.dbConnection();
    const pacientesModel = new app.app.models.agendamentoDAO(connection);
    
    pacientesModel.listarCPF(function (error, result) {
        if (error) {
            res.status(500).send("Erro ao buscar pacientes.");
            return;
        }
        res.render("admin/pesquisa_cpf", { pacientes: result });
    });
}
