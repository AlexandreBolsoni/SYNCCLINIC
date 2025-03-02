function PacientesDAO(connection) {
	this._connection = connection;
}

PacientesDAO.prototype.listarPaciente = function(callback) {
    this._connection.query('select * from pacientes', callback);
}
PacientesDAO.prototype.listarCPF = function(cpf, callback) {
    this._connection.query('select nome,sobrenome,data_agenfamento, hora_agendamento from pacientes where CPF = '+cpf_Paciente.cpf_Paciente, callback);
}
PacientesDAO.prototype.listarDATA = function(data, callback) {
    this._connection.query('select * from pacientes where DATA = ?', [data], callback);
}
PacientesDAO.prototype.agendarPaciente = function(paciente, callback) {
    this._connection.query('insert into pacientes set ?', paciente, callback);
}

module.exports = function() {
    return PacientesDAO;
}