const app = document.querySelector("#app");
const post_url = "https://jsonplaceholder.typicode.com/posts/";
const user_url = "https://jsonplaceholder.typicode.com/users/";

async function getUsers(url, id) {
  let response = await fetch(url + id);
  let users = await response.json();
  return users;
}

async function getArticles(url) {
  let response = await fetch(url);
  let data = await response.json();

  data.forEach(async (article) => {
    article.user = await getUsers(user_url, article.id);
    app.innerHTML += `
    <article>
            <h3 class="title">${article.title.toUpperCase()}</h3>
            <h4 class="author">author: ${article.user.username.toUpperCase()}</h4>
            <p class="articleBody">${article.body}</p>
    </article>
        `;
  });
}

getArticles(post_url);
