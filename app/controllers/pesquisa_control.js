module.exports = {
    pesquisa_cpf: function (app, req, res) {
        res.render("pesquisa/pesquisar_cpf", { 
            flagAdmin: req.session.autorizado,
            consultas: [],  // <- Agora o EJS sempre recebe `consulta`
            erro: null      // <- Evita problemas com `erro` também
        });
    },    

    consultas_paciente: function (app, req, res) {
        const cpf = req.body.CPF;
        const connection = app.config.dbConnection();
        const consultaDAO = new app.app.models.clinicaDAO(connection);
    
        consultaDAO.buscarConsultasPorCPF(cpf, function (error, result) {
            if (error || result.length === 0) {
                return res.render("pesquisa/pesquisar_cpf", { 
                    erro: "Nenhuma consulta encontrada para este CPF", 
                    consultas: [], 
                    flagAdmin: req.session.autorizado 
                });
            };
            
            result.forEach(consulta => {
                consulta.hora_consulta = app.app.utils.consulta.converterParaHorario(consulta.hora_consulta);
                consulta.duracao_consulta = app.app.utils.consulta.converterParaMinutos(consulta.duracao_consulta);
            });
            // Caso a consulta seja encontrada, renderiza a mesma página com os dados
            res.render("pesquisa/pesquisar_cpf", { 
                consultas: result,  // Passando o resultado das consultas
                flagAdmin: req.session.autorizado 
            });
        });
    }
    
    
}
