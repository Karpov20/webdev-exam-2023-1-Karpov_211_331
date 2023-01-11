let table = document.querySelector('#routes__table');
let pagination = document.querySelector('#pagination');
let notesOnPage = 10;
let countOfItems = Math.ceil(routes.length / notesOnPage);

let showPage = (function() {
	let active;
	return function(item) {
		if (active) {
			active.classList.remove('active');
		}
		active = item;
		item.classList.add('active');
		let pageNum = +item.innerHTML;
		let start = (pageNum - 1) * notesOnPage;
		let end = start + notesOnPage;
		let notes = routes.slice(start, end);
		table.innerHTML = '';
		for (let note of notes) {
			let tr = document.createElement('tr');
			table.appendChild(tr);
			createCell(note.name, tr);
			createCell(note.created_at, tr);
			createCell('<button class="btn">Детали</button>', tr);
		}
	};
}());

let items = [];
for (let i = 1; i <= countOfItems; i++) {
	let li = document.createElement('li');
	li.innerHTML = i;
	pagination.appendChild(li);
	items.push(li);
}

showPage(items[0]);

for (let item of items) {
	item.addEventListener('click', function() {
		showPage(this);
	});
}

function createCell(text, tr) {
	let td = document.createElement('td');
	td.innerHTML = text;
	tr.appendChild(td);
}