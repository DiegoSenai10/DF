document.addEventListener("DOMContentLoaded", () => {
    // Carregar dados do usuário do Local Storage ao carregar a página
    loadUserData();

    // Configurar botão de voltar para redirecionar à última página visitada
    configureBackButton();

    // Configurar redirecionamento ao perfil
    configureProfileRedirect();
});

// Carrega os dados do usuário do Local Storage
function loadUserData() {
    const userName = localStorage.getItem("userName") || "Usuário";
    const email = localStorage.getItem("email") || "exemplo@email.com";
    const profilePic = localStorage.getItem("profilePic") || "👤";

    // Atualizar os campos de perfil
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const profilePicField = document.getElementById("profile-pic");
    const userNameDisplay = document.getElementById("user-name");

    if (usernameField) usernameField.value = userName;
    if (emailField) emailField.value = email;
    if (profilePicField) profilePicField.textContent = profilePic;
    if (userNameDisplay) userNameDisplay.textContent = userName;
}

// Configura o botão de voltar para redirecionar à última página visitada
function configureBackButton() {
    const backButton = document.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", () => {
            const lastPage = localStorage.getItem("lastPage") || "tela_inicial.html";
            window.location.href = lastPage;
        });
    }
}

// Configura o botão de perfil para redirecionar à página de perfil
function configureProfileRedirect() {
    const profileButton = document.querySelector(".user-info img, .user-info span");
    if (profileButton) {
        profileButton.addEventListener("click", () => {
            window.location.href = "../Perfil/teste.html";
        });
    }
}

// Atualiza o campo editável e salva no Local Storage
function editField(fieldId) {
    const field = document.getElementById(fieldId);
    const currentValue = field.value;

    const newValue = prompt(`Alterar ${fieldId}:`, currentValue);
    if (newValue) {
        field.value = newValue;
        localStorage.setItem(fieldId, newValue);

        // Atualiza o nome exibido no perfil, se necessário
        if (fieldId === "username") {
            const userNameDisplay = document.getElementById("user-name");
            if (userNameDisplay) userNameDisplay.textContent = newValue;
        }
    }
}

// Salvar a página atual no Local Storage (chamado em todas as páginas)
function saveCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();
    localStorage.setItem("lastPage", currentPage);
}

// Salva o perfil do usuário no Local Storage
function saveUserProfile() {
    const userName = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    // Caso queira permitir a troca de imagem de perfil no futuro
    const profilePic = document.getElementById("profile-pic").textContent;

    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePic", profilePic);
}

// Exemplo de como chamar o salvamento quando sair do perfil
document.addEventListener("beforeunload", () => {
    if (document.body.classList.contains("perfil-page")) {
        saveUserProfile();
    }
});