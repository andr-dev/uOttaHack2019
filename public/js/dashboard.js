var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    createCharts();
    setInputType();
};

function createCharts () {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data1 = JSON.parse(xhttp.responseText);

            console.log(data1);

            Highcharts.chart('c1', {

                title: {
                    text: 'All Time Expenses'
                },

                // subtitle: {
                //     text: 'abc123'
                // },

                yAxis: {
                    title: {
                        text: 'Total Expenses ($USD)'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'Installation',
                    data: data1,
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });
        }
    };
    xhttp.open("GET", "/data/expenses", true);
    xhttp.send();

    var xhttp1= new XMLHttpRequest();

    xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data2 = JSON.parse(xhttp1.responseText);

            console.log(data2);

            var dataSeries = [];

            dataSeries[0] = {
                name: 'expenses',
                data: data2
            }

            Highcharts.chart('c2', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Expense Breakdown'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: dataSeries
            });
        }
    };
    xhttp1.open("GET", "/data/expenses_pi", true);
    xhttp1.send();

    var xhttp2 = new XMLHttpRequest();

    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data3 = JSON.parse(xhttp2.responseText);
            console.log('data3');
            console.log(data3);

            var dataSeries = [];

            dataSeries[0] = {
                name: 'expenses',
                data: data3
            };

            Highcharts.chart('c3', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Mandatory Expense Breakdown'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: dataSeries
            });
        }
    };
    xhttp2.open("GET", "/data/expenses_mandatory", true);
    xhttp2.send();

    var xhttp3 = new XMLHttpRequest();

    xhttp3.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data4 = JSON.parse(xhttp3.responseText);

            console.log(data4);

            var dataSeries = [];

            dataSeries[0] = {
                name: 'expenses',
                data: data4
            };

            Highcharts.chart('c4', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Non Mandatory Expense Breakdown'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: dataSeries
            });
        }
    };
    xhttp3.open("GET", "/data/expenses_nonmandatory", true);
    xhttp3.send();
}

function setInputType() {

}