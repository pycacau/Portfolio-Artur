const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLink = document.querySelectorAll(".nav-link");

menu.addEventListener("click", () => {
  nav.classList.add("show");
});

closeButton.addEventListener("click", () => {
  nav.classList.remove("show");
});

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

// Formulário de Contato
const whatsappBtn = document.getElementById("whatsappBtn");
const emailBtn = document.getElementById("emailBtn");
const contactForm = document.getElementById("contactForm");

function getFormData() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const subject = document.getElementById("contactSubject").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  
  return { name, email, phone, subject, message };
}

function validateForm() {
  const { name, email, phone, subject, message } = getFormData();
  
  if (!name || !email || !phone || !subject || !message) {
    alert("Por favor, preencha todos os campos!");
    return false;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Por favor, insira um email válido!");
    return false;
  }
  
  return true;
}

whatsappBtn.addEventListener("click", () => {
  if (!validateForm()) return;
  
  const { name, email, phone, subject, message } = getFormData();
  
  const whatsappMessage = `Olá! Meu nome é *${name}*\n\n` +
    `📧 Email: ${email}\n` +
    `📱 Telefone: ${phone}\n` +
    `📌 Assunto: ${subject}\n\n` +
    `💬 Mensagem:\n${message}`;
  
  const whatsappUrl = `https://wa.me/5588996828755?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, "_blank");
});

emailBtn.addEventListener("click", () => {
  if (!validateForm()) return;
  
  const { name, email, phone, subject, message } = getFormData();
  
  const emailSubject = `Contato do Portfólio: ${subject}`;
  const emailBody = `Olá Artur,\n\n` +
    `Meu nome é ${name}\n` +
    `Email: ${email}\n` +
    `Telefone: ${phone}\n\n` +
    `Mensagem:\n${message}\n\n` +
    `Atenciosamente,\n${name}`;
  
  const emailUrl = `mailto:turcacau@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.location.href = emailUrl;
});

// Redes Sociais - Adicionar funcionalidade aos ícones
const socialMediaLinks = {
  "linkedin-square": "https://www.linkedin.com/in/arturcacau",
  "github": "https://github.com/pycacau",
  "instagram": "https://www.instagram.com/arturmaciell_", // Ajuste conforme necessário
  "whatsapp": "https://wa.me/5588996828755" // Usando o mesmo número do formulário
};

const socialMediaElements = document.querySelectorAll(".social-media");

socialMediaElements.forEach((element) => {
  element.addEventListener("click", () => {
    // Encontrar o box-icon dentro do elemento
    const boxIcon = element.querySelector("box-icon");
    if (boxIcon) {
      const iconName = boxIcon.getAttribute("name");
      const link = socialMediaLinks[iconName];
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
      }
    }
  });
});
