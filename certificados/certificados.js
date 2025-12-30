// Array de certificados
const certificados = [
  {
    id: 1,
    titulo: "Linguagem de Programação Python - Básico",
    empresa: "Fundação Bradesco",
    data: "Novembro 2023",
    cargaHoraria: "18 horas",
    imagem: "python-basico.png"
  },
  {
    id: 2,
    titulo: "Crie um Site Simples Usando HTML, CSS e JavaScript",
    empresa: "Fundação Bradesco",
    data: "Agosto 2024",
    cargaHoraria: "2 horas",
    imagem: "site-simples.png"
  },
  {
    id: 3,
    titulo: "Fundamentos de TI: Hardware e Software",
    empresa: "Fundação Bradesco",
    data: "Agosto 2024",
    cargaHoraria: "15 horas",
    imagem: "fundamentos-ti.png"
  },
  {
    id: 4,
    titulo: "Microsoft Excel 2016 - Básico",
    empresa: "Fundação Bradesco",
    data: "Maio 2023",
    cargaHoraria: "15 horas",
    imagem: "excel-basico.png"
  },
  {
    id: 5,
    titulo: "Microsoft Excel 2016 - Intermediário",
    empresa: "Fundação Bradesco",
    data: "Maio 2023",
    cargaHoraria: "20 horas",
    imagem: "excel-intermediario.png"
  },
  {
    id: 6,
    titulo: "Microsoft Excel 2016 - Avançado",
    empresa: "Fundação Bradesco",
    data: "Maio 2023",
    cargaHoraria: "30 horas",
    imagem: "excel-avancado.png"
  },
  {
    id: 7,
    titulo: "Segurança em Tecnologia da Informação",
    empresa: "Fundação Bradesco",
    data: "Agosto 2024",
    cargaHoraria: "12 horas",
    imagem: "seguranca-ti.png"
  }
];

// Função para inicializar a página
function initCertificados() {
  const filterSelect = document.getElementById("empresaFilter");
  const certificatesGrid = document.getElementById("certificatesGrid");
  
  // Preencher opções do filtro
  const empresas = [...new Set(certificados.map(cert => cert.empresa))];
  empresas.forEach(empresa => {
    const option = document.createElement("option");
    option.value = empresa;
    option.textContent = empresa;
    filterSelect.appendChild(option);
  });
  
  // Renderizar certificados
  renderCertificados();
  
  // Adicionar evento ao filtro
  filterSelect.addEventListener("change", (e) => {
    filterCertificados(e.target.value);
  });
}

// Função para renderizar certificados
function renderCertificados(filterEmpresa = "all") {
  const certificatesGrid = document.getElementById("certificatesGrid");
  
  // Limpar grid
  certificatesGrid.innerHTML = "";
  
  // Filtrar certificados
  const filteredCertificados = filterEmpresa === "all" 
    ? certificados 
    : certificados.filter(cert => cert.empresa === filterEmpresa);
  
  if (filteredCertificados.length === 0) {
    certificatesGrid.innerHTML = `
      <div class="no-certificates">
        <i class="fas fa-certificate"></i>
        <p>Nenhum certificado encontrado</p>
      </div>
    `;
    return;
  }
  
  // Criar cards de certificados
  filteredCertificados.forEach(certificado => {
    const card = createCertificateCard(certificado);
    certificatesGrid.appendChild(card);
  });
}

// Função para criar card de certificado
function createCertificateCard(certificado) {
  const card = document.createElement("div");
  card.className = "certificate-card";
  card.dataset.empresa = certificado.empresa;
  
  card.innerHTML = `
    <div class="certificate-image-container">
      <img 
        src="${certificado.imagem}" 
        alt="${certificado.titulo}"
        class="certificate-image"
        loading="lazy"
      />
    </div>
    <div class="certificate-info">
      <h3 class="certificate-title">${certificado.titulo}</h3>
      <div class="certificate-company">
        <i class="fas fa-building"></i>
        <span>${certificado.empresa}</span>
      </div>
      ${certificado.data ? `
        <div class="certificate-date">
          <i class="fas fa-calendar"></i>
          <span>${certificado.data}</span>
        </div>
      ` : ''}
      ${certificado.cargaHoraria ? `
        <div class="certificate-hours">
          <i class="fas fa-clock"></i>
          <span>${certificado.cargaHoraria}</span>
        </div>
      ` : ''}
    </div>
  `;
  
  // Adicionar evento de clique para abrir modal (tanto no card quanto na imagem)
  const imageContainer = card.querySelector(".certificate-image-container");
  const image = card.querySelector(".certificate-image");
  
  // Clique em qualquer parte do card abre o modal
  card.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(certificado);
  });
  
  // Adicionar cursor pointer na imagem
  if (imageContainer) {
    imageContainer.style.cursor = "pointer";
  }
  if (image) {
    image.style.cursor = "pointer";
  }
  
  return card;
}

// Função para filtrar certificados
function filterCertificados(empresa) {
  const cards = document.querySelectorAll(".certificate-card");
  
  cards.forEach(card => {
    if (empresa === "all" || card.dataset.empresa === empresa) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
  
  // Se não houver certificados visíveis, mostrar mensagem
  const visibleCards = Array.from(cards).filter(card => !card.classList.contains("hidden"));
  const certificatesGrid = document.getElementById("certificatesGrid");
  
  if (visibleCards.length === 0 && certificados.length > 0) {
    const noResults = document.createElement("div");
    noResults.className = "no-certificates";
    noResults.innerHTML = `
      <i class="fas fa-search"></i>
      <p>Nenhum certificado encontrado para esta empresa</p>
    `;
    certificatesGrid.appendChild(noResults);
  }
}

// Função para abrir modal
function openModal(certificado) {
  const modal = document.getElementById("certificateModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  
  // Carregar imagem
  modalImage.src = certificado.imagem;
  modalImage.alt = certificado.titulo;
  
  // Adicionar loading state e tratamento de erro
  modalImage.style.opacity = "0";
  modalImage.onload = () => {
    modalImage.style.transition = "opacity 0.3s ease";
    modalImage.style.opacity = "1";
  };
  
  modalImage.onerror = () => {
    modalImage.style.opacity = "0.5";
    modalImage.alt = "Erro ao carregar imagem: " + certificado.titulo;
    console.error("Erro ao carregar imagem:", certificado.imagem);
  };
  
  // Atualizar caption
  modalCaption.innerHTML = `
    <strong style="font-size: 1.3rem; display: block; margin-bottom: 0.5rem;">${certificado.titulo}</strong>
    <span style="opacity: 0.8; font-size: 1rem;">
      <i class="fas fa-building"></i> ${certificado.empresa}
    </span>
    ${certificado.data ? `
      <br><span style="opacity: 0.6; font-size: 0.9rem;">
        <i class="fas fa-calendar"></i> ${certificado.data}
      </span>
    ` : ''}
    ${certificado.cargaHoraria ? `
      <br><span style="opacity: 0.6; font-size: 0.9rem;">
        <i class="fas fa-clock"></i> ${certificado.cargaHoraria}
      </span>
    ` : ''}
    <br><span style="opacity: 0.5; font-size: 0.85rem; margin-top: 0.5rem; display: block;">
      Clique na imagem para ampliar | ESC para fechar
    </span>
  `;
  
  // Mostrar modal
  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // Prevenir scroll do body
  
  // Função para resetar zoom
  const resetZoom = () => {
    modalImage.classList.remove("zoomed");
    modalImage.style.cursor = "zoom-in";
  };
  
  // Função para fechar modal
  const closeModalFunc = () => {
    resetZoom();
    modal.classList.remove("show");
    document.body.style.overflow = ""; // Restaurar scroll
  };
  
  // Fechar modal ao clicar no X
  const closeBtn = document.querySelector(".close-modal");
  closeBtn.onclick = closeModalFunc;
  
  // Fechar modal ao clicar fora da imagem
  modal.onclick = (e) => {
    if (e.target === modal || e.target.classList.contains("modal")) {
      closeModalFunc();
    }
  };
  
  // Fechar modal com ESC
  const escHandler = (e) => {
    if (e.key === "Escape") {
      closeModalFunc();
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);
  
  // Zoom na imagem ao clicar (opcional)
  modalImage.addEventListener("click", (e) => {
    e.stopPropagation();
    if (modalImage.classList.contains("zoomed")) {
      modalImage.classList.remove("zoomed");
      modalImage.style.cursor = "zoom-in";
    } else {
      modalImage.classList.add("zoomed");
      modalImage.style.cursor = "zoom-out";
    }
  });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCertificados);
} else {
  initCertificados();
}

// Função para adicionar certificado (para uso futuro)
function adicionarCertificado(titulo, empresa, data, imagem) {
  const novoCertificado = {
    id: certificados.length + 1,
    titulo: titulo,
    empresa: empresa,
    data: data,
    imagem: imagem
  };
  
  certificados.push(novoCertificado);
  
  // Atualizar filtro se necessário
  const filterSelect = document.getElementById("empresaFilter");
  const empresas = [...new Set(certificados.map(cert => cert.empresa))];
  const existingOptions = Array.from(filterSelect.options).map(opt => opt.value);
  
  if (!existingOptions.includes(empresa)) {
    const option = document.createElement("option");
    option.value = empresa;
    option.textContent = empresa;
    filterSelect.appendChild(option);
  }
  
  // Re-renderizar
  renderCertificados(filterSelect.value);
}

