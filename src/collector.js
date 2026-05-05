const collections = [
  {
    id: "C01",
    binId: "B07",
    address: "Cantina - Area de alimentacao",
    wasteType: "Organico",
    priority: "alta",
    status: "pendente",
    fill: 91,
    estimatedTime: "08:35",
    estimatedKg: 16,
    order: 1
  },
  {
    id: "C02",
    binId: "B04",
    address: "Predio Facens - Acesso lateral",
    wasteType: "Reciclavel misto",
    priority: "alta",
    status: "em-andamento",
    fill: 86,
    estimatedTime: "08:50",
    estimatedKg: 14,
    order: 2,
    startedAt: new Date(Date.now() - 18 * 60000)
  },
  {
    id: "C03",
    binId: "B01",
    address: "Biblioteca - Entrada principal",
    wasteType: "Papel e plastico",
    priority: "media",
    status: "pendente",
    fill: 78,
    estimatedTime: "09:10",
    estimatedKg: 10,
    order: 3
  },
  {
    id: "C04",
    binId: "B02",
    address: "Bloco central - Corredor de acesso",
    wasteType: "Reciclavel seco",
    priority: "media",
    status: "pendente",
    fill: 63,
    estimatedTime: "09:25",
    estimatedKg: 8,
    order: 4
  },
  {
    id: "C05",
    binId: "B06",
    address: "Portaria - Entrada do campus",
    wasteType: "Rejeito comum",
    priority: "baixa",
    status: "concluido",
    fill: 44,
    estimatedTime: "07:50",
    estimatedKg: 18,
    order: 5,
    startedAt: new Date(Date.now() - 94 * 60000),
    completedAt: new Date(Date.now() - 72 * 60000)
  },
  {
    id: "C06",
    binId: "B03",
    address: "Quadra - Area esportiva",
    wasteType: "Plastico",
    priority: "baixa",
    status: "concluido",
    fill: 34,
    estimatedTime: "07:25",
    estimatedKg: 12,
    order: 6,
    startedAt: new Date(Date.now() - 140 * 60000),
    completedAt: new Date(Date.now() - 118 * 60000)
  },
  {
    id: "C07",
    binId: "B05",
    address: "Laboratorios - Area externa",
    wasteType: "Eletronico",
    priority: "media",
    status: "concluido",
    fill: 52,
    estimatedTime: "07:05",
    estimatedKg: 11,
    order: 7,
    startedAt: new Date(Date.now() - 176 * 60000),
    completedAt: new Date(Date.now() - 151 * 60000)
  },
  {
    id: "C08",
    binId: "B08",
    address: "Estacionamento principal - Ilha seletiva",
    wasteType: "Vidro e metal",
    priority: "baixa",
    status: "pendente",
    fill: 48,
    estimatedTime: "09:45",
    estimatedKg: 9,
    order: 8
  }
];

const priorityLabels = {
  alta: "Alta",
  media: "Media",
  baixa: "Baixa"
};

const collectionStatusLabels = {
  pendente: "Pendente",
  "em-andamento": "Em andamento",
  concluido: "Concluido"
};

const priorityScore = {
  alta: 3,
  media: 2,
  baixa: 1
};

const statusScore = {
  "em-andamento": 4,
  pendente: 3,
  concluido: 1
};

const collectorList = document.querySelector("#collector-list");
const collectorRoute = document.querySelector("#collector-route");
const collectorHistory = document.querySelector("#collector-history");
const collectorPending = document.querySelector("#collector-pending");
const collectorActive = document.querySelector("#collector-active");
const collectorDone = document.querySelector("#collector-done");
const collectorKg = document.querySelector("#collector-kg");
const collectorTotal = document.querySelector("#collector-total");
const collectorHistoryCount = document.querySelector("#collector-history-count");
const collectorPoints = document.querySelector("#collector-points");
const collectorProgress = document.querySelector("#collector-progress");
const collectorProgressLabel = document.querySelector("#collector-progress-label");
const nextCollectionCard = document.querySelector("#next-collection-card");
const collectorFeedbackTitle = document.querySelector("#collector-feedback-title");
const collectorFeedback = document.querySelector("#collector-feedback");
const collectorRefreshRoute = document.querySelector("#collector-refresh-route");

let highlightedCollectionId = "";
let routeRefreshCount = 0;

function formatCollectorDate(date) {
  if (typeof formatDate === "function") {
    return formatDate(date);
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function notifyCollector(message) {
  if (typeof showToast === "function") {
    showToast(message);
    return;
  }

  window.alert(message);
}

function countByStatus(status) {
  return collections.filter((collection) => collection.status === status).length;
}

function getCompletedCollections() {
  return collections.filter((collection) => collection.status === "concluido");
}

function getCollectedKg() {
  return getCompletedCollections().reduce(
    (total, collection) => total + collection.estimatedKg,
    0
  );
}

function getCollectorScore() {
  return getCompletedCollections().length * 120 + countByStatus("em-andamento") * 40 + getCollectedKg();
}

function getRecommendedCollection() {
  return collections
    .filter((collection) => collection.status !== "concluido")
    .sort((a, b) => {
      if (statusScore[b.status] !== statusScore[a.status]) {
        return statusScore[b.status] - statusScore[a.status];
      }

      if (priorityScore[b.priority] !== priorityScore[a.priority]) {
        return priorityScore[b.priority] - priorityScore[a.priority];
      }

      return b.fill - a.fill;
    })[0];
}

function getCollectionAddress(collection) {
  return `${collection.binId} ${collection.address}`;
}

function getShortCollectionLabel(collection) {
  return `${collection.id} - ${collection.binId} ${collection.address.split(" - ")[0]}`;
}

function setFeedback(title, message) {
  if (!collectorFeedbackTitle || !collectorFeedback) {
    return;
  }

  collectorFeedbackTitle.textContent = title;
  collectorFeedback.textContent = message;
}

function updateRouteOrder() {
  routeRefreshCount += 1;
  collections
    .sort((a, b) => {
      if (a.status === "concluido" && b.status !== "concluido") {
        return 1;
      }

      if (a.status !== "concluido" && b.status === "concluido") {
        return -1;
      }

      if (priorityScore[b.priority] !== priorityScore[a.priority]) {
        return priorityScore[b.priority] - priorityScore[a.priority];
      }

      return b.fill - a.fill;
    })
    .forEach((collection, index) => {
      collection.order = index + 1;
    });
}

function renderCollectorSummary() {
  const completed = countByStatus("concluido");
  const total = collections.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  collectorPending.textContent = countByStatus("pendente");
  collectorActive.textContent = countByStatus("em-andamento");
  collectorDone.textContent = completed;
  collectorKg.textContent = `${getCollectedKg()} kg`;
  collectorTotal.textContent = total > 0 ? `${total} coletas` : "Nenhuma coleta programada";
  collectorHistoryCount.textContent = `${completed} registros`;
  collectorPoints.textContent = `${getCollectorScore()} pts`;
  collectorProgress.style.width = `${progress}%`;
  collectorProgressLabel.textContent = `${completed} de ${total} coletas concluidas`;
}

function renderNextCollection() {
  const recommended = getRecommendedCollection();

  if (!recommended) {
    nextCollectionCard.innerHTML = `
      <p class="eyebrow">Proxima coleta recomendada</p>
      <h2>Missao completa</h2>
      <p>Todas as coletas simuladas foram concluidas. Excelente ritmo, Mique.</p>
    `;
    return;
  }

  const actionText = recommended.status === "em-andamento" ? "Concluir agora" : "Iniciar agora";

  nextCollectionCard.innerHTML = `
    <p class="eyebrow">Proxima coleta recomendada</p>
    <h2>${getShortCollectionLabel(recommended)}</h2>
    <p>${actionText}: ${recommended.address}. ${recommended.wasteType}, prioridade ${priorityLabels[recommended.priority].toLowerCase()}, nivel ${recommended.fill}%.</p>
    <div class="next-collection-meta">
      <span>${recommended.estimatedTime}</span>
      <span>${recommended.estimatedKg} kg estimados</span>
      <span class="collector-status status-${recommended.status}">${collectionStatusLabels[recommended.status]}</span>
    </div>
  `;
}

function renderCollectorList() {
  if (collections.length === 0) {
    collectorList.innerHTML = '<p class="collector-empty">Nenhuma coleta programada para hoje.</p>';
    return;
  }

  collectorList.innerHTML = collections
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((collection) => {
      const canStart = collection.status === "pendente";
      const canFinish = collection.status === "em-andamento";
      const isHighlighted = highlightedCollectionId === collection.id;

      return `
        <article class="collection-card priority-${collection.priority} status-${collection.status}${isHighlighted ? " is-updated" : ""}">
          <header class="collection-header">
            <div class="collection-title">
              <span class="collection-code">${collection.id} - Ordem ${collection.order}</span>
              <h3>${getCollectionAddress(collection)}</h3>
            </div>
            <div class="collection-tags" aria-label="Prioridade e status">
              <span class="priority-badge priority-${collection.priority}">Prioridade ${priorityLabels[collection.priority]}</span>
              <span class="collector-status status-${collection.status}">${collectionStatusLabels[collection.status]}</span>
            </div>
          </header>

          <div class="collection-signal">
            <span>Nivel conectado ao dashboard</span>
            <strong>${collection.fill}%</strong>
            <div class="collection-fill" aria-label="Nivel da lixeira ${collection.fill}%">
              <span style="width: ${collection.fill}%"></span>
            </div>
          </div>

          <div class="collection-meta">
            <article>
              <span>Endereco/local</span>
              <strong>${collection.address}</strong>
            </article>
            <article>
              <span>Tipo de residuo</span>
              <strong>${collection.wasteType}</strong>
            </article>
            <article>
              <span>Horario estimado</span>
              <strong>${collection.estimatedTime}</strong>
            </article>
            <article>
              <span>Peso estimado</span>
              <strong>${collection.estimatedKg} kg</strong>
            </article>
          </div>

          <div class="collection-actions" aria-label="Acoes da coleta">
            <button class="collector-action start" type="button" data-action="start" data-collection-id="${collection.id}" ${canStart ? "" : "disabled"}>
              Iniciar coleta
            </button>
            <button class="collector-action finish" type="button" data-action="finish" data-collection-id="${collection.id}" ${canFinish ? "" : "disabled"}>
              Concluir coleta
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCollectorRoute() {
  if (collections.length === 0) {
    collectorRoute.innerHTML = '<li class="collector-empty">Nenhuma rota simulada disponivel.</li>';
    return;
  }

  collectorRoute.innerHTML = collections
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(
      (collection) => `
        <li class="${collection.status === "concluido" ? "is-done" : ""}">
          <span class="route-step">${collection.order}</span>
          <div>
            <div class="route-item-header">
              <strong>${collection.id} - ${getCollectionAddress(collection)}</strong>
              <span class="collector-status status-${collection.status}">${collectionStatusLabels[collection.status]}</span>
            </div>
            <p>${collection.estimatedTime} - ${collection.wasteType} - ${collection.estimatedKg} kg - prioridade ${priorityLabels[collection.priority].toLowerCase()}</p>
          </div>
        </li>
      `
    )
    .join("");
}

function renderCollectorHistory() {
  const completedCollections = collections
    .filter((collection) => collection.status === "concluido" && collection.completedAt)
    .sort((a, b) => b.completedAt - a.completedAt);

  if (completedCollections.length === 0) {
    collectorHistory.innerHTML = '<li class="collector-empty">Quando Mique concluir uma coleta, ela aparece aqui com data e tipo.</li>';
    return;
  }

  collectorHistory.innerHTML = completedCollections
    .map(
      (collection) => `
        <li>
          <div class="history-item-header">
            <strong>${collection.id} - ${collection.wasteType}</strong>
            <span>${formatCollectorDate(collection.completedAt)}</span>
          </div>
          <p>${getCollectionAddress(collection)} - ${collection.estimatedKg} kg coletados</p>
        </li>
      `
    )
    .join("");
}

function renderCollectorArea() {
  if (!collectorList) {
    return;
  }

  renderCollectorSummary();
  renderNextCollection();
  renderCollectorList();
  renderCollectorRoute();
  renderCollectorHistory();

  if (highlightedCollectionId) {
    window.setTimeout(() => {
      highlightedCollectionId = "";
      renderCollectorArea();
    }, 720);
  }
}

function updateCollectionStatus(collectionId, action) {
  const collection = collections.find((item) => item.id === collectionId);

  if (!collection) {
    return;
  }

  if (action === "start" && collection.status === "pendente") {
    collection.status = "em-andamento";
    collection.startedAt = new Date();
    highlightedCollectionId = collection.id;
    setFeedback("Coleta iniciada", `${collection.id} em andamento. +40 pts para Mique.`);
    renderCollectorArea();
    notifyCollector(`${collection.id} iniciada com sucesso.`);
    return;
  }

  if (action === "finish" && collection.status === "em-andamento") {
    collection.status = "concluido";
    collection.completedAt = new Date();
    highlightedCollectionId = collection.id;
    setFeedback("Coleta concluida", `${collection.id} registrada. +${collection.estimatedKg} kg no dia.`);
    updateRouteOrder();
    renderCollectorArea();
    notifyCollector(`${collection.id} concluida e registrada no historico.`);
  }
}

if (collectorList) {
  collectorList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-collection-id]");

    if (!button || button.disabled) {
      return;
    }

    updateCollectionStatus(button.dataset.collectionId, button.dataset.action);
  });
}

if (collectorRefreshRoute) {
  collectorRefreshRoute.addEventListener("click", () => {
    updateRouteOrder();
    setFeedback("Rota atualizada", `Prioridade e nivel recalculados. Atualizacao ${routeRefreshCount}.`);
    renderCollectorArea();
    notifyCollector("Rota simulada atualizada.");
  });
}

setFeedback("Rota pronta", "Coletas e rota carregadas para demonstracao.");
renderCollectorArea();
