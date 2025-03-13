// Função para converter horas em minutos
const converterParaMinutos = (hora) => {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
};

// Função para somar minutos a um horário
const somarMinutos = (hora, minutos) => {
  const [h, m] = hora.split(":").map(Number);
  const novaData = new Date(0, 0, 0, h, m + minutos);
  return novaData.toTimeString().substring(0, 5);
};

// Função para converter o formato "00:00:00" para "00:00"
const converterParaHorario = (time) => {
  if (!time || typeof time !== 'string') {
    throw new Error('O parâmetro time deve ser uma string no formato HH:mm:ss');
  }

  // Divide a string time em horas, minutos e segundos
  const [hours, minutes] = time.split(":");

  // Retorna apenas as horas e minutos, descartando os segundos
  return `${hours}:${minutes}`;
};

// Função para gerar horários disponíveis
const gerarHorariosDisponiveis = (ocupados) => {
  const horariosPermitidos = [];
  let horaAtual = "07:00"; // Início do expediente
  const horaFim = "18:00"; // Fim do expediente

  while (converterParaMinutos(horaAtual) < converterParaMinutos(horaFim)) {
    const estaOcupado = ocupados.some((consulta) => {
      let inicio = consulta.inicio.substring(0, 5); // HH:MM
      let duracaoMinutos = converterParaMinutos(consulta.duracao);
      let fim = somarMinutos(inicio, duracaoMinutos);

      return (
        converterParaMinutos(horaAtual) >= converterParaMinutos(inicio) &&
        converterParaMinutos(horaAtual) < converterParaMinutos(fim)
      );
    });

    if (!estaOcupado) {
      horariosPermitidos.push(horaAtual);
    }

    horaAtual = somarMinutos(horaAtual, 15); // Incrementa 15 minutos
  }

  return horariosPermitidos;
};

// Função para gerar durações disponíveis
const gerarDuracoesDisponiveis = (ocupados, horarioSelecionado) => {
  const duracoesDisponiveis = ["00:15", "00:30", "01:00"];
  const horarioMinutos = converterParaMinutos(horarioSelecionado);
  const fimExpediente = converterParaMinutos("18:00");

  return duracoesDisponiveis.filter((duracao) => {
    const duracaoMinutos = converterParaMinutos(duracao);
    const horarioFim = horarioMinutos + duracaoMinutos;

    if (horarioFim > fimExpediente) {
      return false;
    }

    return !ocupados.some((consulta) => {
      const inicio = converterParaMinutos(consulta.inicio);
      const fim = inicio + converterParaMinutos(consulta.duracao);
      return horarioMinutos < fim && horarioFim > inicio && fim < fimExpediente;
    });
  });
};

// Exportação das funções
module.exports = {
  converterParaMinutos,
  somarMinutos,
  converterParaHorario,
  gerarHorariosDisponiveis,
  gerarDuracoesDisponiveis,
};
