#include <WiFi.h>
#include <math.h>
#include <string.h>

#if __has_include("config.h")
#include "config.h"
#endif

#ifndef WIFI_SSID
#define WIFI_SSID ""
#endif

#ifndef WIFI_PASSWORD
#define WIFI_PASSWORD ""
#endif

#ifndef BIN_ID
#define BIN_ID "B01"
#endif

constexpr uint8_t PIN_TRIG = 33;
constexpr uint8_t PIN_ECHO = 32;
constexpr uint8_t PIN_LED_WIFI = 27;
constexpr uint8_t PIN_LED_RED = 13;
constexpr uint8_t PIN_LED_YELLOW = 12;
constexpr uint8_t PIN_LED_GREEN = 14;

constexpr float EMPTY_DISTANCE_CM = 35.0;
constexpr float FULL_DISTANCE_CM = 15.0;
constexpr unsigned long SERIAL_INTERVAL_MS = 1000;
constexpr unsigned long WIFI_TIMEOUT_MS = 15000;
constexpr unsigned long ECHO_TIMEOUT_US = 30000;

unsigned long lastSerialAt = 0;
unsigned long lastWifiAttemptAt = 0;

bool hasWifiConfig()
{
  return strlen(WIFI_SSID) > 0;
}

void setLevelLeds(const char *status)
{
  digitalWrite(PIN_LED_RED, strcmp(status, "critico") == 0 ? HIGH : LOW);
  digitalWrite(PIN_LED_YELLOW, strcmp(status, "atencao") == 0 ? HIGH : LOW);
  digitalWrite(PIN_LED_GREEN, strcmp(status, "ok") == 0 ? HIGH : LOW);
}

void connectWifi()
{
  if (!hasWifiConfig()) {
    digitalWrite(PIN_LED_WIFI, LOW);
    Serial.println("WiFi desativado: crie config.h para conectar na rede.");
    return;
  }

  Serial.print("Conectando ao WiFi");
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  const unsigned long startedAt = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startedAt < WIFI_TIMEOUT_MS) {
    digitalWrite(PIN_LED_WIFI, !digitalRead(PIN_LED_WIFI));
    Serial.print(".");
    delay(500);
  }

  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(PIN_LED_WIFI, HIGH);
    Serial.println();
    Serial.print("Rede conectada. IP: ");
    Serial.println(WiFi.localIP());
    return;
  }

  digitalWrite(PIN_LED_WIFI, LOW);
  Serial.println();
  Serial.println("Nao foi possivel conectar ao WiFi. Continuando leitura local.");
}

void maintainWifi()
{
  if (!hasWifiConfig()) {
    return;
  }

  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(PIN_LED_WIFI, HIGH);
    return;
  }

  digitalWrite(PIN_LED_WIFI, LOW);

  if (millis() - lastWifiAttemptAt >= WIFI_TIMEOUT_MS) {
    lastWifiAttemptAt = millis();
    Serial.println("WiFi desconectado. Tentando reconectar...");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  }
}

float readDistanceCm()
{
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  const unsigned long duration = pulseIn(PIN_ECHO, HIGH, ECHO_TIMEOUT_US);
  if (duration == 0) {
    return NAN;
  }

  return (duration * 0.0343) / 2.0;
}

int calculateFillPercent(float distanceCm)
{
  if (isnan(distanceCm)) {
    return -1;
  }

  const float range = EMPTY_DISTANCE_CM - FULL_DISTANCE_CM;
  const float fill = ((EMPTY_DISTANCE_CM - distanceCm) * 100.0) / range;
  return constrain(static_cast<int>(round(fill)), 0, 100);
}

const char *getStatus(int fillPercent)
{
  if (fillPercent < 0) {
    return "erro";
  }

  if (fillPercent >= 80) {
    return "critico";
  }

  if (fillPercent >= 55) {
    return "atencao";
  }

  return "ok";
}

void printReading(float distanceCm, int fillPercent, const char *status)
{
  Serial.print("{\"binId\":\"");
  Serial.print(BIN_ID);
  Serial.print("\",\"distanceCm\":");

  if (isnan(distanceCm)) {
    Serial.print("null");
  } else {
    Serial.print(distanceCm, 1);
  }

  Serial.print(",\"fillPercent\":");
  Serial.print(fillPercent);
  Serial.print(",\"status\":\"");
  Serial.print(status);
  Serial.print("\",\"wifiConnected\":");
  Serial.print(WiFi.status() == WL_CONNECTED ? "true" : "false");
  Serial.print(",\"uptimeMs\":");
  Serial.print(millis());
  Serial.println("}");
}

void setup()
{
  Serial.begin(9600);

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_LED_WIFI, OUTPUT);
  pinMode(PIN_LED_RED, OUTPUT);
  pinMode(PIN_LED_YELLOW, OUTPUT);
  pinMode(PIN_LED_GREEN, OUTPUT);

  digitalWrite(PIN_TRIG, LOW);
  setLevelLeds("erro");

  Serial.println("SmartWaste ESP32 iniciado.");
  connectWifi();
}

void loop()
{
  maintainWifi();

  if (millis() - lastSerialAt < SERIAL_INTERVAL_MS) {
    delay(20);
    return;
  }

  lastSerialAt = millis();

  const float distanceCm = readDistanceCm();
  const int fillPercent = calculateFillPercent(distanceCm);
  const char *status = getStatus(fillPercent);

  setLevelLeds(status);
  printReading(distanceCm, fillPercent, status);
}
