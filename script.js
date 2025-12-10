const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const composer = document.getElementById("composer");
const textarea = document.getElementById("postText");
const feed = document.getElementById("feed");
const clearBtn = document.getElementById("clearBtn");

const LS_THEME = "site_theme";
const LS_POSTS = "site_posts";

// ======= Tema Claro / Escuro =========
function initTheme() {
    const saved = localStorage.getItem(LS_THEME);
    if (saved) body.classList.toggle("dark", saved === "dark");

    updateThemeButton();
}

function updateThemeButton() {
    themeToggle.textContent = body.classList.contains("dark")
        ? "Modo claro"
        : "Modo escuro";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem(
        LS_THEME,
        body.classList.contains("dark") ? "dark" : "light"
    );
    updateThemeButton();
});

// ======= POSTAGENS =========
function loadPosts() {
    return JSON.parse(localStorage.getItem(LS_POSTS) || "[]");
}

function savePosts(posts) {
    localStorage.setItem(LS_POSTS, JSON.stringify(posts));
}

function createPostElement(post) {
    const el = document.createElement("div");
    el.className = "post";

    el.innerHTML = `
        <p>${post.text}</p>
        <button class="like-btn">❤️ Curtir (${post.likes})</button>
    `;

    const likeBtn = el.querySelector(".like-btn");

    likeBtn.addEventListener("click", () => {
        post.likes++;
        likeBtn.textContent = ❤️ Curtir (${post.likes});

        const posts = loadPosts();
        const index = posts.findIndex(p => p.id === post.id);
        posts[index].likes = post.likes;
        savePosts(posts);
    });

    return el;
}

function renderPosts() {
    feed.innerHTML = "";
    const posts = loadPosts().reverse();

    posts.forEach(p => feed.appendChild(createPostElement(p)));
}

// ======= CRIAR NOVO POST =========
composer.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = textarea.value.trim();
    if (!text) return;

    const posts = loadPosts();
    const post = {
        id: Date.now(),
        text,
        likes: 0,
    };

    posts.push(post);
    savePosts(posts);

    textarea.value = "";
    renderPosts();
});

clearBtn.addEventListener("click", () => textarea.value = "");

// ======= INICIAR =========
initTheme();
renderPosts();