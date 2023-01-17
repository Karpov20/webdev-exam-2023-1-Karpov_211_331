'use strict'
window.onload = function() {   
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
            "time": ""
        }
    const today = new Date().toJSON().slice(0, 10);
    order['date'] = today;
    const date = document.querySelector('#travelDate');
    date.value = today;
    date.onchange = function() {
        order['date'] = date.value;
        getMarginDayOF(date.value);
        calcTotalPrice();
        // console.log(order);
    }

    const opt1 = document.querySelector('#optionCheckFirst');
    opt1.onchange = function() {
        order['optionFirst'] = opt1.checked;
        // console.log(order);
    };

    const opt2 = document.querySelector('#optionCheckSecond');
    opt2.onchange = function() {
        order['optionSecond'] = opt2.checked;
        // console.log(order);
    };

    const dur = document.querySelector('#travelDuration');
    dur.onchange = function() {
        order['duration'] = dur.value;
        calcTotalPrice();
        // console.log(order);
    }
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const time = document.querySelector('#travelTime');
    time.value = now;
    order['time'] = now;
    time.onchange = function() {
        order['time'] = time.value
        getMarginTime(time.value);
        calcTotalPrice();
        // console.log(order);
    }

    const persNum = document.querySelector('#travelPeople');
    persNum.value = 1;
    order['persons'] = persNum.value;
    persNum.onchange = function() {
        getMarginPerson(persNum.value);
        order['persons'] = persNum.value;
        calcTotalPrice();
        // console.log(order);
    }

function calcTotalPrice() {
    let displayPrice = document.querySelector('#totalPrice');
    // console.log(pricePH, hoursNumber, isThisDayOff, isItMorning, isItEvening, numberOfVisitors);
    totalPrice = pricePH * hoursNumber * isThisDayOff + isItMorning + isItEvening + numberOfVisitors;
    console.log(totalPrice);
    if (totalPrice > 0) {
        displayPrice.value = totalPrice + '  рублей';
        order['price'] = totalPrice;
    } else {
        displayPrice.value = 'Введите все параметры';
    }
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
    if (date.getDay() == 0 || date.getDay() == 6) {
        isThisDayOff = 1.5;
    } else { isThisDayOff = 1 };
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
const sendBtn = document.querySelector('#sendOrderBTN');
sendBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
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
  
};
