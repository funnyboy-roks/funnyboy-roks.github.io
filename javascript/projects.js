class card {
	constructor(obj) {
		if (!obj) return;
		this.json = obj;
		this.name = obj.name;
	}

	generateHTML = async () => {
		let repoInfo;
		if (this.json.fork) {
			repoInfo = await getRepo(this.json.url);
		}
		let forked = this.json.fork
			? generateLinkTag({
					url: repoInfo.source.html_url,
					label: `(Forked from ${repoInfo.source.full_name})`,
					class: ['underline'],
			  })
			: '';
		// prettier-ignore
		return `<div class="card is-clickable" id="${this.json.name}" onclick="location.href = '${openProjectPage('/project', this.json.name)}'">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">${this.json.name.replace(/-/g, ' ')}</p>
                        <p class="subtitle is-6"><a href="${this.json.html_url}">View on GitHub</a> ${forked}</p>
                    </div>
                </div>
                <div class="content">
                    ${this.json.description ? this.json.description + '<br>' : ''}
                    ${this.json.language} | <time>${formatDate(new Date(this.json.created_at))}</time>
                </div>
            </div>
        </div>`;
		//TODO: ADD Language somewhere
	};
}

let projectCards = [];
const cardsElem = document.querySelector('.cards');
const loadingElem = document.querySelector('#loading');
const headers = {
	'User-Agent': 'funnyboy-roks.github.io',
	Authorization: '7a1c6d76233859853c25',
};

async function getRepo(url) {
	let data = await fetch(url);
	let json = await data.json();
	return json;
}

function openProjectPage(path, projectName) {
	return `http://${location.host}${path}#${projectName}`;
}

function formatDate(date) {
	// prettier-ignore
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}



async function loadGHRepos() {
	// let ghData = await fetch(
	// 	'https://api.github.com/users/funnyboy-roks/repos',
	// 	{ headers }
	// );
    // json = await ghData.json();
    json = projectsJSON // Just one of the repos temp. so that I don't hit rate limit issues
	console.log(json);

	let outHTML = '';
	for (let x of json) {
		let c = new card(x);
		cardsElem.innerHTML += await c.generateHTML();
		c.element = document.querySelector('#' + x.name);

		if (document.querySelector('#loading')) {
			document.querySelector('#loading').remove();
		}

		projectCards.push(c);
	}
	localStorage.setItem('GHData', json);
}

window.onload = loadGHRepos;
