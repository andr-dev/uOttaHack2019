var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    divCreate();
};

var data = [];


function divCreate () {
    var table = document.getElementById('custom_table');

    getJSON('/data/categories_table', function (err, data) {
        if (err !== null) {
            console.log('Routing error!!!');
            console.log('ERR: [%s]', err)
        } else {
            console.log(JSON.stringify(data));

            for (let i = 0; i < data.length; i++) {

                addData(data[i].category, data[i].value);

            }

            addData('', '');
        }
    });
}

function postData() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };

    xhttp.open("POST", '/post/categories_table', true);

    var out = [];

    var usedNames = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i].category != null) {
            var used = false;
            for (var a = 0; a < usedNames.length; a++) {
                if (data[i].category === usedNames[a]) {
                    used = true;
                }
            }
            if (!used) {
                usedNames.push(data[i].category);
                out.push(data[i]);
            }
        }
    }

    console.log(out);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.send(JSON.stringify(out));
}

function addData(category, value){
    var table = document.getElementById('custom_table');

    var div1 = document.createElement('div');
    div1.className = 'row form-row';
    div1.setAttribute('id', 'r' + data.length);

    var div2 = document.createElement('div');
    div2.className = 'row';

    var div2_a = document.createElement('div');
    div2_a.className = 'col-xs-6';

    var div2_a_i = document.createElement('input');
    div2_a_i.className = 'form-control';
    div2_a_i.setAttribute('type', 'text');
    div2_a_i.setAttribute('placeholder', category);
    div2_a_i.setAttribute('oninput', 'updateInputCat(this.value, ' + data.length + ')');

    div2_a.appendChild(div2_a_i);

    var div2_b = document.createElement('div');
    div2_b.className = 'col-xs-3';

    var div2_b_i = document.createElement('input');
    div2_b_i.className = 'form-control';
    div2_b_i.setAttribute('type', 'text');
    div2_b_i.setAttribute('placeholder', value);
    div2_b_i.setAttribute('oninput', 'updateInputValues(this.value, ' + data.length + ')');

    div2_b.appendChild(div2_b_i);

    var div2_c = document.createElement('div');
    div2_c.className = 'col-xs-2';

    var div2_c_i = document.createElement('input');
    div2_c_i.setAttribute('type', 'checkbox');
    div2_c_i.setAttribute('name', 'Mandatory');

    var div2_c_t = document.createElement('label');
    div2_c_t.setAttribute('for', 'Mandatory');
    div2_c_t.setAttribute('style', 'fdding-right: 8px;');
    div2_c_t.innerHTML = 'Mandatory';

    div2_c.appendChild(div2_c_t);
    div2_c.appendChild(div2_c_i);

    var div2_d = document.createElement('div');
    div2_d.className = 'col-xs-1';

    var div2_d_b = document.createElement('button');
    div2_d_b.className = 'btn btn-danger';
    div2_d_b.innerHTML = 'X';
    div2_d_b.setAttribute('onclick', "deleteData(" + data.length + ")");

    div2_d.appendChild(div2_d_b);

    div2.appendChild(div2_a);
    div2.appendChild(div2_b);
    div2.appendChild(div2_c);
    div2.appendChild(div2_d);

    div1.appendChild(div2);

    table.appendChild(div1);

    values = {"category": category, "value": value};
    data.push(values);

    console.log(data);
}

function deleteData (pos) {
    data.splice(pos, 1);

    document.getElementById('r' + pos).parentNode.removeChild(document.getElementById('r' + pos));
}

function updateInputValues (value, pos) {
    data[pos].value = value;
}

function updateInputCat (cat, pos) {
    data[pos].category = cat;
}


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