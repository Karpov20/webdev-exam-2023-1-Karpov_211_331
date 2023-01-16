let pricePH, hoursNumber, isThisDayOff, isItMorning, isItEvening, numberOfVisitors;
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
function setTotalPrice() {
    let Price = pricePH * hoursNumber * isThisDayOff + isItMorning + isItEvening + numberOfVisitors;
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
