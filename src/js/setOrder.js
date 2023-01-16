let pricePH;
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
function setRoute(id) {
    order['route_id'] = id;
    console.log(order);
}
function setGuide(id) {
    order['guide_id'] = id;
    console.log(order);
}
function setPrice(price) {
    pricePH = price;
    console.log(pricePH);
}