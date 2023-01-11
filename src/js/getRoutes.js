async function getAllRoutes() {
  let response = await fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=26f074f0-90b0-416a-87bc-47fb054836ec');
  routes = await response.json();
  console.log(routes);  
}
getAllRoutes();