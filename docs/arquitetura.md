# Arquitetura do Projeto

## Visao geral

O SmartWaste combina um prototipo fisico de lixeira inteligente com um painel web de acompanhamento. O objetivo e medir o nivel de ocupacao da lixeira, classificar o status de coleta e apresentar essas informacoes de forma simples para tomada de decisao.

## Componentes

| Camada | Responsabilidade | Arquivos |
| --- | --- | --- |
| Prototipo fisico | Estrutura da lixeira, suporte do sensor, LEDs e acabamento | `modelagem-3d/`, `docs/prototipo-fisico.md` |
| Firmware | Leitura do sensor ultrassonico, calculo de ocupacao e envio das leituras | `arduino/smartwaste_esp32/` |
| Dashboard | Visualizacao de lixeiras, mapa, status e historico | `index.html`, `src/` |
| Documentacao | Relatorio academico, roteiro tecnico, validacao e evidencias | `docs/` |

## Fluxo de dados

```text
Sensor HC-SR04
  -> ESP32
  -> calculo de distancia e ocupacao
  -> LEDs locais e saida Serial JSON
  -> painel web ou integracao futura por API/Wi-Fi
```

## Status de ocupacao

| Ocupacao | Status | Indicador |
| --- | --- | --- |
| 0% a 54% | ok | LED verde |
| 55% a 79% | atencao | LED amarelo |
| 80% a 100% | critico | LED vermelho |

## Estrutura do repositorio

```text
.
|-- arduino/
|   `-- smartwaste_esp32/
|-- assets/
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
|-- index.html
|-- README.md
`-- vercel.json
```

## Decisoes tecnicas atuais

- O microcontrolador inicial e o ESP32.
- O sensor de nivel inicial e o HC-SR04.
- A estrutura fisica sera modelada no Bambu Studio e impressa em uma Bambu Lab A1.
- O painel web atual usa HTML, CSS e JavaScript estatico.
- A primeira integracao com o prototipo sera feita por leitura Serial em JSON.
