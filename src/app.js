const bins = [
  {
    id: "B01",
    name: "Biblioteca",
    location: "Entrada principal",
    area: "Biblioteca",
    fill: 78,
    x: 42,
    y: 26,
    distance: 140,
    updatedAt: new Date(Date.now() - 8 * 60000)
  },
  {
    id: "B02",
    name: "Bloco central",
    location: "Corredor de acesso",
    area: "Bloco central",
    fill: 63,
    x: 54,
    y: 49,
    distance: 95,
    updatedAt: new Date(Date.now() - 16 * 60000)
  },
  {
    id: "B03",
    name: "Quadra",
    location: "Area esportiva",
    area: "Quadra",
    fill: 34,
    x: 18,
    y: 72,
    distance: 260,
    updatedAt: new Date(Date.now() - 25 * 60000)
  },
  {
    id: "B04",
    name: "Predio Facens",
    location: "Acesso lateral",
    area: "Predio Facens",
    fill: 86,
    x: 84,
    y: 42,
    distance: 180,
    updatedAt: new Date(Date.now() - 5 * 60000)
  },
  {
    id: "B05",
    name: "Laboratorios",
    location: "Area externa",
    area: "Laboratorios",
    fill: 52,
    x: 35,
    y: 53,
    distance: 120,
    updatedAt: new Date(Date.now() - 31 * 60000)
  },
  {
    id: "B06",
    name: "Portaria",
    location: "Entrada do campus",
    area: "Portaria",
    fill: 44,
    x: 53,
    y: 86,
    distance: 35,
    updatedAt: new Date(Date.now() - 19 * 60000)
  },
  {
    id: "B07",
    name: "Cantina",
    location: "Area de alimentacao",
    area: "Cantina",
    fill: 91,
    x: 23,
    y: 51,
    distance: 210,
    updatedAt: new Date(Date.now() - 3 * 60000)
  }
].map((bin) => ({
  ...bin,
  history: []
}));

const statusLabels = {
  ok: "Verde",
  atencao: "Amarelo",
  critico: "Vermelho"
};

const pageLinks = document.querySelectorAll("[data-page-link]");
const pages = document.querySelectorAll("[data-page]");
const mapPins = document.querySelector("#map-pins");
const binList = document.querySelector("#bin-list");
const totalBins = document.querySelector("#total-bins");
const criticalBins = document.querySelector("#critical-bins");
const averageFill = document.querySelector("#average-fill");
const homeTotal = document.querySelector("#home-total");
const homeAlerts = document.querySelector("#home-alerts");
const homeAverage = document.querySelector("#home-average");
const visibleCount = document.querySelector("#visible-count");
const historyCount = document.querySelector("#history-count");
const historyList = document.querySelector("#history-list");
const alertStrip = document.querySelector("#alert-strip");
const refreshButton = document.querySelector("#refresh-button");
const filterButtons = document.querySelectorAll(".filter-button");
const sortButtons = document.querySelectorAll(".sort-button");
const locationFilter = document.querySelector("#location-filter");
const dialog = document.querySelector("#bin-dialog");
const closeDialog = document.querySelector("#close-dialog");
const dialogCode = document.querySelector("#dialog-code");
const dialogTitle = document.querySelector("#dialog-title");
const dialogBody = document.querySelector("#dialog-body");
const toast = document.querySelector("#toast");

let activeFilter = "todos";
let activeLocation = "todos";
let activeSort = "nivel";
let updateHistory = [];

function getStatus(fill) {
  if (fill >= 80) {
    return "critico";
  }

  if (fill >= 55) {
    return "atencao";
  }

  return "ok";
}

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

function minutesSince(date) {
  const minutes = Math.max(1, Math.round((Date.now() - date.getTime()) / 60000));
  return `${minutes} min`;
}

function seedHistory() {
  bins.forEach((bin) => {
    bin.history = [
      {
        fill: Math.max(0, bin.fill - 8),
        status: getStatus(Math.max(0, bin.fill - 8)),
        at: new Date(bin.updatedAt.getTime() - 22 * 60000)
      },
      {
        fill: bin.fill,
        status: getStatus(bin.fill),
        at: bin.updatedAt
      }
    ];
  });

  updateHistory = bins
    .map((bin) => ({
      binId: bin.id,
      name: bin.name,
      fill: bin.fill,
      status: getStatus(bin.fill),
      at: bin.updatedAt
    }))
    .sort((a, b) => b.at - a.at)
    .slice(0, 8);
}

function populateLocations() {
  const areas = [...new Set(bins.map((bin) => bin.area))].sort();

  locationFilter.innerHTML = [
    '<option value="todos">Todas</option>',
    ...areas.map((area) => `<option value="${area}">${area}</option>`)
  ].join("");
}

function getVisibleBins() {
  return bins
    .filter((bin) => activeFilter === "todos" || getStatus(bin.fill) === activeFilter)
    .filter((bin) => activeLocation === "todos" || bin.area === activeLocation)
    .sort((a, b) => {
      if (activeSort === "proximidade") {
        return a.distance - b.distance;
      }

      return b.fill - a.fill;
    });
}

function renderPages(pageName) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });

  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === pageName);
  });
}

function openPageFromHash() {
  const pageName = window.location.hash.replace("#", "") || "inicio";
  const exists = [...pages].some((page) => page.dataset.page === pageName);

  renderPages(exists ? pageName : "inicio");
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0 });
  });
  window.setTimeout(() => {
    window.scrollTo({ top: 0 });
  }, 80);
}

function renderSummary() {
  const average = Math.round(
    bins.reduce((total, bin) => total + bin.fill, 0) / bins.length
  );
  const critical = bins.filter((bin) => getStatus(bin.fill) === "critico").length;

  totalBins.textContent = bins.length;
  criticalBins.textContent = critical;
  averageFill.textContent = `${average}%`;
  homeTotal.textContent = bins.length;
  homeAlerts.textContent = critical;
  homeAverage.textContent = `${average}%`;
}

function renderAlerts() {
  const criticalBins = bins.filter((bin) => getStatus(bin.fill) === "critico");

  if (criticalBins.length === 0) {
    alertStrip.className = "alert-strip calm";
    alertStrip.textContent = "Todas as lixeiras estao abaixo de 80%.";
    return;
  }

  alertStrip.className = "alert-strip danger";
  alertStrip.textContent = `\u26A0\uFE0F ${criticalBins.length} lixeira(s) acima de 80%: ${criticalBins
    .map((bin) => `${bin.id} ${bin.name}`)
    .join(", ")}.`;
}

function renderPins(visibleBins) {
  mapPins.innerHTML = visibleBins
    .map((bin) => {
      const status = getStatus(bin.fill);

      return `
        <button
          class="pin ${status}"
          type="button"
          style="left: ${bin.x}%; top: ${bin.y}%"
          title="${bin.id} - ${bin.name}: ${bin.fill}%"
          aria-label="${bin.id} - ${bin.name}: ${bin.fill}% ocupado"
          data-bin-id="${bin.id}"
        >
          <span>${bin.fill}%</span>
        </button>
      `;
    })
    .join("");

  mapPins.querySelectorAll(".pin").forEach((pin) => {
    pin.addEventListener("click", () => openDetails(pin.dataset.binId));
  });
}

function renderList(visibleBins) {
  visibleCount.textContent = `${visibleBins.length} visiveis`;
  binList.innerHTML = visibleBins
    .map((bin) => {
      const status = getStatus(bin.fill);

      return `
        <article class="bin-card ${status}">
          <header>
            <div>
              <span class="bin-code">${bin.id}</span>
              <h3>&#128465;&#65039; ${bin.name}</h3>
            </div>
            <span class="status ${status}">${statusLabels[status]}</span>
          </header>
          <div class="progress" aria-label="Ocupacao de ${bin.fill}%">
            <span class="${status}" style="width: ${bin.fill}%"></span>
          </div>
          <p class="meta">
            <span>${bin.location}</span>
            <span>${bin.fill}% - ha ${minutesSince(bin.updatedAt)}</span>
          </p>
          <p class="meta">
            <span>${bin.distance} m de distancia</span>
            <span>${formatDate(bin.updatedAt)}</span>
          </p>
          <button class="details-button" type="button" data-bin-id="${bin.id}">Ver detalhes</button>
        </article>
      `;
    })
    .join("");

  binList.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", () => openDetails(button.dataset.binId));
  });
}

function renderHistory() {
  const items = updateHistory.slice(0, 10);

  historyCount.textContent = `${items.length} registros`;
  historyList.innerHTML = items
    .map(
      (item) => `
        <li class="${item.status}">
          <span>${item.binId} - ${item.name}</span>
          <strong>${item.fill}%</strong>
          <time>${formatDate(item.at)}</time>
        </li>
      `
    )
    .join("");
}

function openDetails(binId) {
  const bin = bins.find((item) => item.id === binId);

  if (!bin) {
    return;
  }

  const status = getStatus(bin.fill);
  dialogCode.textContent = `${bin.id} - ${statusLabels[status]}`;
  dialogTitle.textContent = bin.name;
  dialogBody.innerHTML = `
    <div class="dialog-grid">
      <article>
        <span>Nivel atual</span>
        <strong>${bin.fill}%</strong>
      </article>
      <article>
        <span>Localizacao</span>
        <strong>${bin.location}</strong>
      </article>
      <article>
        <span>Proximidade</span>
        <strong>${bin.distance} m</strong>
      </article>
      <article>
        <span>Ultima leitura</span>
        <strong>${formatDate(bin.updatedAt)}</strong>
      </article>
    </div>
    <h3>Historico da lixeira</h3>
    <ol class="history-list compact">
      ${bin.history
        .slice()
        .reverse()
        .map(
          (item) => `
            <li class="${item.status}">
              <span>${statusLabels[item.status]}</span>
              <strong>${item.fill}%</strong>
              <time>${formatDate(item.at)}</time>
            </li>
          `
        )
        .join("")}
    </ol>
  `;

  if (dialog.open) {
    dialog.close();
  }

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("active");

  window.setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);
}

function simulateData() {
  const now = new Date();

  bins.forEach((bin) => {
    const variation = Math.round(Math.random() * 22) - 6;
    bin.fill = Math.max(8, Math.min(100, bin.fill + variation));
    bin.updatedAt = now;

    const status = getStatus(bin.fill);
    const entry = {
      binId: bin.id,
      name: bin.name,
      fill: bin.fill,
      status,
      at: now
    };

    bin.history.push({
      fill: bin.fill,
      status,
      at: now
    });
    bin.history = bin.history.slice(-6);
    updateHistory.unshift(entry);
  });

  updateHistory = updateHistory.slice(0, 20);
  render();

  const critical = bins.filter((bin) => getStatus(bin.fill) === "critico");
  if (critical.length > 0) {
    showToast(`\u26A0\uFE0F ${critical.length} lixeira(s) acima de 80%.`);
  } else {
    showToast("Dados atualizados. Nenhum alerta critico.");
  }
}

function render() {
  const visibleBins = getVisibleBins();

  renderSummary();
  renderAlerts();
  renderPins(visibleBins);
  renderList(visibleBins);
  renderHistory();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    render();
  });
});

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeSort = button.dataset.sort;

    sortButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    render();
  });
});

locationFilter.addEventListener("change", (event) => {
  activeLocation = event.target.value;
  render();
});

refreshButton.addEventListener("click", simulateData);

closeDialog.addEventListener("click", () => {
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
});

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageName = link.dataset.pageLink;

    event.preventDefault();
    renderPages(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.location.hash !== `#${pageName}`) {
      window.history.pushState(null, "", `#${pageName}`);
    }
  });
});

window.addEventListener("hashchange", openPageFromHash);

seedHistory();
populateLocations();
openPageFromHash();
render();
