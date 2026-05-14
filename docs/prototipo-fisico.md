# Prototipo Fisico

## Objetivo

Construir uma lixeira inteligente funcional, com estrutura fisica impressa em 3D, sensor ultrassonico para medir o nivel de ocupacao, ESP32 para processar as leituras e LEDs para indicar o status localmente.

## Ferramentas de fabricacao

- Impressora 3D: Bambu Lab A1.
- Software de preparacao: Bambu Studio.
- Metodo: modelagem, fatiamento, impressao de teste, ajuste e impressao final.

## Pecas previstas

| Peca | Funcao |
| --- | --- |
| Corpo ou molde da lixeira | Representar o recipiente principal do prototipo |
| Tampa superior | Sustentar o sensor e proteger a eletronica |
| Suporte do HC-SR04 | Manter o sensor alinhado para baixo, apontando para o interior da lixeira |
| Caixa do ESP32 | Proteger a placa e organizar os cabos |
| Suporte dos LEDs | Deixar os indicadores verde, amarelo, vermelho e Wi-Fi visiveis |
| Canaletas ou presilhas | Guiar fios e evitar que a fiacao fique solta |
| Base ou pe de apoio | Melhorar estabilidade durante demonstracoes |

## Fluxo no Bambu Studio

1. Criar ou importar o modelo 3D da lixeira e dos complementos.
2. Selecionar a impressora Bambu Lab A1 no perfil do Bambu Studio.
3. Conferir escala, orientacao das pecas e area util de impressao.
4. Ajustar preenchimento, parede, suporte e aderencia conforme a peca.
5. Fatiar o modelo e revisar tempo, consumo de material e pontos criticos.
6. Exportar o arquivo de impressao ou enviar para a impressora.
7. Registrar fotos do processo para anexar ao relatorio.

## Recomendacoes de projeto

- Medir a lixeira real antes de finalizar o modelo.
- Deixar acesso facil ao cabo USB do ESP32.
- Prever ventilacao minima para a placa.
- Posicionar LEDs na frente do prototipo.
- Fixar o HC-SR04 na tampa, centralizado e sem obstrucao.
- Evitar paredes finas demais em regioes de encaixe.
- Separar pecas grandes em modulos quando o volume de impressao exigir.
- Projetar encaixes que permitam desmontagem para manutencao.

## Checklist de montagem

- [ ] Medir altura interna da lixeira vazia.
- [ ] Medir a distancia considerada como lixeira cheia.
- [ ] Modelar corpo/molde da lixeira.
- [ ] Modelar tampa com abertura para o sensor.
- [ ] Modelar caixa ou suporte do ESP32.
- [ ] Modelar suporte dos LEDs.
- [ ] Fatiar no Bambu Studio.
- [ ] Imprimir primeira versao na Bambu Lab A1.
- [ ] Ajustar encaixes e tolerancias.
- [ ] Montar eletronica no prototipo.
- [ ] Calibrar `EMPTY_DISTANCE_CM` e `FULL_DISTANCE_CM` no firmware.
- [ ] Registrar fotos e resultados.

## Eletronica inicial

| Componente | Uso |
| --- | --- |
| ESP32 | Microcontrolador principal |
| HC-SR04 | Sensor de distancia para estimar nivel de ocupacao |
| LED verde | Lixeira em estado ok |
| LED amarelo | Lixeira em atencao |
| LED vermelho | Lixeira critica |
| LED Wi-Fi | Indicacao de conexao |
| Resistores de 220 ohms | Limitacao de corrente dos LEDs |
| Jumpers e protoboard | Montagem inicial e testes |

## Cuidados

- O ESP32 usa GPIOs de 3.3V. Se o HC-SR04 estiver alimentado com 5V, use divisor de tensao no pino ECHO.
- Evite deixar fios expostos no interior da lixeira.
- Teste o sensor antes de fechar a tampa.
- Nao coloque a eletronica em contato direto com residuos.
