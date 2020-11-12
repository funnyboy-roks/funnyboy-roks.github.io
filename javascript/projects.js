let json;
async function loadGHRepos() {
	let ghData = await fetch(
		'https://api.github.com/users/funnyboy-roks/repos'
	);
	json = await ghData.json();
	console.log(json);

	let outHTML = '';
	for (let x of json) {
        let repoInfo;
		if (x.fork) {
			repoInfo = await getRepo(x.url);
		}
		let clickPath = '/project/' + x.name;
		let repoName = x.name.replace(/-/g, ' ');
		let ghLink = x.html_url;
		let repoDesc = x.description ? x.description + '<br>' : '';
		let creationDate = new Date(x.created_at);
		let forked = x.fork
			? generateLink({
					url: repoInfo.source.html_url,
                    label: `(Forked from ${repoInfo.source.full_name})`,
                    class: ['underline'],
			  })
			: '';
		outHTML += `
        <div class="card" onclick="location.pathname = '${clickPath}'">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">${repoName}</p>
                        <p class="subtitle is-6"><a href="${ghLink}">View on GitHub</a> ${forked}</p>
                    </div>
                </div>

                <div class="content">
                    ${repoDesc}
                    <time datetime="2016-1-1">${formatDate(creationDate)}</time>
                </div>
            </div>
        </div>`;

		document.querySelector('.cards').innerHTML = outHTML;
	}
}

async function getRepo(url) {
	let data = await fetch(url);
	let json = await data.json();
	return json;
}

function formatDate(date) {
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function generateLink(data) {
	let info = {
		url: data.url || '',
		classes: data.classes || [],
		id: data.id || '',
		label: data.label || 'MISSING LABEL',
	};
	return `<a href="${info.url}" class="${info.classes
		.join(' ')
		.trim()}" id="${info.id}">${info.label}</a>`;
}

window.onload = loadGHRepos;
