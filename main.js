const apiUrl = "https://api.github.com/users/";
const heading = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// console.log(apiUrl);

// findUser("Tire11");

async function findUser(username) {
    const res = await fetch(apiUrl + username);
    const resData = await res.json();
    // console.log(resData);
    generateUserCard(resData);
    collectRepos(username);
}

async function collectRepos(username) {
    const res = await fetch(apiUrl + username + "/repos");
    const resData = await res.json();
    console.log(resData)
    joinReposToCard(resData);
}

// function joinReposToCard(repos) {
//     const myRepos = document.getElementById("repos");
//     repos.forEach((repo) => {
//         const myRepo = document.createElement("a");
//         myRepo.classList.add("repo");
//         myRepo.href = repo.html_url;
//         myRepo.target = "_blank";
//         myRepo.style = "text-decoration: none; margin: 5px 0; display: flex;"
//         myRepo.innerText = repo.name;
//         myRepos.appendChild(myRepo);
//     });
// }

function joinReposToCard(myRepos){
    let product = "";

    myRepos.forEach(function(myRepo) {
        product += `
        <div class="card my-2">
            <div class="row">
                <div class="col-md-6">
                    <a href="${myRepo.html_url}" target="_blank" class="text-decoration-none">${myRepo.name}</a>
                </div>
                <div class="col-md-6">
                    <span class="btn btn-primary">Stars: ${myRepo.stargazers_count}</span>
                    <span class="btn btn-secondary">Watchers: ${myRepo.watchers_count}</span>
                    <span class="btn btn-success">Forks: ${myRepo.forks_count}</span>
                </div>
            </div>
        </div>
        `;
        const remove = myRepos.splice(5);
    });

    document.getElementById("repos").innerHTML = product;
}

function generateUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div class="row">
            <div class="col-md-3">
                <img class="image img-fluid rounded" src="${user.avatar_url}" alt="">
                <a href="${user.html_url}" target="_blank" class="btn btn-primary rounded-pill my-3 ms-5 w-50">View Profile</a>          
            </div>
            <div class="user-info col-md-9">
                <span class="btn btn-primary my-2">Public Repos: ${user.public_repos}</span>
                <span class="btn btn-secondary my-2">Public Gists: ${user.public_gists}</span>
                <span class="btn btn-success my-2">Followers: ${user.followers}</span>
                <span class="btn btn-info my-2">Following: ${user.following}</span>
                <hr>
                    <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${new Date(user.created_at)}</li>
                    </ul>
            </div>
            </div>
        </div>
        <h3 class="text-center my-3">LATEST REPOS</h3>
        <div id="repos"></div>
    `;

    main.innerHTML = cardHTML;
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    const user = search.value;
    if (user) {
        findUser(user);
        search.value = "";
    } else {
        alert("User not found!");
    }
})