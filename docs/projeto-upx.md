# SmartWaste - Projeto UPx

## Identificacao

- Titulo: SmartWaste - Lixeira Inteligente para Gestao de Residuos
- Instituicao: Centro Universitario Facens
- Disciplina: Usina de Projetos Experimentais (UPx)
- Ano/semestre: 2026/1
- Grupo: a definir
- Orientador(a): a definir

## 1. Levantamento do problema e publico

Em ambientes com grande circulacao de pessoas, como universidades, as lixeiras podem ficar cheias em horarios de pico sem que a equipe responsavel perceba imediatamente. Isso gera risco de transbordamento, mau cheiro, baixa qualidade visual do ambiente e rotas de coleta pouco eficientes.

O publico inicial do projeto envolve equipes de limpeza, administracao do campus e usuarios dos espacos comuns, como alunos, professores, funcionarios e visitantes.

### Persona inicial

Pessoa responsavel por manutencao ou limpeza no campus, que precisa acompanhar varios pontos de descarte ao longo do dia e tomar decisoes rapidas sobre quais locais devem ser atendidos primeiro.

## 2. ODS

ODS relacionados ao projeto:

- ODS 11 - Cidades e comunidades sustentaveis: melhora da gestao de residuos em espacos coletivos.
- ODS 12 - Consumo e producao responsaveis: incentivo ao descarte adequado e uso de dados para reduzir desperdicios operacionais.
- ODS 13 - Acao contra a mudanca global do clima: reducao de deslocamentos desnecessarios em rotas de coleta.

## 3. Analise de mercado

### Solucoes existentes

- Lixeiras comuns com verificacao manual.
- Rotas fixas de coleta, mesmo quando algumas lixeiras ainda estao vazias.
- Lixeiras inteligentes comerciais com sensores, compactacao ou comunicacao IoT.
- Sistemas de gestao urbana para coleta publica.

### Pontos fortes das alternativas

- Simplicidade de operacao.
- Baixo custo inicial em lixeiras comuns.
- Solucoes comerciais ja validadas em alguns cenarios.

### Pontos fracos das alternativas

- Falta de dados em tempo real.
- Coleta baseada em percepcao visual ou horarios fixos.
- Custo alto em solucoes comerciais completas.
- Baixa adaptacao para um projeto academico de baixo custo.

### Diferenciais propostos

- Prototipo de baixo custo.
- Painel simples para leitura rapida do status.
- Possibilidade de adaptar o sistema ao mapa do campus.
- Foco em validacao com usuarios reais do ambiente universitario.

## 4. Proposta de valor e solucao

SmartWaste ajuda a equipe responsavel pela limpeza a saber quais lixeiras precisam de coleta primeiro, evitando verificacoes desnecessarias e reduzindo o risco de lixeiras cheias em locais movimentados.

A solucao proposta combina uma lixeira com sensores, um microcontrolador, uma estrutura fisica impressa em 3D e um painel web. O sensor mede o nivel de enchimento e o sistema mostra o status por ponto de descarte. O molde/modelo da lixeira e as pecas complementares serao preparados no Bambu Studio e impressos em uma Bambu Lab A1.

## 5. Objetivos

### Objetivo geral

Desenvolver um prototipo de lixeira inteligente capaz de monitorar o nivel de ocupacao e apoiar a decisao de coleta em um ambiente universitario.

### Objetivos especificos

- Mapear o problema com usuarios e responsaveis pela limpeza.
- Definir requisitos do prototipo fisico e do painel.
- Projetar o molde/modelo da lixeira e os complementos em fluxo de impressao 3D.
- Construir um modelo funcional de monitoramento.
- Criar uma interface para visualizacao dos pontos de descarte.
- Validar a proposta com feedbacks do publico mapeado.

## 6. Validacao

A validacao inicial pode ser feita por entrevistas rapidas ou formulario com alunos, funcionarios e equipe de limpeza. As perguntas devem confirmar:

- se lixeiras cheias sao percebidas como problema real;
- quais locais tem maior risco de lotacao;
- se um painel de status ajudaria na rotina;
- quais informacoes seriam mais uteis para tomada de decisao.

## 7. Desenvolvimento

### 7.1 Prototipo fisico

O prototipo fisico sera composto por uma lixeira em escala de demonstracao, com tampa preparada para receber o sensor ultrassonico, suporte para o ESP32, LEDs de status e organizacao interna dos cabos.

A fabricacao sera feita com apoio de impressao 3D. O grupo utilizara a impressora Bambu Lab A1 e o Bambu Studio para preparar o molde/modelo da lixeira e pecas complementares, como:

- tampa com suporte para o sensor HC-SR04;
- suporte ou caixa para o ESP32;
- suporte dos LEDs de status;
- canaletas ou presilhas para passagem de fios;
- base de apoio para estabilidade do prototipo.

### 7.2 Eletronica e firmware

- Sensor ultrassonico HC-SR04 para medir distancia ate o lixo.
- ESP32 como microcontrolador principal.
- LEDs para indicar status local: verde, amarelo, vermelho e Wi-Fi.
- Firmware com leitura de distancia, calculo de ocupacao e saida Serial em JSON.

### 7.3 Dashboard

O painel web mostra lixeiras no mapa, nivel de enchimento, status visual, historico e area operacional. Na primeira etapa, o dashboard usa dados simulados. Na etapa seguinte, podera receber leituras reais do ESP32 por Serial ou Wi-Fi.

### 7.4 Calibracao

A calibracao depende de duas medidas:

- distancia da lixeira vazia;
- distancia considerada como lixeira cheia.

Esses valores serao usados no firmware para converter distancia em porcentagem de ocupacao.

## 8. Resultados

Espaco reservado para testes, medicoes e feedbacks apos a construcao do prototipo.

## 9. Conclusao

Espaco reservado para consideracoes finais, aprendizados do grupo, limitacoes e proximos passos.

## Referencias iniciais

- Organizacao das Nacoes Unidas no Brasil. Objetivos de Desenvolvimento Sustentavel.
- Materiais de referencia da disciplina UPx.

## Anexos previstos

- Mapa de empatia.
- Arvore de problemas.
- Imagens do prototipo.
- Fotos da modelagem no Bambu Studio.
- Fotos da impressao 3D na Bambu Lab A1.
- Prints do painel web.
