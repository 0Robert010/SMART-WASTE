# SmartWaste

SmartWaste e um projeto academico de lixeira inteligente para apoiar a gestao de residuos no campus da Facens. A solucao combina prototipo fisico, firmware ESP32, modelagem 3D e painel web para monitorar o nivel de ocupacao das lixeiras e priorizar coletas.

## Visao geral

O projeto e dividido em quatro frentes:

- Prototipo fisico com estrutura impressa em 3D.
- Firmware em ESP32 para leitura do sensor ultrassonico HC-SR04.
- Dashboard web responsivo com mapa, status, historico e area operacional.
- Documentacao tecnica e academica para a UPx.

## Objetivo

Construir uma solucao de baixo custo, com prototipo fisico e painel web, capaz de:

- medir o nivel de ocupacao de lixeiras;
- indicar quando a coleta deve ser priorizada;
- visualizar pontos de descarte no mapa do campus;
- registrar historico simples para analise da rotina de coleta;
- demonstrar fabricacao digital com Bambu Lab A1 e Bambu Studio;
- servir como base para validacao com usuarios reais.

## Modulos

| Modulo | Descricao |
| --- | --- |
| Prototipo fisico | Lixeira, tampa, suporte do sensor, caixa do ESP32, suporte de LEDs e canaletas |
| Modelagem 3D | Arquivos preparados no Bambu Studio para impressao na Bambu Lab A1 |
| Firmware | Leitura do HC-SR04, calculo de ocupacao, LEDs e saida Serial JSON |
| Dashboard | Interface web com cards, filtros, mapa, historico e area de coleta |
| Documentacao | Relatorio, arquitetura, validacao, montagem e organizacao do projeto |

## Estrutura

```text
.
|-- assets/
|   |-- facens-mapa.jpg
|   |-- facens-mapa-optimized.jpg
|   |-- facens-mapa.png
|   `-- favicon.svg
|-- arduino/
|   `-- smartwaste_esp32/
|       |-- README.md
|       |-- config.example.h
|       `-- smartwaste_esp32.ino
|-- docs/
|   |-- evidencias/
|   |-- modelos/
|   |-- README.md
|   |-- arquitetura.md
|   |-- checklist-upx.md
|   |-- projeto-upx.md
|   |-- prototipo-fisico.md
|   |-- software.md
|   `-- validacao.md
|-- modelagem-3d/
|   |-- exports/
|   |-- fontes/
|   `-- referencias/
|-- src/
|   |-- app.js
|   |-- collector.css
|   |-- collector.js
|   `-- styles.css
|-- index.html
|-- vercel.json
|-- .gitignore
`-- README.md
```

## Como abrir o painel

Abra o arquivo `index.html` no navegador.

## Firmware do prototipo fisico

O sketch do ESP32 esta em `arduino/smartwaste_esp32/`.

Ele mede a distancia com sensor ultrassonico HC-SR04, calcula a porcentagem de ocupacao da lixeira, aciona LEDs de status e imprime leituras em JSON no Monitor Serial.

Para conectar no Wi-Fi, copie `arduino/smartwaste_esp32/config.example.h` para `arduino/smartwaste_esp32/config.h` e preencha as credenciais. O arquivo `config.h` e ignorado pelo Git.

## Modelagem e impressao 3D

Os arquivos de modelagem ficam em `modelagem-3d/`.

O prototipo fisico sera preparado no Bambu Studio e impresso em uma Bambu Lab A1. A modelagem deve contemplar o molde/modelo da lixeira e pecas complementares, como tampa do sensor, suporte do ESP32, suporte dos LEDs, canaletas de cabos e base de apoio.

Guia detalhado: `docs/prototipo-fisico.md`.

## Documentacao

- `docs/README.md`: indice da documentacao.
- `docs/arquitetura.md`: visao geral da solucao.
- `docs/prototipo-fisico.md`: montagem fisica e fabricacao 3D.
- `docs/software.md`: painel web, firmware e integracao.
- `docs/validacao.md`: plano de testes e entrevistas.
- `docs/evidencias/`: fotos, prints e registros de testes.
- `docs/projeto-upx.md`: texto base do relatorio.
- `docs/checklist-upx.md`: pendencias e proximas tarefas.

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
- Bambu Lab A1
- Bambu Studio
- Impressao 3D
- Git/GitHub
- Vercel

## Status

Em desenvolvimento. O projeto ja possui painel web, firmware inicial do ESP32 e documentacao para fabricacao do prototipo fisico com impressao 3D.
