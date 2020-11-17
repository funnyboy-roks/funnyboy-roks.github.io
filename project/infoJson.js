/**
 * Gets the info from a file called "info.json" in the root of a repo
 * @param {Object} data The Object that contains the info about the repo, specifically `full_name`
 * @returns {Object} The contents of the "info.json" file, null if it doesn't exist
 */
async function getInfoJson(data) {
	let fetchUrl = data.contents_url.replace(/{\+path}/g, '') + 'info.json';
	let infoJson = await fetchURL(fetchUrl, headers);
	if (!infoJson.content) {
		return null;
	}
	return JSON.parse(atob(infoJson.content));
}
