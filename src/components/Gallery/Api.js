
let headers = {
	'Access-Control-Allow-Origin':'*',
	'Content-Type': 'application/json',
	'accept':'application/json'
};



export const getPics = id => {
	fetch({
		headers: headers,
		url: `https://picsum.photos/v2/list`,
		method: "GET",
	});
};
