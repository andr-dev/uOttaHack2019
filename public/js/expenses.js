function tableCreate (conf) {
    var cn = document.getElementById('table-container');

    var d1 = document.createElement('div');
    d1.className = 'ui stackable divided grid';
    var d1r1 = document.createElement('div');
    d1r1.className = 'row';
    var d1r2 = document.createElement('div');
    d1r2.className = 'row';
    var d1r1h = document.createElement('h3');

    if (conf) {
        d1r1h.appendChild(document.createTextNode('Confirmed Uploads'));
        var url = '/admin/show-info-c';
    } else {
        d1r1h.appendChild(document.createTextNode('Unconfirmed Uploads'));
        var url = '/admin/show-info-u';
    }

    var main  = document.createElement('div');
    main.className = 'ui stackable celled grid';
    main.setAttribute('style', 'width: 100%; margin: 0;')

    d1r1.appendChild(d1r1h);
    d1.appendChild(d1r1);
    d1r2.appendChild(main);
    d1.appendChild(d1r2);
    cn.appendChild(d1);

    getJSON(url, function (err, data) {
        if (err !== null) {
            console.log('Routing error!!!');
            console.log('ERR: [%s]', err)
        } else {
            for (let user in data) {

                for (let item in data[user]) {

                    var row = document.createElement('div');
                    row.className = 'row';

                    var c1 = document.createElement('div');
                    c1.className = 'twelve wide column';
                    c1.setAttribute('style', 'padding: 1rem !important;');

                    var c2 = document.createElement('div');
                    c2.className = 'four wide column middle aligned';
                    c2.setAttribute('style', 'padding: 1rem !important;');

                    // Populate left column

                    var gridDiv = document.createElement('div');
                    gridDiv.className = 'ui stackable grid';

                    var gridRow = document.createElement('div');
                    gridRow.className = 'row';

                    var info = data[user][item];

                    gridInfo = [info['name'], info['host'], info['date_upload'], info['topic'], info['tag0'], info['tag1'], info['tag2'], info['tag3']];
                    gridInfoHeader = ['Show Name', 'Host Name', 'Date Uploaded', 'Topic', 'Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];
                    gridInfoWidth = ['six', 'six', 'four', 'four', 'three', 'three', 'three', 'three'];

                    for (var a = 0; a < gridInfo.length; a++) {
                        var col = document.createElement('div');
                        col.className = gridInfoWidth[a] + ' wide column';
                        col.setAttribute('style', 'padding: 1rem !important;')

                        var infoItem1 = document.createElement('div');
                        infoItem1.className = 'ui inverted sub header';
                        infoItem1.innerHTML = gridInfoHeader[a] + ':';

                        var infoItem2 = document.createElement('p');
                        infoItem2.className = 'ui inverted p';
                        infoItem2.innerHTML = gridInfo[a];

                        col.appendChild(infoItem1);
                        col.appendChild(infoItem2);

                        gridRow.appendChild(col);
                    }


                    gridDiv.appendChild(gridRow);

                    c1.appendChild(gridDiv);

                    // Populate right column

                    var tbrc2_d = document.createElement('div');
                    tbrc2_d.className = 'ui container';
                    tbrc2_d.setAttribute('style',"width:70%;");
                    c2.appendChild(tbrc2_d);

                    var tbrc2_db1 = document.createElement('button');
                    tbrc2_db1.className = 'ui fluid positive button';
                    tbrc2_db1.innerHTML = 'Upload';
                    tbrc2_db1.setAttribute('onclick',"location.href = 'confirm?user=" + user + '&id=' + info['json'] + "'");
                    tbrc2_db1.setAttribute('style',"margin-bottom: 16px;");

                    if (!conf) {
                        tbrc2_d.appendChild(tbrc2_db1);
                    }

                    var tbrc2_dd = document.createElement('div');
                    tbrc2_dd.className = 'or';
                    tbrc2_dd.setAttribute('style', 'line-height: 1.6em !important;');
                    tbrc2_d.appendChild(tbrc2_dd);

                    var tbrc2_db2 = document.createElement('button');
                    tbrc2_db2.className = 'ui fluid negative button';
                    tbrc2_db2.innerHTML = 'Delete';
                    tbrc2_db2.setAttribute('onclick',"location.href = 'delete?user=" + user + '&id=' + info['json'] + "'");
                    tbrc2_d.appendChild(tbrc2_db2);

                    row.appendChild(c1);
                    row.appendChild(c2);
                    main.appendChild(row);
                }
            }
        }
    });
}

var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    tableCreate(false);
    tableCreate(true);
};