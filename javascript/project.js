const project = location.hash.substr(1);
const headers = {
	'User-Agent': 'funnyboy-roks.github.io',
	Authorization: '7a1c6d76233859853c25',
};

const elems = {
	title: document.querySelector('title'),
	h1title: document.querySelector('h1.title'),
	subtitle: document.querySelector('#subtitle'),
	fork: document.querySelector('#fork'),
	counts: {
		forks: document.querySelector('#counts').querySelector('#fork-count'),
		watchers: document
			.querySelector('#counts')
			.querySelector('#watcher-count'),
		stars: document.querySelector('#counts').querySelector('#star-count'),
	},
	description: document.querySelector('#description'),
};

let json;

async function fetchURL(url) {
	let data = await fetch(url, { headers });
	let json = await data.json();
	return json;
}

async function getRepoInfo() {
	if (location.hash.length <= 1) {
		location.href = `http://${location.host}/projects/`;
	}

	// json = await fetchURL(
	// 	'https://api.github.com/repos/funnyboy-roks/' + project
	// );
	json = projectJSON; // TEMP json so that I don't hit rate limiting

	elems.title.innerText = json.name + ' | funnyboy_roks';
	elems.h1title.innerText = `${properCase(json.name.replace(/-/g, ' '))}`;
	elems.subtitle.innerHTML =
		generateLinkTag({
			url: json.html_url,
			label: json.full_name,
			classes: ['has-text-link'],
		}) + `</h2>`;
	if (json.fork) {
		elems.subtitle.innerHTML += `<h2 id="fork" class="subtitle is-6">(Fork of ${generateLinkTag(
			{
				url: json.parent.html_url,
				label: json.parent.full_name,
				classes: ['has-text-link'],
			}
		)})`;
	}
	elems.counts.forks.innerText = formatNumber(json.forks_count);
	elems.counts.watchers.innerText = formatNumber(json.watchers_count);
	elems.counts.stars.innerText = formatNumber(json.stargazers_count);
	elems.description.innerText = json.description;
}

window.onload = getRepoInfo;

console.log(project);
