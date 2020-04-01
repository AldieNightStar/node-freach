function foreach(el, cb) {
	if (Array.isArray(el)) {
		forEachArr(el, cb);
		return;
	};
	if (typeof el === "object") {
		if (el.__range) {
			forEachRange(el.__range[0], el.__range[1], cb)
			return;
		} else if (el.next && el.isNext && Object.keys(el).length == 2) {
			foreachIter(el, cb);
		} else {
			const keys = Object.keys(el).map(k => ({
				key: k,
				val: () => el[k]
			}) );
			forEachArr(keys, cb);
		}
		return;
	}
	if (typeof el === "string") {
		forEachStr(el, cb);
		return;
	}
	if (typeof el === "number") {
		forEachRange(0, el, cb);
		return;
	}
}

function forEachArr(el, cb) {
	let breakIt = false;
	let breakFunc = () => breakIt = true;

	for (let i = 0; i < el.length; i++) {
		if (breakIt) break;
		cb(el[i], breakFunc);
	}
}

function forEachStr(str, cb) {
	let breakIt = false;
	let breakFunc = () => breakIt = true;

	for (let i = 0; i < str.length; i++) {
		if (breakIt) break;
		cb(str[i], breakFunc);
	}
}

function forEachRange(min, max, cb) {
	let breakIt = false;
	let breakFunc = () => breakIt = true;

	for (let i = min; i <= max; i++) {
		if (breakIt) break;
		cb(i, breakFunc);
	}
}

function range(min, max) {
	return {__range: [min, max]};
}

function filterEach(el, filter, cb) {
	foreach(el, (elem, breakFunc) => {
		if (filter(elem)) {
			cb(elem, breakFunc);
		}
	})
}

function foreachIter(el, cb) {
	let breakIt = false;
	let breakFunc = () => breakIt = true;

	while (el.isNext()) {
		if (breakIt) break;
		cb(el.next());
	}
}

module.exports = {range, foreach, filterEach}

