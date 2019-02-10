var data = [{cool: 'cool', hot:'hot'}, {black: 'black', white: 'white'}, {high: 'high', low: 'low'}];
const getPostData = function() {
    return data;
}

function getData(values) {
    values = values || {};

    const form = createElement("form", {
        action: url,
        method: "POST",
        style: "display: none"
    });
    for (const property in values) {
        if (values.hasOwnProperty(property)) {
            const value = values[property];
            if (value instanceof Array) {
                let i = 0, l = value.length;
                for (; i < l; i++) {
                    form.appendChild(createElement("input", {type: "hidden",
                        name: property,
                        value: value[i]}));
                }
            }
            else {
                form.appendChild(createElement("input", {type: "hidden",
                    name: property,
                    value: value}));
            }
        }
    }
    document.body.appendChild(form);
    form.submit();
}

function addData(category, value){
    values = {"category": category, "value": value};
    data.append(values);
}