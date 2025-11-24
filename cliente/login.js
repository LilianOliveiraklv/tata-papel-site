document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(u => 
        u.email === email && u.senha === senha
    );

    if(usuarioEncontrado){
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        alert("Login realizado com sucesso 💗");
        window.location.href = "area-do-cliente.html";
    } else {
        alert("E-mail ou senha incorretos 💛");
    }
});
