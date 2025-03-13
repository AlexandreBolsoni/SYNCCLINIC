class clinicaDAO {
    constructor(connection) {
        this._connection = connection;
    };

    listarPacientes(callback) {
        this._connection.query('SELECT * FROM pacientes', callback);
    };


    buscarConsultasPorCPF(cpf, callback) {
        this._connection.query(
            'SELECT foto, nome, sobrenome, CPF, telefone, c.* FROM pacientes JOIN consultas c ON pacientes.id = c.id_paciente_FK WHERE CPF = ?',
            [cpf], callback
        );
    };

    visualizar_consulta(id, callback) {
        this._connection.query(
            'SELECT * FROM consultas c JOIN pacientes p ON c.id_paciente_FK = p.id WHERE c.id = ?',
            [id], callback
        );
    };

    verificarHoraConsulta(data, callback) {
        this._connection.query(
            'SELECT hora_consulta, duracao_consulta FROM consultas WHERE data_consulta = ?',
            data,
            callback
        );
    };    

    // Método para salvar um novo paciente
    salvarPaciente(paciente, callback) {
        this._connection.query('INSERT INTO pacientes SET ?', paciente, (error, result) => {
            console.log(result);
            if (error) {
                return callback(error, null);
            }
            // Retorna o ID do paciente inserido
            callback(null, result.insertId);
        });
    };

    // Método para salvar uma nova consulta associada a um paciente
    salvarConsulta(consulta, callback) {
        this._connection.query('INSERT INTO consultas SET ?', consulta, callback);
    };

    getLogin(camposDeAdmin, callback) {
        this._connection.query('SELECT id FROM admin WHERE admin = "' +
            camposDeAdmin.admin + '" AND senha = "' + camposDeAdmin.senha + '";', callback);
    };
};

module.exports = function () {
    return clinicaDAO;
};