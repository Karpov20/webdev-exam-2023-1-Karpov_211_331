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
    console.log({pricePH, hoursNumber, isThisDayOff, isItMorning, isItEvening, numberOfVisitors});
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
    console.log(totalPrice);
    displayPrice.value = totalPrice + '  rubles';
}

function sendOrder(e) {
    e.preventDefault();
    e.stopPropagation();
    getTotalPrice();
    console.log(order);
}