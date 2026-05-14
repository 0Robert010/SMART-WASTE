# Plano de Validacao

## Objetivo

Validar se o SmartWaste resolve um problema real de acompanhamento de lixeiras em locais de grande circulacao e se o prototipo fisico comunica o status de forma clara.

## Publico

- Alunos.
- Funcionarios.
- Professores.
- Equipe de limpeza ou manutencao.
- Pessoas responsaveis por administracao de espacos comuns.

## Perguntas de entrevista

1. Voce costuma perceber lixeiras cheias em ambientes de grande circulacao?
2. Em quais locais esse problema aparece com mais frequencia?
3. Um indicador visual na propria lixeira ajudaria a identificar prioridade de coleta?
4. Um painel com mapa e status das lixeiras ajudaria a organizar a rotina?
5. Quais informacoes seriam mais uteis: nivel, local, horario da ultima leitura ou alerta?

## Testes do prototipo

| Teste | Como validar | Evidencia |
| --- | --- | --- |
| Leitura vazia | Sensor mede o fundo da lixeira | Foto e valor no Serial |
| Leitura intermediaria | Inserir volume parcial no recipiente | Foto e JSON do Monitor Serial |
| Leitura critica | Simular lixeira cheia | LED vermelho e leitura acima de 80% |
| Indicadores | Conferir LEDs verde, amarelo, vermelho e Wi-Fi | Foto ou video curto |
| Estrutura 3D | Verificar encaixe de tampa, sensor e suporte | Fotos da impressao e montagem |
| Dashboard | Conferir mapa, cards e status | Print da tela |

## Evidencias para o relatorio

- Fotos da modelagem ou preparo no Bambu Studio, salvas em `docs/evidencias/`.
- Fotos da impressao na Bambu Lab A1, salvas em `docs/evidencias/`.
- Fotos do prototipo montado, salvas em `docs/evidencias/`.
- Prints do Monitor Serial, salvos em `docs/evidencias/`.
- Prints do dashboard, salvos em `docs/evidencias/`.
- Resumo dos feedbacks coletados.
- Tabela com medicoes de distancia, ocupacao e status.

## Criterios de sucesso

- O prototipo mede diferencas claras entre vazio, intermediario e cheio.
- Os LEDs indicam corretamente o status.
- A estrutura impressa sustenta sensor, ESP32 e LEDs sem improviso aparente.
- O dashboard comunica rapidamente quais lixeiras precisam de atencao.
- A validacao com usuarios confirma utilidade ou aponta melhorias objetivas.
