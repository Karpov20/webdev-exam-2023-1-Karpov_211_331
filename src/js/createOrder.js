'use strict';
let pricePH, hoursNumber, isThisDayOff, numberOfVisitors, isItMorning, isItEvening, totalPrice;
let order = {
  date: '',
  duration: 0,
  guide_id: 0,
  optionFirst: false,
  optionSecond: true,
  persons: 1,
  price: 0,
  route_id: 0,
  time: '',
};

const allRoutes = async function () {
  //... получаем маршруты
  let response = await fetch(
    'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=26f074f0-90b0-416a-87bc-47fb054836ec'
  );
  let data = await response.json();
  return data;
};
const getGuides = async function (route_id) {
  //... получаем гидов маршрута
  let url =
    'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/' +
    route_id +
    '/guides?api_key=26f074f0-90b0-416a-87bc-47fb054836ec';
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

function paginationRoutes (inputData) {
  let table = document.querySelector('#routesTable');
  let pagination = document.querySelector('#routesPagination');
  let notesOnPage = 10;
  let countOfItems = Math.ceil(inputData.length / notesOnPage);
  let showPage = (function () {
    let active;
    return function (item) {
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
        let button =
          '<button class="routeBTNselect" value="' +
          note.name +
          '/' +
          note.id +
          '">Выбрать</button>';
        table.appendChild(tr);
        createCell(note.name, tr);
        createCell(note.description, tr);
        createCell(button, tr);
      }
      listenRoutesButtons();
    };
  })();
  let items = [];
  for (let i = 1; i <= countOfItems; i++) {
    let li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    items.push(li);
  }
  showPage(items[0]);
  for (let item of items) {
    item.addEventListener('click', function () {
      showPage(this);
    });
  }
}
function createCell (text, tr) {
  let td = document.createElement('td');
  td.innerHTML = text;
  tr.appendChild(td);
}
function removeAllChildNodes (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function showGuides (inputData) {
  let table = document.querySelector('#guidesTable');
  removeAllChildNodes(table);
  let notes = inputData;
  table.innerHTML = '';
  for (let note of notes) {
    let tr = document.createElement('tr');
    let button =
      '<button class="guideBTNselect" value="' +
      note.name +
      '/' +
      note.id +
      '/' +
      note.pricePerHour +
      '">Выбрать</button>';
    table.appendChild(tr);
    createCell(note.name, tr);
    createCell(note.language, tr);
    createCell(note.workExperience, tr);
    createCell(note.pricePerHour, tr);
    createCell(button, tr);
  }
  listenGuidesButtons();
}
function listenRoutesButtons () {
  const btns = document.getElementsByClassName('routeBTNselect');
  for (let btn of btns) {
    // console.log(btn.value.split('/'));
    let name = btn.value.split('/')[0];
    let id = btn.value.split('/')[1];
    // console.log(id + '   '+ name);
    btn.onclick = function () {
      // console.log('click');
      const field = document.querySelector('#routeNameInp');
      field.value = name;
      setRoute(id);
      getGuides(id).then(showGuides);
    };
  }
}
function listenGuidesButtons () {
  const btns = document.getElementsByClassName('guideBTNselect');
  for (let btn of btns) {
    // console.log(btn.value.split('/'));
    let name = btn.value.split('/')[0];
    let id = btn.value.split('/')[1];
    let pricePerHour = btn.value.split('/')[2];
    // console.log(id + '   '+ name);
    btn.onclick = function () {
      // console.log('click');
      const field = document.querySelector('#guideNameInp');
      field.value = name;
      setGuide(id);
      setPrice(pricePerHour);
    };
  }
}
// настройки заказа
const date = document.querySelector('#travelDate');
const time = document.querySelector('#travelTime');
const dur = document.querySelector('#travelDuration');
const persNum = document.querySelector('#travelPeople');

function setInitvalues() {
  const today = new Date().toJSON().slice(0, 10);
  order['date'] = today;
  date.value = today;
  getMarginDayOF(today);

  const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  time.value = now;
  order['time'] = now;
  getMarginTime(now);

  persNum.value = 1;
  getMarginPerson(persNum.value);
  order['persons'] = persNum.value;
  calcTotalPrice();
}
setInitvalues();

date.onchange = function () {
  order['date'] = date.value;
  getMarginDayOF(date.value);
  calcTotalPrice();
  // console.log(order);
};

const opt1 = document.querySelector('#optionCheckFirst');
opt1.onchange = function () {
  order['optionFirst'] = opt1.checked;
  // console.log(order);
};

const opt2 = document.querySelector('#optionCheckSecond');
opt2.onchange = function () {
  order['optionSecond'] = opt2.checked;
  // console.log(order);
};

dur.onchange = function () {
  order['duration'] = dur.value;
  hoursNumber = dur.value;
  calcTotalPrice();
  // console.log(order);
};

time.onchange = function () {
  order['time'] = time.value;
  getMarginTime(time.value);
  calcTotalPrice();
  // console.log(order);
};

persNum.onchange = function () {
  getMarginPerson(persNum.value);
  order['persons'] = persNum.value;
  calcTotalPrice();
  // console.log(order);
};

function calcTotalPrice () {
  let displayPrice = document.querySelector('#totalPrice');
  console.log(pricePH, hoursNumber, isThisDayOff, isItMorning, isItEvening, numberOfVisitors);
  totalPrice = pricePH * hoursNumber * isThisDayOff + isItMorning + isItEvening + numberOfVisitors;
  console.log(totalPrice);
  if (totalPrice > 0) {
    displayPrice.value = totalPrice + '  рублей';
    order['price'] = totalPrice;
  } else {
    displayPrice.value = 'Введите все параметры';
  }
}
function setRoute (id) {
  order['route_id'] = id;
}
function setGuide (id) {
  order['guide_id'] = id;
}
function setPrice (inp) {
  pricePH = inp;
}
function getMarginTime (time) {
  if (time < '12:00') {
    isItMorning = 400;
    isItEvening = 0;
  } else if (time > '20:00') {
    isItEvening = 1000;
    isItMorning = 0;
  } else {
    isItMorning = 0;
    isItEvening = 0;
  }
}
function getMarginDayOF (dateStr) {
  const [day, month, year] = dateStr.split('-');
  const date = new Date(year, month - 1, day);
  if (date.getDay() == 0 || date.getDay() == 6) {
    isThisDayOff = 1.5;
  } else {
    isThisDayOff = 1;
  }
}
function getMarginPerson (num) {
  if (num < 5) {
    numberOfVisitors = 0;
  } else if (num < 10) {
    numberOfVisitors = 1000;
  } else {
    numberOfVisitors = 1500;
  }
}
const sendBtn = document.querySelector('#sendOrderBTN');
sendBtn.onclick = function (e) {
  e.preventDefault();
  e.stopPropagation();
  postData();
};

const postData = async function () {
  let response = await fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=26f074f0-90b0-416a-87bc-47fb054836ec', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(order)
  });
  let result = await response.json();
  console.log(result.message);
};
// start work
allRoutes().then(paginationRoutes);
