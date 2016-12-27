function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

Highcharts.setOptions({
    colors: ['#1b1565','#f9af42',  '#faaf40', '#3b4c9d'],
    chart: {
        fontFamily: 'Calibri, Helvetica, serif',
        backgroundColor: 'transparent'
    },
    lang: {
        thousandsSep: ','
    }
})


/* JavaScript Document */

/* Class Act Federal Credit Union   |  iPad Kiosk */

/* Website Produced by Codigo |  gocodigo.com */

/* --------------------------------------------------
Javascript Table of Contents
-----------------------------------------------------
1. Fast Click
2. Add Commas to Outputs
3. Disallow Comma on Number Inputs
4. Mortgage & Loan Calculator
5. Dividend Calculator
6. Credit Card Calculator
7. Dialog Modal
8. Close Dialog Modal When Clicked Outside
9. Responsive Dialog Modals
10. Highchart Options
11. Back To Top Button
12. Hide Payment Protection Options If Not Selected

/********************************************* */
/*1. Fast Click */
//Attaches fastclick.js to the body //Helps with touch delay
$(function() {
    FastClick.attach(document.body);
});


/********************************************* */
/*2. Add Commas to Outputs */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

/********************************************* */
/*3. Disallow Comma on Number Inputs */
$("input[type=number]").keypress(function(evt) {
    if (String.fromCharCode(evt.which) == ",")
        return false;
});

/********************************************* */
/*4. Mortgage & Loan Calculator*/
//get current month and add to hidden input
var currentMonth = (new Date).getMonth() + 1;
$('#month').val(currentMonth);
//get current year and add to hidden input
var currentYear = (new Date).getFullYear();
$('#year').val(currentYear);
//set var for additional payment protection
var protection = 0;
//set default values
if ($('input[id=loan-type]').val() == 'auto') {
    $('#amount').val('9500');
    $('#interest').val('4');
    $('#term-months').val('48');
} else if ($('input[id=loan-type]').val() == 'mortgage') {
    $('#amount').val('155000');
    $('#interest').val('3.85');
    $('#term-years').val('30');
} else if ($('input[id=loan-type]').val() == 'personal') {
    $('#amount').val('5000');
    $('#interest').val('8.5');
    $('#term-months').val('36');
} else if ($('input[id=loan-type]').val() == 'boat') {
    $('#amount').val('15000');
    $('#interest').val('3.99');
    $('#term-months').val('60');
}

function convert_month(month) {
    if (month == 1) {
        month = "January";
    } else if (month == 2) {
        month = "February";
    } else if (month == 3) {
        month = "March";
    } else if (month == 4) {
        month = "April";
    } else if (month == 5) {
        month = "May";
    } else if (month == 6) {
        month = "June";
    } else if (month == 7) {
        month = "July";
    } else if (month == 8) {
        month = "August";
    } else if (month == 9) {
        month = "September";
    } else if (month == 10) {
        month = "October";
    } else if (month == 11) {
        month = "November";
    } else if (month == 12) {
        month = "December";
    }
    return month;
}

function calculate_monthly_payment() {
    $('#results-more').css('display', 'flex');
    if ($('input[id=loan-type]').val() == 'mortgage') {
        if ($('#term-years').val() == 30) {
            $('#interest').val('3.85');
        }
        if ($('#term-years').val() == 20) {
            $('#interest').val('3.75');
        }
        if ($('#term-years').val() == 15) {
            $('#interest').val('3.125');
        }
        if ($('#term-years').val() == 10) {
            $('#interest').val('3.00');
        }
    }
    // setting these as local variables...easier to read vs huge parse float equations.
    var loanamount = $('#amount').val().replace(/,/g, "");
    var loan_amount = parseFloat(loanamount);
    if ($('input[id=loan-type]').val() == 'auto') {
        if ($('#gap').val() == "Yes") {
            loan_amount = loan_amount + 375;
        }
    }
    var interest_rate = parseFloat($('#interest').val()) / 100;
    var monthly_interest_rate = interest_rate / 12;
    var length_of_mortgage = parseInt($('#term-years').val()) * 12;
    if ($('input[id=monthly-yearly]').val() == 'months') {
        length_of_mortgage = parseInt($('#term-months').val());
    };
    // begin the formula for calculate the fixed monthly payment
    // REFERENCE: P = L[c(1 + c)n]/[(1 + c)n - 1]
    var top_val = monthly_interest_rate * Math.pow((1 + monthly_interest_rate), length_of_mortgage);
    var bot_val = Math.pow((1 + monthly_interest_rate), (length_of_mortgage)) - 1;
    var monthly_mortgage = parseFloat(loan_amount * (top_val / bot_val)).toFixed(2);
    if ($('input[id=loan-type]').val() == 'auto') {
        if ($('#protection').val() == "Yes") {
            protection = parseFloat($('#coverage:checked').val()).toFixed(2);
            protection = protection * (loanamount / 1000);
        } else {
            protection = 0;
        }
    }
    calculate_amortization(loan_amount, monthly_mortgage, monthly_interest_rate, length_of_mortgage);
    //show total payment, with commas
    $('#total').html('$' + numberWithCommas((parseFloat(monthly_mortgage) + parseFloat(protection)).toFixed(2)));
    //if the payment is not a number (error in input), do not display the $NaN
    if (isNaN(monthly_mortgage)) {
        $('#total').css('opacity', '0');
    } else {
        $('#total').css('opacity', '1');
    }
} //End Calculate Monthly Payment

function calculate_amortization(loan_amount, monthly_mortgage, monthly_interest_rate, length_of_mortgage) {
    var month = parseInt($('#month').val());
    var year = parseInt($('#year').val());
    var tableData = "<tr> \
              <th>Month</th> \
              <th>Principal</th> \
              <th>Interest</th> \
              <th>Payment</th> \
              <th>Balance</th> \
              </tr>";
    // Initializing the empty totals
    var total_mortgage = parseFloat(0);
    var total_principal = parseFloat(0);
    var total_interest = parseFloat(0);
    for (i = length_of_mortgage; i > 0; i--) {
        var monthly_interest = parseFloat(loan_amount * monthly_interest_rate).toFixed(2);
        if (isNaN(monthly_interest)) {
            $('#results-more').css('opacity', '0');
            $('#results-table').css('display', 'none');
        } else {
            if ($('#results-table').css('display', 'none')) {
                $('#results-more').css('opacity', '1');
                $('#results-more').html('<div class="btn-orange">Show Amortization Schedule</div>');
            }
        }
        var monthly_principal = parseFloat(monthly_mortgage - monthly_interest).toFixed(2);
        total_mortgage = parseFloat(total_mortgage) + parseFloat(monthly_mortgage) + parseFloat(protection);
        total_principal = parseFloat(total_principal) + parseFloat(monthly_principal);
        total_interest = parseFloat(total_interest) + parseFloat(monthly_interest);
        var monthStr = convert_month(month);
        var tablerow = "<tr> \
          <td>" + monthStr + " " + year + "</td> \
          <td class='principal'>" + monthly_principal + "</td> \
          <td class='interest'>" + monthly_interest + "</td> \
          <td>$" + (parseFloat(monthly_mortgage) + parseFloat(protection)).toFixed(2) + "</td> \
          <td class='mortgage'>" + parseFloat(loan_amount).toFixed(2) + "</td> \
          </tr>";
        tableData = tableData + tablerow;
        if (month == 12) {
            month = 1;
            year++;
        } else {
            month++;
        };
        loan_amount = parseFloat(loan_amount - monthly_principal).toFixed(2);
    };
    tablerow = "<tr> \
                <td></td> \
                <td><strong>Principal<br>$" + numberWithCommas(parseFloat(total_principal).toFixed(2)) + "</strong></td> \
                <td><strong>Interest<br>$" + numberWithCommas(parseFloat(total_interest).toFixed(2)) + "</strong></td> \
                <td><strong>Total Payments<br>$" + numberWithCommas(parseFloat(total_mortgage).toFixed(2)) + "</strong></td> \
                <td></td> \
                </tr>";
    tableData = tableData + tablerow;
    $('h2#amortization-header').html('Amortization Schedule');
    var totalinterest = parseFloat(total_interest).toFixed(2);
    //show total interest, with commas
    $('#total_interest').html('$' + numberWithCommas(totalinterest));
    //if the payment is not a number (error in input), do not display the $NaN
    if (isNaN(totalinterest)) {
        $('#total_interest').css('opacity', '0');
    } else {
        $('#total_interest').css('opacity', '1');
    }
    $('table#amortization').html(tableData);

    //Build the Highchart
    var principal_percent = (total_principal / total_mortgage) * 100;
    var interest_percent = (total_interest / total_mortgage) * 100;

    // Build the pie chart
    $('#pie-chart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Breakdown of Payments',
            style: {
                fontWeight: 'bold'
            }
        },
        tooltip: {
            headerFormat: '<b>Total {point.key} Paid:</b><br>',
            pointFormat: '<b>${point.payments}</b><br>Percent of Payments: {point.percentage:.1f}%',
            borderRadius: 10,
            style: {
                padding: 10,
                fontSize: '15px'
            }
        },
        credits: {
            enabled: false
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
        legend: {
            itemStyle: {
                fontSize: '16px'
            }
        },
        series: [{
            name: "Payments",
            colorByPoint: true,
            data: [{
                name: "Principal",
                y: principal_percent,
                payments: numberWithCommas(((principal_percent * total_mortgage) / 100).toFixed(2))
            }, {
                name: "Interest",
                y: interest_percent,
                payments: numberWithCommas(((interest_percent * total_mortgage) / 100).toFixed(2))
            }]
        }]
    }); // End Highchart - Pie
} //End Calc Amortization
//used if allowing calculation based on year OR month
$('select[id=monthly-yearly]').change(function() {
    //$("#term-months").val("");
    //$("#term-years").val("");
    if ($(this).val() == 'months') {
        $('#years-field').hide();
        $('#months-field').show();
    } else {
        $('#months-field').hide();
        $('#years-field').show();
    };
});
//show full amortization schedule on click
$('#results-more').click(function() {
    $(this).css('display', 'none');

    $('#results-table').css('display', 'initial');
    $('#results-more').css('opacity', '0');
    $('.content').animate({
        scrollTop: ($('.output').offset()).top
    }, 1000);
    var month = parseInt($('#month').val());
    convert_month(month);
    var tickStart = 13 - month;
    var loanamount = $('#amount').val().replace(/,/g, "");
    var loan_amount = parseFloat(loanamount);
    $('#column-chart').highcharts({
        data: {
            table: document.getElementById('amortization'),
            complete: function(options) {
                options.series.splice(2, 1)
            },
            //table: 'amortization'
            //startColumn:0,
            //endColumn:3,
            endRow: $('#amortization tr').length - 2
        },
        chart: {
            type: 'column'
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Payment and Balance',
            style: {
                fontWeight: 'bold'
            }
        },
        tooltip: {
            borderRadius: 10,
            style: {
                padding: 10,
                fontSize: '15px'
            }
        },
        yAxis: [{
            allowDecimals: false,
            title: {
                text: 'Percent of Payment'
            },
            min: 0,
            max: 100
        }, {
            opposite: true,
            title: {
                text: 'Balance'
            },
            min: 0,
            max: loan_amount,
            labels: {
                formatter: function() {
                    return "$" + this.value;
                }
            }
        }],
        xAxis: {
            type: 'category',
            startOnTick: false,
            endOnTick: false,
            tickInterval: 12,
            tickPositioner: function() {
                var positions = [],
                    tick = tickStart,
                    increment = 12;
                for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(tick);
                }
                return positions;
            },
            labels: {
                formatter: function() {
                    return this.value.replace(/\D/g, '');
                },
            }
        },
        series: [{
            yAxis: 0,
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '<b>{series.name}: ${point.y:.2f}</b><br>Percent of Payments: {point.percentage:.1f}%',
            }
        }, {
            yAxis: 0,
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '<b>{series.name}: ${point.y:.2f}</b><br>Percent of Payments: {point.percentage:.1f}%',
            }
        }, {
            yAxis: 1,
            type: 'spline',
            stacking: 'normal',
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '<b>{series.name}: ${point.y:.2f}</b><br>',
            }
        }]
    }); // End Highchart - Column
    //add $ into table data
    $('.principal').prepend('$');
    $('.interest').prepend('$');
    $('.mortgage').prepend('$');
}); // End click function
$('#start-date, #amount, #interest, #term-years, #term-months, #gap, #protection, #coverage').change(calculate_monthly_payment);

/********************************************* */
/*5. Dividend Calculator */

function calculate_dividend() {
    var dividend_principal = parseFloat($('#dividend-principal').val());
    var initial_deposit = parseFloat($('#dividend-principal').val());
    var dividend_rate = parseFloat(($('#dividend-rate').val()) / 100) / 1;
    var dividend_term = parseInt($('#dividend-term').val());
    months = 0;
    savings_arr = [initial_deposit];

    while (dividend_term > months) {
        months++;
        //dividend rate divided by 12, compounded monthly
        dividend_principal = (dividend_principal * Math.pow((1 + dividend_rate / 12), 1));
        savings_arr.push(dividend_principal);
    }

    if (isNaN(dividend_principal)) {
        $('#total').css('opacity', '0');
        $('#dividends').css('opacity', '0');
    } else {
        $('#total').css('opacity', '1');
        $('#dividends').css('opacity', '1');
    }

    $('#total').html('$' + numberWithCommas(dividend_principal.toFixed(2)));
    $('#dividends').html('$' + numberWithCommas((dividend_principal - initial_deposit).toFixed(2)));

    // Build the pie chart
    $('#area-chart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'area'
        },
        title: {
            text: 'Savings with Interest',
            style: {
                fontWeight: 'bold'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.key} Months</b><br>',
            pointFormat: 'Balance: ${point.y:,.2f}',
            borderRadius: 10,
            style: {
                padding: 10,
                fontSize: '15px'
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: 'Months'
            },
            allowDecimals: false,
            labels: {
                formatter: function() {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: 'Balance'
            },
            min: initial_deposit,
            max: dividend_principal,
            labels: {
                formatter: function() {
                    return "$" + this.value;
                }
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }



                    }
                }
            }
        },
        legend: {
            itemStyle: {
                fontSize: '16px'
            }
        },
        series: [{
            name: "Balance",
            data: savings_arr,
        }]
    }); // End Highchart - Area*/
}

$('#dividend-principal, #dividend-rate, #dividend-term').keyup(calculate_dividend);

/********************************************* */
/*6. Credit Card Calculator */

//set default values
$('#creditBalance').val('1500');
$('#creditRate').val('9.25');
$('#creditMonthlyAmount').val('30');

function creditCalc() {
    var amountOwed = creditBalance.value;
    var remainingBalance = creditBalance.value;
    var monthlyRate = (creditRate.value / 100) / 12;
    var monthlyPayment = creditMonthlyAmount.value;
    var payments = 0;
    var months = 0;
    var interestPaid = 0;
    var minPayment = (amountOwed * .025).toFixed(2);
    //set minimum to be the greater value of 2.5% or $25
    if (Number(minPayment) < 24.99) {
        minPayment = 25.00;
    }
    //update the value of the monthly payment if below minimum
    if (Number(minPayment) > Number(monthlyPayment)) {
        $('#creditMonthlyAmount').val(minPayment);
        monthlyPayment = minPayment;
    }
    //update the value of the monthly payment if below minimum
    while (Number(remainingBalance) > 0) {
        payments++;
        months++;
        remainingBalance = remainingBalance * (1 + monthlyRate) - monthlyPayment;
        interestPaid = remainingBalance - (amountOwed - (monthlyPayment * payments));
    }

    $('#credit-result').html(months + ' Months');
    $('#credit-interest').html('$' + numberWithCommas(interestPaid.toFixed(2)));
    $('#min-payment').html((amountOwed * .025).toFixed(2));

    //Build the Highchart
    var total_paid = interestPaid + amountOwed;
    var principal_percent = (amountOwed / total_paid) * 100;
    var interest_percent = (interestPaid / total_paid) * 100;

    // Build the pie chart
    $('#pie-chart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Breakdown of Payments',
            style: {
                fontWeight: 'bold'
            }
        },
        tooltip: {
            headerFormat: '<b>Total {point.key} Paid:</b><br>',
            pointFormat: '<b>${point.payments}</b><br>Percent of Payments: {point.percentage:.1f}%',
            borderRadius: 10,
            style: {
                padding: 10,
                fontSize: '15px'
            }
        },
        credits: {
            enabled: false
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
        legend: {
            itemStyle: {
                fontSize: '16px'
            }
        },
        series: [{
            name: "Payments",
            colorByPoint: true,
            data: [{
                name: "Principal",
                y: principal_percent,
                payments: numberWithCommas(((principal_percent * total_paid) / 100).toFixed(2))
            }, {
                name: "Interest",
                y: interest_percent,
                payments: numberWithCommas(((interest_percent * total_paid) / 100).toFixed(2))
            }]
        }]
    }); // End Highchart - Pie */
}

$(document).ready(function() {
        $('#creditBalance, #creditRate, #creditMonthlyAmount').change(function() {
            setTimeout(creditCalc, 1000);
        });
    })
    //$('#creditBalance, #creditRate, #creditMonthlyAmount').keyup(creditCalc);

/********************************************* */
/* 7. Dialog Boxes */

$(function() {
    $(".dialog").dialog({
        title: "",
        closeOnEscape: true,
        resizable: false,
        modal: true,
        autoOpen: false,
        draggable: false,
        hide: {
            effect: "fade",
            duration: 440
        },
        show: {
            effect: "fade",
            duration: 440
        },
        height: 370,
        width: 593,
        fluid: true, //new option
        open: function(event, ui) {
            fluidDialog();
        },
        close: function() {}
    });
});

$(function() {
    $(".dialog.small").dialog({
        title: "",
        closeOnEscape: true,
        resizable: false,
        modal: true,
        autoOpen: false,
        draggable: false,
        hide: {
            effect: "fade",
            duration: 440
        },
        show: {
            effect: "fade",
            duration: 440
        },
        height: 150,
        width: 593,
        fluid: true, //new option
        open: function(event, ui) {
            fluidDialog();
        },
        close: function() {}
    });
});


/* ******************************************** */
/*Back To Top Button*/

$("a[href='#top']").click(function() {
    $('.content').animate({
        scrollTop: ($('header').offset()).top
    }, 1000);
    return false;
});

/* ******************************************** */
/*12. Hide Payment Protection Options If Not Selected */
$("#protection").change(function() {
    if ($('#protection').val() == 'Yes') {
        $('.input.radio').show();
        $('form.auto').css("padding-bottom", "10px");
    } else {
        $('.input.radio').hide();
        $('form.auto').css("padding-bottom", "30px");
    }
});

//13. Scroll down get title in the nav bar
var logoContainer = $('.corner-logo'),disclosure = $('.disclosure'), changeOkay = false, table = $('#results');

$('.content').scroll(function() {
    if ($(this).scrollTop() >= 80) {
        changeOkay = true;
        populateTitle();
    } else {
        changeOkay = false;
        populateTitle();
    }
});

function populateTitle() {
    if (changeOkay) {
      TweenMax.to(logoContainer,.5,{opacity:1,y:200});
      TweenMax.to(disclosure,.5,{opacity:0});
      TweenMax.to(table, .5,{opacity:1});

    } else {
      TweenMax.to(logoContainer,.5,{opacity:1,y:0});
            TweenMax.to(disclosure,.5,{opacity:1});
      TweenMax.to(table, .5,{opacity:0});

    }
};
