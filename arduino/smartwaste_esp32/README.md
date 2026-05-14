# Firmware SmartWaste ESP32

Sketch inicial para medir o nivel da lixeira com sensor ultrassonico HC-SR04, acionar LEDs de status e imprimir as leituras no Monitor Serial em JSON.

## Componentes

- ESP32
- Sensor ultrassonico HC-SR04
- LED verde, LED amarelo, LED vermelho e LED de Wi-Fi
- 4 resistores de 220 ohms
- Protoboard e jumpers

## Pinagem

| Componente | Pino ESP32 |
| --- | --- |
| HC-SR04 TRIG | GPIO 33 |
| HC-SR04 ECHO | GPIO 32 |
| LED Wi-Fi | GPIO 27 |
| LED vermelho | GPIO 13 |
| LED amarelo | GPIO 12 |
| LED verde | GPIO 14 |

> Importante: o HC-SR04 costuma operar em 5V. Como o ESP32 trabalha com 3.3V nos GPIOs, use divisor de tensao no pino ECHO para proteger a placa.

## Como usar

1. Abra `smartwaste_esp32.ino` na Arduino IDE.
2. Selecione a placa ESP32 usada no menu de placas.
3. Se quiser conectar no Wi-Fi, copie `config.example.h` para `config.h` na mesma pasta e preencha `WIFI_SSID` e `WIFI_PASSWORD`.
4. Conecte o ESP32 via USB, selecione a porta correta e envie o sketch.
5. Abra o Monitor Serial em `9600` baud.

O sketch tambem funciona sem `config.h`; nesse caso, ele mede a lixeira localmente e informa que o Wi-Fi esta desativado.

## Calibracao

As distancias principais ficam no inicio do sketch:

```cpp
constexpr float EMPTY_DISTANCE_CM = 35.0;
constexpr float FULL_DISTANCE_CM = 15.0;
```

- `EMPTY_DISTANCE_CM`: distancia do sensor ate o fundo da lixeira vazia.
- `FULL_DISTANCE_CM`: distancia medida quando a lixeira deve ser considerada cheia.

Depois de instalar o sensor na tampa, meca esses dois valores no Monitor Serial e ajuste as constantes.

## Saida Serial

Exemplo de leitura:

```json
{"binId":"B01","distanceCm":24.7,"fillPercent":52,"status":"ok","wifiConnected":true,"uptimeMs":12345}
```

Status:

- `ok`: abaixo de 55%
- `atencao`: de 55% a 79%
- `critico`: 80% ou mais
- `erro`: sem leitura valida do sensor

## Documentacao relacionada

- `../../docs/prototipo-fisico.md`: montagem fisica, Bambu Lab A1 e Bambu Studio.
- `../../docs/software.md`: papel do firmware na solucao completa.
