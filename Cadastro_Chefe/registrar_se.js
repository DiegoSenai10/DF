// Função para exibir a prévia da foto
function previewFoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Armazenar a imagem no Local Storage como base64
            localStorage.setItem('foto', e.target.result);
            // Exibir a imagem como prévia
            const fotoPreview = document.getElementById('fotoPreview');
            fotoPreview.src = e.target.result;
            fotoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Função para carregar a foto ao abrir a página
window.onload = function() {
    const foto = localStorage.getItem('foto');
    if (foto) {
        const fotoPreview = document.getElementById('fotoPreview');
        fotoPreview.src = foto;
        fotoPreview.style.display = 'block';
    }
};

// Função para o envio do formulário (exemplo)
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Aqui você pode enviar os dados do formulário para um servidor ou armazenar localmente
    // Por enquanto, apenas logaremos os dados
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);

    // Aqui você poderia limpar o formulário após o envio
    document.getElementById('registerForm').reset();
    alert('Cadastro realizado com sucesso!');
});