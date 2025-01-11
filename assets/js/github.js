//Fetch github information

function usertInfo(user) {
    return `
    <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>
        `;
}

function repoInfo(repos) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGithubInfo(user) {
    const userName = $("#gh-username").val();

    if (!userName) {
        $('#gh-user-data').html(`<h2>Please enter username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`
    );

    $.when(
        $.getJSON(`https://api.github.com/users/${userName}`),
        $.getJSON(`https://api.github.com/users/${userName}repos/`)
    ).then(
        function(response1, response2) {
            const userData = response1;
            const repoData = response2;
            $("#gh-user-data").html(userInfo(userData));
            $("#gh-repo-data").html(repoInfo(repoData));
        }, 
        function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else if (errorResponse.status == 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wain until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

document.readyState(fetchGithubInfo);
