module.exports = {
  form_add_consulta: function (app, req, res) {
    if (req.session.autorizado) {
      const connection = app.config.dbConnection();
      const pacientesDAO = new app.app.models.clinicaDAO(connection);
      pacientesDAO.listarPacientes(function (error, result) {
        res.render("admin/form_consulta", {
          validacoes: {},
          paciente: {},
          pacientes: result,
          consulta: {},
          flagAdmin: req.session.autorizado,
        });
      });
    } else {
      const erros = [];
      erros.push({ msg: "Administrador precisa fazer login!" });
      res.render("admin/form_login", {
        validacoes: erros,
        flagAdmin: req.session.autorizado,
      });
    }
  },

  consulta_salvar: function (app, req, res) {
    const consulta = req.body;
    consulta.foto = req.file ? req.file.filename : req.body.existingImg || "";

    // Validação dos campos
    if (req.body.paciente === "novo") {
      req.assert("nome", "Nome não pode ser vazio!").notEmpty();
      req.assert("sobrenome", "Sobrenome não pode ser vazio!").notEmpty();
      req.assert("CPF", "CPF não pode ser vazio!").notEmpty();
      req
        .assert("CPF", "CPF deve estar no formato XXX.XXX.XXX-XX!")
        .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/);
      req.assert("telefone", "Campo telefone não pode ser vazio!").notEmpty();
      req
        .assert("telefone", "Telefone deve estar no formato (XX) XXXXX-XXXX!")
        .matches(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/);
    }

    req
      .assert("paciente", "Selecione o paciente ou cadastre um novo paciente!")
      .notEmpty();
    req
      .assert("motivo_consulta", "Motivo da consulta não pode ser vazio!")
      .notEmpty();
    req
      .assert("data_consulta", "Data da consulta não pode ser vazia!")
      .notEmpty();
    req
      .assert("hora_consulta", "Hora da consulta não pode ser vazia!")
      .notEmpty();
    req
      .assert("duracao_consulta", "Duração da consulta não pode ser vazia!")
      .notEmpty();
    req
      .assert("medico_responsavel", "Médico responsável não pode ser vazio!")
      .notEmpty();
    req
      .assert(
        "especialidade_medico",
        "Especialidade do médico não pode ser vazia!"
      )
      .notEmpty();

    const erros = req.validationErrors() || [];
    if (!req.file && !consulta.foto && req.body.paciente === "novo") {
      erros.unshift({ msg: "Foto do paciente não pode ser vazia!" });
    }

    function converterParaMinutos(hora) {
      const [horas, minutos] = hora.split(":").map(Number);
      return horas * 60 + minutos;
    }

    if (req.body.data_consulta && req.body.hora_consulta && req.body.duracao_consulta) {
      const horaConsulta = converterParaMinutos(req.body.hora_consulta); // Convertendo hora inicial
      const duracaoConsulta = converterParaMinutos(req.body.duracao_consulta); // Convertendo duração
      const limiteHorario = 18 * 60; // 18 horas em minutos (1080)

      if (horaConsulta + duracaoConsulta > limiteHorario) {
        erros.unshift({
          msg: "A duração prevista da consulta não pode ultrapassar às 18 horas!",
        });
      }
    }

    if (erros.length > 0) {
      const connection = app.config.dbConnection();
      const clinicaDAO = new app.app.models.clinicaDAO(connection);
      // Buscar pacientes para não perder a lista no retorno
      clinicaDAO.listarPacientes((err, pacientes) => {
        if (err) {
          return res.status(500).send("Erro ao buscar pacientes.");
        }
        return res.render("admin/form_consulta", {
          validacoes: erros,
          paciente: req.body.paciente,
          pacientes: pacientes,
          consulta: consulta,
          flagAdmin: req.session.autorizado,
        });
      });
      return;
    }

    const connection = app.config.dbConnection();
    const clinicaDAO = new app.app.models.clinicaDAO(connection);
    if (consulta.paciente === "novo") {
      // Criar novo paciente
      const novoPaciente = {
        foto: consulta.foto,
        nome: consulta.nome,
        sobrenome: consulta.sobrenome,
        CPF: consulta.CPF,
        telefone: consulta.telefone,
      };

      clinicaDAO.salvarPaciente(novoPaciente, (error, pacienteId) => {
        if (error) {
          return res.status(500).send("Erro ao salvar o paciente.");
        }
        // Associa o ID do paciente recém-criado à consulta
        consulta.id_paciente_FK = pacienteId;
        // Salvar consulta
        clinicaDAO.salvarConsulta(
          {
            id_paciente_FK: consulta.id_paciente_FK,
            motivo_consulta: consulta.motivo_consulta,
            data_consulta: consulta.data_consulta,
            hora_consulta: consulta.hora_consulta,
            duracao_consulta: consulta.duracao_consulta,
            medico_responsavel: consulta.medico_responsavel,
            especialidade_medico: consulta.especialidade_medico,
          },
          (errorConsulta) => {
            if (errorConsulta) {
              return res.status(500).send("Erro ao salvar a consulta.");
            }
            res.redirect("/");
          }
        );
      });
    } else {
      // Paciente já existente
      consulta.id_paciente_FK = consulta.paciente;

      clinicaDAO.salvarConsulta(
        {
          id_paciente_FK: consulta.id_paciente_FK,
          motivo_consulta: consulta.motivo_consulta,
          data_consulta: consulta.data_consulta,
          hora_consulta: consulta.hora_consulta,
          duracao_consulta: consulta.duracao_consulta,
          medico_responsavel: consulta.medico_responsavel,
          especialidade_medico: consulta.especialidade_medico,
        },
        (error) => {
          if (error) {
            return res.status(500).send("Erro ao salvar a consulta.");
          }
          res.redirect("/");
        }
      );
    }
  },

  form_login: function (app, req, res) {
    res.render("admin/form_login", {
      validacoes: {},
      flagAdmin: req.session.autorizado,
    });
  },

  login_autenticar: function (app, req, res) {
    const campoDeAdmin = req.body;

    // Validação de administrador e senha
    req.assert("admin", "O admin é obrigatório!").notEmpty();
    req.assert("senha", "A senha é obrigatória!").notEmpty();

    const erros = req.validationErrors();
    if (erros) {
      return res.render("admin/form_login", {
        validacoes: erros,
        flagAdmin: req.session.autorizado,
      });
    }

    // Conexão com o banco e autenticar o administrador
    const connection = app.config.dbConnection();
    const adminDAO = new app.app.models.clinicaDAO(connection);
    adminDAO.getLogin(campoDeAdmin, function (error, result) {
      if (result && result.length > 0) {
        req.session.autorizado = true; // Sessão do administrador autenticado
        res.redirect("/admin");
      } else {
        res.render("admin/form_login", {
          validacoes: [{ msg: "login ou senha incorretos" }],
          flagAdmin: req.session.autorizado,
        });
      }
    });
  },

  visualizar_consultas: function (app, req, res) {
    if (req.session.autorizado) {
      const connection = app.config.dbConnection();
      const consultaDAO = new app.app.models.clinicaDAO(connection);
      consultaDAO.listar(function (error, result) {
        if (error) {
          return res.status(500).send("Erro ao buscar a consulta");
        }
        res.render("admin/visualizar_consultas", {
          consulta: result,
          flagAdmin: req.session.autorizado,
        });
      });
    } else {
      const erros = [];
      erros.push({ msg: "Administrador precisa fazer login!" });
      res.render("admin/form_login", {
        validacoes: erros,
        flagAdmin: req.session.autorizado,
      });
    }
  },

  visualizar_consulta: function (app, req, res) {
    const cpf = req.body.CPF;
    const connection = app.config.dbConnection();
    const consultaDAO = new app.app.models.clinicaDAO(connection);

    consultaDAO.buscarPorCPF(cpf, function (error, result) {
      if (error || result.length === 0) {
        return res.render("admin/visualizar_consulta", {
          erro: "Nenhuma consulta encontrada para este CPF",
          consulta: [],
          flagAdmin: req.session.autorizado,
        });
      }
      res.render("admin/visualizar_consulta", {
        consulta: result,
        flagAdmin: req.session.autorizado,
      });
    });
  },

  horariosDisponiveisConsulta: function (app, req, res) {
    const connection = app.config.dbConnection();
    const clinicaDAO = new app.app.models.clinicaDAO(connection);

    const dataConsulta = req.query;
    console.log("Data recebida no backend:", dataConsulta);
    if (!dataConsulta) {
        return res.status(400).json({ error: 'Data não informada!' });
    }

    clinicaDAO.verificarHoraConsulta(dataConsulta, (error, resultados) => {
        console.log(resultados);
        if (error) {
            return res.status(500).json({ error: 'Erro ao buscar horários' });
        }

        const horariosIndisponiveis = resultados.map(consulta => ({
            inicio: consulta.hora_consulta,
            duracao: consulta.duracao_consulta
        }));

        const horariosDisponiveis = app.app.utils.horarios_consulta.gerarHorariosDisponiveis(horariosIndisponiveis);
        console.log(horariosDisponiveis);
        res.json(horariosDisponiveis);
    });
  },

  sair: function (app, req, res) {
    req.session.destroy((error) => {
      res.redirect("/");
    });
  },
};
