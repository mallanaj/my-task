export function generateRandomId(data) {
	const res = data.map((row) => {
		return { ...row, id: `id${Math.random().toString(16).slice(2)}` };
	});
	return res;
}
