document.addEventListener("DOMContentLoaded", verificarNovoPaciente);
document.addEventListener("visibilitychange", verificarNovoPaciente);
document
  .getElementById("paciente")
  .addEventListener("change", verificarNovoPaciente);

function verificarNovoPaciente() {
  var pacienteDropdown = document.getElementById("paciente");
  var novoPacienteFields = document.getElementById("novoPaciente");

  if (pacienteDropdown.value === "novo") {
    novoPacienteFields.style.display = "block";
  } else {
    novoPacienteFields.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dataConsulta = document.getElementById("data_consulta");
  const horaConsultaSelect = document.getElementById("hora_consulta");
  const duracaoWrapper = document.getElementById("duracaoWrapper");
  const duracaoConsultaSelect = document.getElementById("duracao_consulta");

  async function listarHorariosDiponiveis() {
    const dataSelecionada = dataConsulta.value;
    const horariosWrapper = document.getElementById("horariosWrapper");

    if (!dataSelecionada) {
      return horariosWrapper.hidden = true;
    }

    try {
      const response = await fetch(
        `/horariosDisponiveisConsulta?data=${encodeURIComponent(
          dataSelecionada
        )}`
      );
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const horarios = await response.json();

      horaConsultaSelect.innerHTML =
        "<option disabled selected>Selecione um horário disponível para a consulta</option>";

      if (horarios.length === 0) {
        horaConsultaSelect.innerHTML +=
          "<option disabled>Nenhum horário disponível</option>";
      } else {
        horarios.forEach((horario) => {
          const option = document.createElement("option");
          option.value = horario;
          option.textContent = horario;
          horaConsultaSelect.appendChild(option);
        });
      }

      horariosWrapper.hidden = false;
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    }
  }

  async function listarDuracoesDisponiveis() {
    const horarioSelecionado = horaConsultaSelect.value;
    const dataSelecionada = dataConsulta.value;

    if (!horarioSelecionado || !dataSelecionada) {
      return duracaoWrapper.hidden = true;
    } 

    try {
      const response = await fetch(
        `/duracoesDisponiveisConsulta?data=${encodeURIComponent(
          dataSelecionada
        )}&hora=${encodeURIComponent(horarioSelecionado)}`
      );
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const duracoes = await response.json();
      duracaoConsultaSelect.innerHTML =
        "<option disabled selected>Selecione a duração prevista da consulta (em horas)</option>";

      if (duracoes.length === 0) {
        duracaoConsultaSelect.innerHTML +=
          "<option disabled>Nenhuma duração disponível</option>";
      } else {
        duracoes.forEach((duracao) => {
          const option = document.createElement("option");
          option.value = duracao;
          option.textContent = duracao;
          duracaoConsultaSelect.appendChild(option);
        });
      }
      duracaoWrapper.hidden = false;
    } catch (error) {
      console.error("Erro ao buscar durações disponíveis:", error);
    }
  }

  if (dataConsulta) {
    // Adicionar eventos
    dataConsulta.addEventListener("unfocus", listarHorariosDiponiveis);
    dataConsulta.addEventListener("change", listarHorariosDiponiveis);

    horaConsultaSelect.addEventListener("unfocus", listarDuracoesDisponiveis);
    horaConsultaSelect.addEventListener("change", listarDuracoesDisponiveis);
  } else {
    console.error("Elemento data_consulta não encontrado!");
  }
});

function validarTextoAlfanumericoInput(elemento) {
  elemento.value = elemento.value.replace(/[^a-zA-ZÀ-ÿ\s.,;:!?-]/g, ""); // Remove números e caracteres indesejados
};

document.getElementById("CPF").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  this.value = this.value.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );
  this.setSelectionRange(this.value.length, this.value.length);
});

document.getElementById("telefone").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  this.value = this.value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  this.setSelectionRange(this.value.length, this.value.length);
});
