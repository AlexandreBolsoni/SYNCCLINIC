module.exports.visualizar_consulta = (app, req, res) => {
  const id = req.query.id;
  const connection = app.config.dbConnection();
  const consultaDAO = new app.app.models.clinicaDAO(connection);

  consultaDAO.visualizar_consulta(id, function (error, result) {
    if (error || result.length === 0) {
      return res.render("consulta/consulta", { 
          erro: "Consulta não encontrada!", 
          consulta: [],
          flagAdmin: req.session.autorizado 
      });
    };

    result.forEach((consulta) => {
      consulta.hora_consulta = app.app.utils.consulta.converterParaHorario(
        consulta.hora_consulta
      );
      consulta.duracao_consulta = app.app.utils.consulta.converterParaMinutos(
        consulta.duracao_consulta
      );
    });
    res.render("consulta/consulta", {
      consulta: result,
      flagAdmin: req.session.autorizado,
    });
  });
};
