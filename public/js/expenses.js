function tableCreate () {
    var table = document.getElementById('expense_table');
    var tableTBody = document.getElementById('expense_table_tbody');

    getJSON('/data/expenses_table', function (err, data) {
        if (err !== null) {
            console.log('Routing error!!!');
            console.log('ERR: [%s]', err)
        } else {
            console.log(JSON.stringify(data));

            var inputDelete = document.getElementById('inputDelete');

            var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            for (var i = 0; i < data.length; i++) {
                var row = document.createElement('tr');

                var c1 = document.createElement('td');
                c1.innerHTML = data[i].purchaseType;

                var c2 = document.createElement('td');
                c2.innerHTML = data[i].description;

                var c3 = document.createElement('td');
                var d = new Date(parseInt(data[i].datePurchased));
                c3.innerHTML = d.toLocaleDateString("en-US", dateOptions);

                var c4 = document.createElement('td');
                c4.innerHTML = data[i].cost;

                row.appendChild(c1);
                row.appendChild(c2);
                row.appendChild(c3);
                row.appendChild(c4);

                tableTBody.appendChild(row);

                var a = document.createElement('option');
                a.innerHTML = data[i].purchaseType + ' - ' + data[i].description;
                inputDelete.appendChild(a);
            }
        }
    });
}

function addPurchaseTypes () {
    getJSON('/data/purchase_type', function (err, data) {
        if (err !== null) {
            console.log('Routing error!!!');
            console.log('ERR: [%s]', err)
        } else {
            var inputType = document.getElementById('inputType');

            for (var i = 0; i < data.length; i++) {
                var a = document.createElement('option');
                a.innerHTML = data[i];
                inputType.appendChild(a);
            }
        }
    })
}

function postExpenseData () {
    console.log('u hit the button');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };

    xhttp.open("POST", '/post/expense_new', true);

    var out = {
        description: document.getElementById('inputDescription').value,
        cost: document.getElementById('inputCost').value,
        purchaseType: document.getElementById('inputType').value,
        datePurchased: new Date(document.getElementById('inputDate').value).getTime(),
    };

    xhttp.setRequestHeader('Content-Type', 'application/json');

    console.log(out);

    xhttp.send(JSON.stringify(out));
}

function postExpenseDelete () {
    console.log('u hit the button');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };

    xhttp.open("POST", '/post/expense_delete', true);

    var out = document.getElementById('inputDelete').value.split(' - ');

    xhttp.setRequestHeader('Content-Type', 'application/json');

    console.log(out);

    xhttp.send(JSON.stringify(out));
}


var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    tableCreate();
    addPurchaseTypes();
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