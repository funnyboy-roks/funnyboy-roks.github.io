function properCase(s){
    let out = []
    s.split(' ').forEach(x => {
        out.push(x[0].toUpperCase() + x.substring(1))
    });
    return out.join(" ");
}

function formatNumber(n, thousandK=false){
	if(!thousandK && n > 1000){
		return n.toLocaleString();
	}
	if(n > 1000){
		return (n / 1000).toLocaleString() + 'k'
	}
	return n
}

function generateLinkTag(data) {
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