function tableCreate () {
    var table = document.getElementById('expense_table');
    var tableTBody = document.getElementById('expense_table_tbody');

    getJSON('/data/expenses_table', function (err, data) {
        if (err !== null) {
            console.log('Routing error!!!');
            console.log('ERR: [%s]', err)
        } else {
            console.log(JSON.stringify(data));

            var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            for (var i = 0; i < data.length; i++) {
                var row = document.createElement('tr');

                var c1 = document.createElement('td');
                c1.innerHTML = data[i].purchaseType;
                var c2 = document.createElement('td');
                c2.innerHTML = data[i].description;
                var c3 = document.createElement('td');
                var dateInt = parseInt(data[i].datePurchased);
                console.log(dateInt);
                c3.innerHTML = dateInt;// (new Date(dateInt)).toLocaleDateString("en-US", dateOptions);
                var c4 = document.createElement('td');
                c4.innerHTML = data[i].cost;

                row.appendChild(c1);
                row.appendChild(c2);
                row.appendChild(c3);
                row.appendChild(c4);

                tableTBody.appendChild(row);
            }
        }
    });
}

var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    tableCreate();
};

const getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};