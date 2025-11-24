// ===== CADASTRO DE USUÁRIO =====

document.getElementById("cadastroForm").addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("nomeCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    // Verificar se já existe esse e-mail cadastrado
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.email === email);

    if(existe){
        alert("Este e-mail já está cadastrado! Tente fazer login 💛");
        return;
    }

    // Criar novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    usuarios.push(novoUsuario);

    // Salvar lista atualizada
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Conta criada com sucesso! 💗 Agora faça login.");
    window.location.href = "login.html";
});
