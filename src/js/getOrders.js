function getOrders () {
  const orderList = document.querySelector('#ordersTable');
  const oops = 'УПС! Заявок нет!';
  function showOrders(orders) {
  if (orders.length == 0) {
    console.log(oops);    
  } else {
    //TODO обработчик
  }
}
  async function getAllOrders () {
    let response = await fetch(
      'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=26f074f0-90b0-416a-87bc-47fb054836ec'
    );
    orders = await response.json();
    showOrders(orders);
  }
  getAllOrders();
}
getOrders();
