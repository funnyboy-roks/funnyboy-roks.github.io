const nameElem = document.querySelector('#name');

window.onload = () => {
	const url = new URLSearchParams(window.location.search);
	const name = url.get('name');
    nameElem.innerText = name ?? 'funnyboy_roks'
};
