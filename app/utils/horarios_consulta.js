module.exports.gerarHorariosDisponiveis = (ocupados) =>{
    const horariosPermitidos = [];
    let horaAtual = "07:00"; // Horário de início do expediente
    const horaFim = "18:00"; // Horário de fim do expediente

    function somarMinutos(hora, minutos) {
        const [h, m] = hora.split(':').map(Number);
        const novaData = new Date(0, 0, 0, h, m + minutos);
        return novaData.toTimeString().substring(0, 5);
    }

    while (horaAtual < horaFim) {
        const estaOcupado = ocupados.some(consulta => {
            let inicio = consulta.inicio;
            let fim = somarMinutos(inicio, parseInt(consulta.duracao.split(':')[1]));
            return horaAtual >= inicio && horaAtual < fim;
        });

        if (!estaOcupado) {
            horariosPermitidos.push(horaAtual);
        }

        horaAtual = somarMinutos(horaAtual, 15); // Incrementa 15 minutos
    }

    return horariosPermitidos;
}