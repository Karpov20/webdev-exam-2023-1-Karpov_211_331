let guidesTable = document.querySelector('#guides__table');

for (guide of guides) {
    {
        let tr = document.createElement('tr');
        guidesTable.appendChild(tr);
        createCell(guide.name, tr);
        createCell(guide.language, tr);
        createCell(guide.workExperience, tr);
        createCell(guide.pricePerHour, tr);
        createCell('<button class="btn")>Выбрать</button>', tr);
    }
}   