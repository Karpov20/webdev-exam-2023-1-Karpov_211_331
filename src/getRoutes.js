const allRoutes = (async function() { //... получаем маршруты
  fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=26f074f0-90b0-416a-87bc-47fb054836ec')
    .then((response) => {

      return response.json();
    })
    .then((data) => {
      let table = document.querySelector('#routesTable');
      let pages = document.querySelector('#routesPagination');
      pagination(data, table, pages);
      // console.log(data);
    });
});

function selectRoute(id, btn) {
  const field = document.querySelector('#routeNameInp');
  field.value = btn.value;
  setRoute(id);
  getGuides(id);
}
allRoutes();
