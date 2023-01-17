const getGuides = async function (route_id) {   //... получаем гидов маршрута
  let url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/' + route_id + '/guides?api_key=26f074f0-90b0-416a-87bc-47fb054836ec'
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      showGuides(data);
    });
};
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
function showGuides(inputData) {
  let table = document.querySelector('#guidesTable');
  removeAllChildNodes(table);
  let notes = inputData;
	table.innerHTML = '';
	for (let note of notes) {
				let tr = document.createElement('tr');
				let button = '<button onclick="selectGuide(' + note.id + ',' + note.pricePerHour + ', this)" value="' + note.name + '">Выбрать</button>'
				table.appendChild(tr);		
				createCell(note.name, tr);
				createCell(note.language, tr);
				createCell(note.workExperience, tr);
				createCell(note.pricePerHour, tr);
				createCell(button, tr);
			}
}

function selectGuide(id, price, btn) {
  const field = document.querySelector('#guideNameInp');
  field.value = btn.value;
  setPrice(price);
  setGuide(id);
}