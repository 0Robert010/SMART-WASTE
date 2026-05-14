# Software e Firmware

## Dashboard web

O painel web mostra pontos de descarte no campus, nivel de ocupacao das lixeiras, status visual, historico de leituras e uma area operacional para acompanhamento da coleta.

Arquivos principais:

- `index.html`: estrutura da interface.
- `src/styles.css`: estilos gerais.
- `src/app.js`: dados simulados, filtros, mapa e historico.
- `src/collector.css`: estilos da area operacional.
- `src/collector.js`: interacoes da area operacional.

## Firmware ESP32

O firmware fica em `arduino/smartwaste_esp32/`.

Responsabilidades:

- Ler a distancia pelo sensor HC-SR04.
- Converter distancia em porcentagem de ocupacao.
- Classificar o status como `ok`, `atencao`, `critico` ou `erro`.
- Acionar LEDs locais.
- Imprimir a leitura no Monitor Serial em formato JSON.

Exemplo de saida:

```json
{"binId":"B01","distanceCm":24.7,"fillPercent":52,"status":"ok","wifiConnected":true,"uptimeMs":12345}
```

## Integracao planejada

Etapa 1: painel com dados simulados para apresentacao visual.

Etapa 2: ESP32 medindo a lixeira real e enviando dados pelo Monitor Serial.

Etapa 3: leitura dos dados Serial por um pequeno servico local ou envio por Wi-Fi.

Etapa 4: dashboard exibindo leituras reais por lixeira.

## Configuracao Wi-Fi

As credenciais ficam fora do Git.

1. Copie `arduino/smartwaste_esp32/config.example.h`.
2. Renomeie a copia para `config.h`.
3. Preencha `WIFI_SSID`, `WIFI_PASSWORD` e `BIN_ID`.

O arquivo `config.h` e ignorado pelo Git.
