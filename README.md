# SmartWaste

SmartWaste e um projeto academico de lixeira inteligente para apoiar a gestao de residuos no campus da Facens. A solucao monitora o nivel de enchimento das lixeiras, prioriza coletas e mostra dados em um dashboard responsivo.

## Objetivo

Construir uma solucao de baixo custo, com prototipo fisico e painel web, capaz de:

- medir o nivel de ocupacao de varias lixeiras;
- indicar quando a coleta deve ser priorizada;
- visualizar pontos de descarte no mapa do campus;
- simular atualizacoes em JavaScript;
- registrar historico simples para analise da rotina de coleta.

## Escopo inicial

- Pagina inicial sobre o projeto.
- Proposta de valor, beneficios, impacto e fluxo de funcionamento.
- Dashboard web em HTML, CSS e JavaScript.
- Cards de lixeiras com nome, localizacao, nivel, status e barra de progresso.
- Botao para atualizar dados simulados.
- Filtros por status e localizacao.
- Historico de leituras e data/hora da ultima atualizacao.
- Tela de detalhes responsiva para uso mobile.
- Alertas visuais quando uma lixeira passa de 80%.
- Secao de tecnologias, equipe, links uteis e favicon.
- Menu responsivo com hamburguer, destaque de navegacao e botao voltar ao topo.
- Animacoes leves de entrada e feedback visual em botoes.
- Documentacao alinhada ao modelo de relatorio UPx.
- Assets do projeto, incluindo o mapa do campus.
- Referencia do modelo oficial do trabalho escrito.

## Estrutura

```text
.
|-- assets/
|   |-- facens-mapa.jpg
|   |-- facens-mapa-optimized.jpg
|   |-- facens-mapa.png
|   `-- favicon.svg
|-- docs/
|   |-- checklist-upx.md
|   |-- projeto-upx.md
|   `-- modelos/
|       `-- UPx1-Modelo-do-Projeto-Escrito-2026-S1.docx
|-- arduino/
|   `-- smartwaste_esp32/
|       |-- README.md
|       |-- config.example.h
|       `-- smartwaste_esp32.ino
|-- src/
|   |-- app.js
|   `-- styles.css
|-- index.html
|-- vercel.json
|-- .gitignore
`-- README.md
```

## Como abrir o prototipo

Abra o arquivo `index.html` no navegador.

## Firmware do prototipo fisico

O sketch do ESP32 esta em `arduino/smartwaste_esp32/`.

Ele mede a distancia com sensor ultrassonico HC-SR04, calcula a porcentagem de ocupacao da lixeira, aciona LEDs de status e imprime leituras em JSON no Monitor Serial.

Para conectar no Wi-Fi, copie `arduino/smartwaste_esp32/config.example.h` para `arduino/smartwaste_esp32/config.h` e preencha as credenciais. O arquivo `config.h` e ignorado pelo Git.

## Deploy na Vercel

O projeto esta pronto para deploy estatico na Vercel. Ao importar o repositorio no painel da Vercel, use as configuracoes padrao:

- Framework preset: Other
- Build command: vazio
- Output directory: vazio
- Install command: vazio

## Tecnologias

- HTML
- CSS
- JavaScript
- Arduino IDE
- ESP32
- HC-SR04
- Git/GitHub
- Vercel

## Status

Em desenvolvimento. A primeira etapa e fechar problema, publico, proposta de valor, ODS e plano de validacao para o relatorio da UPx.
