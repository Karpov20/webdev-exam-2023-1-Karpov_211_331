function pagination(inputData, cTable, cPagination) {
	let table = cTable;
	let pagination = cPagination;
	let notesOnPage = 10;
	let countOfItems = Math.ceil(inputData.length / notesOnPage);
	let showPage = (function() {
		let active;
		return function(item) {
			if (active) {
				// active.classList.remove('active');
			}
			active = item;
			// item.classList.add('active');	
			let pageNum = +item.innerHTML;
			let start = (pageNum - 1) * notesOnPage;
			let end = start + notesOnPage;
			let notes = inputData.slice(start, end);
			table.innerHTML = '';
			for (let note of notes) {
				let tr = document.createElement('tr');
				let button = '<button value="'+ note.name +  '" onclick="selectRoute(' + note.id + ', this)">Выбрать</button>'
				table.appendChild(tr);		
				createCell(note.name, tr);
				createCell(note.description, tr);
				createCell(button, tr);
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
}
function createCell(text, tr) {
	let td = document.createElement('td');
	td.innerHTML = text;
	tr.appendChild(td);
}