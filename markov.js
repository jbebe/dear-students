const Prefix = function (length) {
	this.words = new Array(length).join(',').split(',');
};
Prefix.prototype.toString = function () {
	return this.words.filter(function (el) {
		return el !== '';
	}).join(' ');
};
Prefix.prototype.shift = function (word) {
	this.words.shift();
	this.words.push(word);
};
const Chain = function (order) {
	const chain = new Map();
	const length = order || 2;
	return {
		Build: function (contents) {
			const p = new Prefix(length);
			let key, tempArray;
			contents.split(' ').forEach(function (s) {
				key = p.toString();
				if (chain.get(key) === undefined) {
					chain.set(key, new Array(s));
				}
				else {
					tempArray = chain.get(key);
					tempArray.push(s);
					chain.set(key, tempArray);
				}
				p.shift(s);
			});
			return this;
		},
		Generate: function (numberOfWords) {
			const p = new Prefix(length);
			const words = [];
			let suffixes, next;
			for (let i = 0; i < numberOfWords; i++) {
				suffixes = chain.get(p.toString());
				if (suffixes === undefined || suffixes.length === 0) {
					break;
				}
				next = suffixes[Math.floor(Math.random()*suffixes.length)];
				words.push(next);
				p.shift(next);
			}
			return words.join(' ');
		},
		debug: function () {
			let string = '';
			for (let el of chain.entries()) {
				string += `["${el[0]}": [${el[1]}]]\n`;
			}
			return string;
		}
	};
};