const collections = [
  {
    id: "C01",
    address: "B07 Cantina - Area de alimentacao",
    wasteType: "Organico",
    priority: "alta",
    status: "pendente",
    order: 1
  },
  {
    id: "C02",
    address: "B04 Predio Facens - Acesso lateral",
    wasteType: "Reciclavel misto",
    priority: "alta",
    status: "em-andamento",
    order: 2,
    startedAt: new Date(Date.now() - 18 * 60000)
  },
  {
    id: "C03",
    address: "B01 Biblioteca - Entrada principal",
    wasteType: "Papel e plastico",
    priority: "media",
    status: "pendente",
    order: 3
  },
  {
    id: "C04",
    address: "B02 Bloco central - Corredor de acesso",
    wasteType: "Reciclavel seco",
    priority: "media",
    status: "pendente",
    order: 4
  },
  {
    id: "C05",
    address: "B06 Portaria - Entrada do campus",
    wasteType: "Rejeito comum",
    priority: "baixa",
    status: "concluido",
    order: 5,
    startedAt: new Date(Date.now() - 94 * 60000),
    completedAt: new Date(Date.now() - 72 * 60000)
  },
  {
    id: "C06",
    address: "B03 Quadra - Area esportiva",
    wasteType: "Plastico",
    priority: "baixa",
    status: "concluido",
    order: 6,
    startedAt: new Date(Date.now() - 140 * 60000),
    completedAt: new Date(Date.now() - 118 * 60000)
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

const collectorList = document.querySelector("#collector-list");
const collectorRoute = document.querySelector("#collector-route");
const collectorHistory = document.querySelector("#collector-history");
const collectorPending = document.querySelector("#collector-pending");
const collectorActive = document.querySelector("#collector-active");
const collectorDone = document.querySelector("#collector-done");
const collectorTotal = document.querySelector("#collector-total");
const collectorHistoryCount = document.querySelector("#collector-history-count");

let highlightedCollectionId = "";

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

function renderCollectorSummary() {
  collectorPending.textContent = countByStatus("pendente");
  collectorActive.textContent = countByStatus("em-andamento");
  collectorDone.textContent = countByStatus("concluido");
  collectorTotal.textContent = `${collections.length} coletas`;
  collectorHistoryCount.textContent = `${countByStatus("concluido")} registros`;
}

function renderCollectorList() {
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
              <h3>${collection.address}</h3>
            </div>
            <div class="collection-tags" aria-label="Prioridade e status">
              <span class="priority-badge priority-${collection.priority}">${priorityLabels[collection.priority]}</span>
              <span class="collector-status status-${collection.status}">${collectionStatusLabels[collection.status]}</span>
            </div>
          </header>

          <div class="collection-meta">
            <article>
              <span>Tipo de residuo</span>
              <strong>${collection.wasteType}</strong>
            </article>
            <article>
              <span>Endereco</span>
              <strong>${collection.address}</strong>
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
  collectorRoute.innerHTML = collections
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(
      (collection) => `
        <li class="${collection.status === "concluido" ? "is-done" : ""}">
          <span class="route-step">${collection.order}</span>
          <div>
            <div class="route-item-header">
              <strong>${collection.id} - ${collection.address}</strong>
              <span class="collector-status status-${collection.status}">${collectionStatusLabels[collection.status]}</span>
            </div>
            <p>${collection.wasteType} - prioridade ${priorityLabels[collection.priority].toLowerCase()}</p>
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
    collectorHistory.innerHTML = '<li class="collector-empty">Nenhuma coleta finalizada ainda.</li>';
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
          <p>${collection.address}</p>
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
    renderCollectorArea();
    notifyCollector(`${collection.id} iniciada com sucesso.`);
    return;
  }

  if (action === "finish" && collection.status === "em-andamento") {
    collection.status = "concluido";
    collection.completedAt = new Date();
    highlightedCollectionId = collection.id;
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

renderCollectorArea();
