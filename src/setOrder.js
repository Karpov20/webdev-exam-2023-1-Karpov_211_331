let pricePH, hoursNumber, isThisDayOff, numberOfVisitors, isItMorning, isItEvening, totalPrice;
let order = 
    {
        "date": "", 
        "duration": 0, 
        "guide_id": 0,  
        "optionFirst": false, 
        "optionSecond": true, 
        "persons": 1, 
        "price": 0, 
        "route_id": 0, 
        "time": "14:00:00"
    }
function calcTotalPrice() {
    console.log(pricePH, hoursNumber, isThisDayOff, isItMorning, isItEvening, numberOfVisitors);
    totalPrice = pricePH * hoursNumber * isThisDayOff + isItMorning + isItEvening + numberOfVisitors;
    return totalPrice;
}
function setRoute(id) {
    order['route_id'] = id;
}
function setGuide(id) {
    order['guide_id'] = id;
}
function setPrice(price) {
    pricePH = price;
}
function getMarginTime(time) {
    if (time < '12:00') {
        isItMorning = 400; 
        isItEvening = 0;
    } else if (curTime > '20:00') {
        isItEvening = 1000;
        isItMorning = 0; 
    }
    else {
        isItMorning = 0; 
        isItEvening = 0;
    }
}
function getMarginDayOF(dateStr) {
    const [day, month, year] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return (date.getDay() == 0 || date.getDay() == 6);
}
function getMarginPerson(num) {
    if (num < 5) {
        numberOfVisitors = 0;
    } else if (num < 10) {
        numberOfVisitors = 1000;
    } else {
        numberOfVisitors = 1500;
    }
}
function getTotalPrice(e) {
    e.preventDefault();
    e.stopPropagation();
    let curTime = document.querySelector('#travelTime').value;
    let date = document.querySelector('#travelDate').value;
    let persons = document.querySelector('#travelPeople').value;
    let displayPrice = document.querySelector('#totalPrice');
    hoursNumber = document.querySelector('#travelTTime').value;
    getMarginTime(curTime);
    if (getMarginDayOF(date) == true) {
        isThisDayOff = 1.5;
    } else { isThisDayOff = 1 }
    getMarginPerson(persons);
    calcTotalPrice();
    displayPrice.value = totalPrice + '  rubles';
    order['persons'] = persons;
    order['date'] = date;
    order['duration'] = hoursNumber;
    order['time'] = curTime+ ':00';
    order['price'] = totalPrice;
    console.log(order);
}

function sendOrder(e) {
    e.preventDefault();
    e.stopPropagation();
    getTotalPrice();
    postData();
}

async function postData(url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=26f074f0-90b0-416a-87bc-47fb054836ec', data = order) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  