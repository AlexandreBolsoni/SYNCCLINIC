function PacientesDAO(connection) {
    this._connection = connection;
}

PacientesDAO.prototype.listarPaciente = function(callback) {
    this._connection.query('SELECT * FROM pacientes', callback);
}

PacientesDAO.prototype.pesquisarCPF = function(cpf, callback) {
    // Correção na consulta para utilizar o parâmetro de forma segura
    this._connection.query(
        'SELECT nome, sobrenome, data_agendamento, hora_agendamento FROM pacientes WHERE CPF = ?', 
        [cpf],  // Passando o parâmetro de forma segura para evitar SQL Injection
        callback
    );
}

PacientesDAO.prototype.listarDATA = function(data, callback) {
    this._connection.query(
        'SELECT * FROM pacientes WHERE data_agendamento = ?', 
        [data],  // Certifique-se de que o parâmetro esteja sendo passado corretamente
        callback
    );
}

PacientesDAO.prototype.agendarPaciente = function(paciente, callback) {
    this._connection.query('INSERT INTO pacientes SET ?', paciente, callback);
}

module.exports = function() {
    return PacientesDAO;
}
