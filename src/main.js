var map;

DG.then(function () {
    map = DG.map('map', {
        center: [55.75, 37.62],
        zoom: 13
    });
});


$(document).ready( function () {
    $('#table-id').DataTable();
} );