const nomesObrigatorios = [
  "PORT",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_NAME",
  "DB_PASSWORD",
];

export function carregarAmbiente(arquivoDeConfiguracao = ".env") {
  if (arquivoDeConfiguracao) {
    try {
      process.loadEnvFile(arquivoDeConfiguracao);
    } catch {
      throw new Error(
        `Arquivo de configuração não encontrado: ${arquivoDeConfiguracao}`
      );
    }
  }

  const ausentes = nomesObrigatorios.filter((nome) => {
    const valor = process.env[nome];
    return typeof valor !== "string" || valor.trim() === "";
  });

  if (ausentes.length > 0) {
    throw new Error(
      `Erro de Configuração! Preencha no seu arquivo .env: ${ausentes.join(
        ", "
      )}`
    );
  }

  return {
    nomeAluno: process.env.NOME_ALUNO || "Estudante SENAI",
    turma: process.env.TURMA || "Não informada",
    porta: process.env.PORT,
    ambiente: process.env.NODE_ENV || "development",
  };
}

export function exibirDiagnostico(configuracao) {
  console.log("\n============= CRONOSPORT API =============");
  console.table({
    estudante: configuracao.nomeAluno,
    turma: configuracao.turma,
    projeto: "cronosport-backend",
    ambiente: configuracao.ambiente,
    node: process.version,
    sistema: `${process.platform} ${process.arch}`,
    diretorio: process.cwd(),
    portaConfigurada: configuracao.porta,
  });
  console.log("==========================================\n");
}
