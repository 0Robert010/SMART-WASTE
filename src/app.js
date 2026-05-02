const bins = [
  {
    id: "B01",
    name: "Biblioteca",
    location: "Entrada principal",
    fill: 82,
    status: "critico",
    x: 43,
    y: 24,
    updatedAt: "10 min"
  },
  {
    id: "B02",
    name: "Bloco central",
    location: "Corredor de acesso",
    fill: 64,
    status: "atencao",
    x: 54,
    y: 47,
    updatedAt: "18 min"
  },
  {
    id: "B03",
    name: "Quadra",
    location: "Area esportiva",
    fill: 38,
    status: "ok",
    x: 17,
    y: 73,
    updatedAt: "25 min"
  },
  {
    id: "B04",
    name: "Predio Facens",
    location: "Acesso lateral",
    fill: 76,
    status: "critico",
    x: 84,
    y: 40,
    updatedAt: "7 min"
  },
  {
    id: "B05",
    name: "Laboratorios",
    location: "Area externa",
    fill: 51,
    status: "atencao",
    x: 35,
    y: 52,
    updatedAt: "31 min"
  }
];

const statusLabels = {
  ok: "OK",
  atencao: "Atencao",
  critico: "Critico"
};

const mapPins = document.querySelector("#map-pins");
const binList = document.querySelector("#bin-list");
const totalBins = document.querySelector("#total-bins");
const criticalBins = document.querySelector("#critical-bins");
const averageFill = document.querySelector("#average-fill");
const visibleCount = document.querySelector("#visible-count");
const filterButtons = document.querySelectorAll(".filter-button");

let activeFilter = "todos";

function getVisibleBins() {
  if (activeFilter === "todos") {
    return bins;
  }

  return bins.filter((bin) => bin.status === activeFilter);
}

function renderSummary() {
  const average = Math.round(
    bins.reduce((total, bin) => total + bin.fill, 0) / bins.length
  );

  totalBins.textContent = bins.length;
  criticalBins.textContent = bins.filter((bin) => bin.status === "critico").length;
  averageFill.textContent = `${average}%`;
}

function renderPins(visibleBins) {
  mapPins.innerHTML = visibleBins
    .map(
      (bin) => `
        <button
          class="pin ${bin.status}"
          type="button"
          style="left: ${bin.x}%; top: ${bin.y}%"
          title="${bin.id} - ${bin.name}: ${bin.fill}%"
          aria-label="${bin.id} - ${bin.name}: ${bin.fill}% ocupado"
        ></button>
      `
    )
    .join("");
}

function renderList(visibleBins) {
  visibleCount.textContent = `${visibleBins.length} visiveis`;
  binList.innerHTML = visibleBins
    .map(
      (bin) => `
        <article class="bin-card">
          <header>
            <h3>${bin.id} - ${bin.name}</h3>
            <span class="status ${bin.status}">${statusLabels[bin.status]}</span>
          </header>
          <div class="progress" aria-label="Ocupacao de ${bin.fill}%">
            <span class="${bin.status}" style="width: ${bin.fill}%"></span>
          </div>
          <p class="meta">
            <span>${bin.location}</span>
            <span>${bin.fill}% - atualizado ha ${bin.updatedAt}</span>
          </p>
        </article>
      `
    )
    .join("");
}

function render() {
  const visibleBins = getVisibleBins();

  renderSummary();
  renderPins(visibleBins);
  renderList(visibleBins);
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

render();
