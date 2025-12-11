// 🌙 Modo escuro
const themeBtn = document.getElementById("toggle-theme");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent = 
        document.body.classList.contains("dark")
        ? "☀️ Modo Claro"
        : "🌙 Modo Escuro";
});


// 📝 Criar posts
const btnPostar = document.getElementById("btn-postar");
const textoPost = document.getElementById("post-text");
const postsContainer = document.getElementById("posts-container");

btnPostar.addEventListener("click", () => {
    let texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite algo para postar!");
        return;
    }

    const post = document.createElement("div");
    post.classList.add("post");

    post.innerHTML = `
        <p>${texto}</p>
        <button class="like-btn">Curtir ❤️ <span>0</span></button>
    `;

    postsContainer.appendChild(post);
    textoPost.value = "";

    // Botão curtir
    const likeBtn = post.querySelector(".like-btn");
    const counter = likeBtn.querySelector("span");

    likeBtn.addEventListener("click", () => {
        counter.textContent = Number(counter.textContent) + 1;
    });
});
