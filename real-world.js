const fetch = require('node-fetch');

const URL = 'https://api.github.com/users/mihaerzen/repos';

function* createQuoteFetcher() {
    const response = yield fetch(URL);
    const repos = yield response.json();
    return repos.map(repo => `${repo.name}, forks: ${repo.forks}`).join('\n');
}

const quoteFetcher = createQuoteFetcher();

quoteFetcher.next().value
    .then(res => quoteFetcher.next(res).value)
    .then(res => quoteFetcher.next(res).value)
    .then(repos => console.log(repos))
    .catch(error => console.error(error));
