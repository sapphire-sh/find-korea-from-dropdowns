let options = [];

document.addEventListener('contextmenu', (e) => {
	const select = e.target;
	if(select === undefined) {
		return;
	}
	if(select instanceof HTMLSelectElement === false) {
		return;
	}

	if(select.getAttribute('prevColor') === null) {
		select.setAttribute('prevColor', select.style.backgroundColor);
	}

	select.addEventListener('change', () => {
		select.style.backgroundColor = select.getAttribute('prevColor');
	});

	if(options.length === 0) {
		options = Array.from(select.options).map((e, i) => {
			let match = e.textContent.match(/korea|한국|대한민국|韓國|大韓民國|韓国|大韓民国|韩国|大韩民国/i);
			if(match === null) {
				match = e.textContent.match(/^(kr|kor)$/i);
			}
			if(match !== null && e.textContent.match(/north|democratic/i) !== null) {
				match = null;
			}

			return {
				'index': i,
				'match': match,
			};
		}).filter((e) => {
			return e.match !== null;
		});
	}

	if(options.length === 0) {
		select.style.backgroundColor = '#ffc9c9';
	}
	else {
		const option = options.shift();
		select.selectedIndex = option.index;
		select.style.backgroundColor = '#b2f2bb';
	}
});
