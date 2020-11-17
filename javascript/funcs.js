function properCase(s) {
	let out = [];
	s.split(' ').forEach((x) => {
		out.push(x[0].toUpperCase() + x.substring(1));
	});
	return out.join(' ');
}

function formatNumber(n, thousandK = false) {
	if (!thousandK && n > 1000) {
		return n.toLocaleString();
	}
	if (n > 1000) {
		return (n / 1000).toLocaleString() + 'k';
	}
	return n;
}

function generateLinkTag(data) {
	let info = {
		url: data.url || '',
		classes: data.classes || [],
		id: data.id || '',
		label: data.label || 'MISSING LABEL',
	};
	// prettier-ignore
	return `<a href="${info.url}" class="${info.classes.join(' ').trim()}" id="${info.id}">${info.label}</a>`;
}

function formatDate(date, year = true) {
	// prettier-ignore
	let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	out = `${date.getDate()} ${months[date.getMonth()].substring(0, 3)}`;
	if (year) {
		out += ' ' + date.getFullYear();
	}
	return out;
}
async function fetchURL(url, h=headers) {
	let data = await fetch(url, { headers: h });
	if(!data.ok){ return {}; }
	let json = await data.json();
	return json;
	
}
