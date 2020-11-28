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
	descMeta: document.querySelector('#desc-meta'),
	counts: {
		forks: document.querySelector('#counts').querySelector('#fork-count'),
		watchers: document
			.querySelector('#counts')
			.querySelector('#watcher-count'),
		stars: document.querySelector('#counts').querySelector('#star-count'),
	},
	description: document.querySelector('#description'),
	dates: {
		created: document.querySelector('#dates').querySelector('#created-at'),
		updated: document.querySelector('#dates').querySelector('#updated-at'),
		pushed: document.querySelector('#dates').querySelector('#pushed-at'),
	},
	fromInfoJson: {
		linksDiv: document.querySelector('#repo-links'),
		langs: document.querySelector('#langs'),
		longDesc: {
			elem: document.querySelector('#repo-info #long-desc'),
			val: document.querySelector('#repo-info #long-desc #value'),
		},
		prod: {
			elem: document.querySelector('#repo-info #prod'),
			val: document.querySelector('#repo-info #prod #value'),
		},
	},
};

let json;
let infoJson;
// let repoInfoJson; // Eventually read a file called `websiteInfo.json` in root dir if it exists
/* Contains information like:
- "production-url": "URL",
- "pinned": true/false,
- etc.


*/
async function getRepoInfo() {
	if (location.hash.length <= 1) {
		location.href = `http://${location.host}/projects/`;
	}

	json = await fetchURL(
		'https://api.github.com/repos/funnyboy-roks/' + project
	);
	// json = projectJSON; // TEMP json so that I don't hit rate limiting

	infoJson = await getInfoJson(json);

	elems.title.innerText = json.name + ' | funnyboy_roks';
	elems.h1title.innerText = `${properCase(json.name.replace(/[-_]/g, ' '))}`;
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
	elems.dates.created.innerText = formatDate(
		new Date(json.created_at),
		(year = false)
	);
	elems.dates.updated.innerText = formatDate(
		new Date(json.updated_at),
		(year = false)
	);
	elems.dates.pushed.innerText = formatDate(
		new Date(json.pushed_at),
		(year = false)
	);

	if (infoJson) {
		if (infoJson.long_description) {
			elems.fromInfoJson.longDesc.elem.style.display = '';
			elems.fromInfoJson.longDesc.val.innerHTML =
				infoJson.long_description;
		}

		if (infoJson.featured_langs) {
			elems.fromInfoJson.langs.style.display = '';
			elems.fromInfoJson.langs.innerText = infoJson.featured_langs.join(
				', '
			);
		}

		if(infoJson.name){
			elems.h1title.innerHTML = infoJson.name;
		}
		
		if(infoJson.links){
			for(let link of infoJson.links){
				document.querySelector('#hero-foot').style.display = '';
				elems.fromInfoJson.linksDiv.innerHTML += `
					<li>
						${generateLinkTag({url: link.url, label: link.label})}
					</li>
				`
			}
		}
	}
	if (elems.fromInfoJson.langs.style.display != '' && json.language) {
		elems.fromInfoJson.langs.style.display = '';
		elems.fromInfoJson.langs.innerHTML = json.language;
	}

	elems.description.innerText = json.description || 'No Description';
}

window.onload = getRepoInfo;

console.log(project);
