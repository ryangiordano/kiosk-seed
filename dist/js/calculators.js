"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let options = {
//     elements: {
//         areaChart: '#area-chart',
//         amortization: '#amortization',
//         amortizationHeader: '#amortization-header',
//         columnChart: '#column-chart',
//         creditBalance: '#creditBalance',
//         creditRate: '#creditRate',
//         creditMonthlyAmount: '#creditMonthlyAmount',
//         dividendPrincipal: '#dividend-principal',
//         dividendRate: '#dividend-rate',
//         dividendTerm: '#dividend-term',
//         dividends: '#dividends',
//         interestAmount: '#interest',
//         interest: '#interest',
//         gap: '#gap',
//         loanAmount: '#amount'
//         pieChart: '#pie-chart',
//         resultsMore: '#results-more',
//         resultsTable: '#results-table',
//         startDate: '#start-date',
//         termMonths: '#term-months',
//         termYears: '#term-years',
//         total: '#total',
//         totalInterest: '#total_interest'
//     },
//     calcType: 'auto',
//     monthlyYearly: 'months',
//     highChartsOptions:{
//       colors:['#a0b940','#AB8BC4','#7DC1D8','#1b1b1b'],
//       font:'Ubuntu, Arial, sans-serif',
//       background:'transparent'
//     }
//
// }

var FinancialCalculator = function () {
    function FinancialCalculator(options) {
        _classCallCheck(this, FinancialCalculator);

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.setHighchartsOptions(this.highChartsOptions.colors, this.highChartsOptions.font, this.highChartsOptions.background);
        //get current month and add to class scope
        this.currentMonth = new Date().getMonth() + 1;
        //get current year and add to class scope
        this.currentYear = new Date().getFullYear();
    }

    _createClass(FinancialCalculator, [{
        key: "init",
        value: function init() {
            //we set event listeners and other default things here:
            var els = this.elements;
            this.initialSetup();
            //When there is new data in each of these fields, calculate dividend
            this.calcType && this.calcType.length > 0 ? this.initializeCalculator(this.calcType) : this.initializeCalculator('custom', {
                amount: "1000",
                interest: "2.5",
                termMonths: "12"
            });
        }
    }, {
        key: "initializeCalculator",
        value: function initializeCalculator(calcType, custom) {
            var els = this.elements;
            if ((typeof custom === "undefined" ? "undefined" : _typeof(custom)) === "object") {
                this.populateLoanValues({
                    amount: custom.amount,
                    interest: custom.interest,
                    termMonths: custom.termMonths
                });
            } else {
                switch (calcType) {
                    case "auto":
                        this.populateLoanValues({
                            amount: "9500",
                            interest: "4",
                            termMonths: "48"
                        });
                        this.setEventListeners('change', [els.startDate, els.loanAmount, els.interest, els.termYears, els.termMonths, els.gap], this.calculateMonthlyPayment);
                        this.setEventListeners('click', [els.resultsMore], this.showFullAmortizationSchedule);
                        this.calculateMonthlyPayment();
                        break;
                    case "mortgage":
                        this.populateLoanValues({
                            amount: "155000",
                            interest: "3.85",
                            termMonths: "30"
                        });
                        console.log(els.loanAmount);
                        this.setEventListeners('change', [els.startDate, els.loanAmount, els.interest, els.termYears, els.termMonths, els.gap], this.calculateMonthlyPayment);
                        this.setEventListeners('click', [els.resultsMore], this.showFullAmortizationSchedule);
                        this.calculateMonthlyPayment();
                        break;
                    case "personal":
                        this.populateLoanValues({
                            amount: "5000",
                            interest: "8.5",
                            termMonths: "36"
                        });
                        this.setEventListeners('change', [els.startDate, els.loanAmount, els.interest, els.termYears, els.termMonths, els.gap], this.calculateMonthlyPayment);
                        this.setEventListeners('click', [els.resultsMore], this.showFullAmortizationSchedule);
                        this.calculateMonthlyPayment();
                        break;
                    case "boat":
                        this.populateLoanValues({
                            amount: "15000",
                            interest: "3.99",
                            termMonths: "60"
                        });
                        this.setEventListeners('change', [els.startDate, els.loanAmount, els.interest, els.termYears, els.termMonths, els.gap], this.calculateMonthlyPayment);
                        this.setEventListeners('click', [els.resultsMore], this.showFullAmortizationSchedule);
                        this.calculateMonthlyPayment();
                        break;
                    case "credit":
                        this.populateCreditValues({
                            balance: "1500",
                            rate: "9.25",
                            monthlyAmount: '30'
                        });
                        this.setEventListeners('change', [els.creditBalance, els.creditRate, els.creditMonthlyAmount], this.calculateCredit);
                        this.calculateCredit();
                        break;
                    case "savings":
                        this.populateSavingsValues({
                            principal: "1500",
                            rate: "9.25",
                            termMonths: '30'
                        });
                        this.setEventListeners('change', [this.elements.dividendPrincipal, this.elements.dividendRate, this.elements.dividendTerm], this.calculateDividend);
                        this.calculateDividend();
                        break;
                    default:
                        console.error("No Financial Calculator Type");
                }
            }
        }
    }, {
        key: "populateLoanValues",
        value: function populateLoanValues(options) {
            $(this.elements.loanAmount).val(options.amount);
            $(this.elements.interestAmount).val(options.interest);
            $(this.elements.termMonths).val(options.termMonths);
        }
    }, {
        key: "populateSavingsValues",
        value: function populateSavingsValues(options) {
            $(this.elements.dividendPrincipal).val(options.principal);
            $(this.elements.dividendRate).val(options.rate);
            $(this.elements.dividendTerm).val(options.termMonths);
        }
    }, {
        key: "populateCreditValues",
        value: function populateCreditValues(options) {
            $(this.elements.creditBalance).val(options.balance);
            $(this.elements.creditRate).val(options.rate);
            $(this.elements.creditMonthlyAmount).val(options.monthlyAmount);
        }
    }, {
        key: "calculateDividend",
        value: function calculateDividend() {
            console.log("calculateDividend has run");

            var dividend_principal = parseFloat($(this.elements.dividendPrincipal).val());
            var initial_deposit = parseFloat($(this.elements.dividendPrincipal).val());
            var dividend_rate = parseFloat($(this.elements.dividendRate).val() / 100) / 1;
            var dividend_term = parseInt($(this.elements.dividendTerm).val());
            var months = 0;
            var savings_arr = [initial_deposit];

            while (dividend_term > months) {
                months++;
                //dividend rate divided by 12, compounded monthly
                dividend_principal = dividend_principal * Math.pow(1 + dividend_rate / 12, 1);
                savings_arr.push(dividend_principal);
            }

            if (isNaN(dividend_principal)) {
                $(this.elements.total).css('opacity', '0');
                $(this.elements.dividends).css('opacity', '0');
            } else {
                $(this.elements.total).css('opacity', '1');
                $(this.elements.dividends).css('opacity', '1');
            }

            $(this.elements.total).html('$' + this.numberWithCommas(dividend_principal.toFixed(2)));
            $(this.elements.dividends).html('$' + this.numberWithCommas((dividend_principal - initial_deposit).toFixed(2)));

            // Build the pie chart
            $(this.elements.areaChart).highcharts({
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
                        formatter: function formatter() {
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
                        formatter: function formatter() {
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
                    data: savings_arr
                }]
            }); // End Highchart - Area*/
        }
    }, {
        key: "calculateMonthlyPayment",
        value: function calculateMonthlyPayment() {
            //set the monthly interest depending on the years.
            console.log("payment is calculating ");
            $(this.elements.resultsMore).css('display', 'flex');
            if (this.calcType === 'mortgage') {
                if ($(this.elements.termYears).val() == 30) {
                    $(this.elements.interestAmount).val('3.85');
                }
                if ($(this.elements.termYears).val() == 20) {
                    $(this.elements.interestAmount).val('3.75');
                }
                if ($(this.elements.termYears).val() == 15) {
                    $(this.elements.interestAmount).val('3.125');
                }
                if ($(this.elements.termYears).val() == 10) {
                    $(this.elements.interestAmount).val('3.00');
                }
            }
            // setting these as local variables...easier to read vs huge parse float equations.
            var loanamount = $(this.elements.loanAmount).val().replace(/,/g, "");
            var loan_amount = parseFloat(loanamount);

            if ($(this.elements.gap).val() == "Yes" && this.calcType == 'auto') {
                loan_amount = loan_amount + 375;
            }

            var interest_rate = parseFloat($(this.elements.interestAmount).val()) / 100;
            var monthly_interest_rate = interest_rate / 12;
            var length_of_mortgage = parseInt($(this.elements.termYears).val()) * 12;

            // begin the formula for calculate the fixed monthly payment
            // REFERENCE: P = L[c(1 + c)n]/[(1 + c)n - 1]
            var protection = void 0;
            var top_val = monthly_interest_rate * Math.pow(1 + monthly_interest_rate, length_of_mortgage);
            var bot_val = Math.pow(1 + monthly_interest_rate, length_of_mortgage) - 1;
            var monthly_mortgage = parseFloat(loan_amount * (top_val / bot_val)).toFixed(2);

            if (this.calcType == 'auto') {
                if ($(this.elements.paymentProtection).val() == "Yes") {
                    protection = parseFloat($('#coverage:checked').val()).toFixed(2);
                    protection = protection * (loanamount / 1000);
                } else {
                    protection = 0;
                }
            }
            console.log(length_of_mortgage);
            this.calculateAmortization(loan_amount, monthly_mortgage, monthly_interest_rate, length_of_mortgage);
            //show total payment, with commas
            $(this.elements.total).html("$" + this.numberWithCommas(parseFloat(monthly_mortgage)));

            //if the payment is not a number (error in input), do not display the $NaN
            if (isNaN(monthly_mortgage)) {
                $(this.elements.total).css('opacity', '0');
            } else {
                $(this.elements.total).css('opacity', '1');
            }
        }
    }, {
        key: "calculateAmortization",
        value: function calculateAmortization(loan_amount, monthly_mortgage, monthly_interest_rate, length_of_mortgage) {
            var month = parseInt(this.currentMonth);
            var year = parseInt(this.currentYear);
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
            var tablerow = void 0;
            console.log(length_of_mortgage);
            for (var i = length_of_mortgage; i > 0; i--) {
                console.log(total_interest);
                console.log(total_interest + "???");
                var monthly_interest = parseFloat(loan_amount * monthly_interest_rate).toFixed(2);
                if (isNaN(monthly_interest)) {
                    $(this.elements.resultsMore).css('opacity', '0');
                    $(this.elements.resultsTable).css('display', 'none');
                } else {
                    if ($(this.elements.resultsTable).css('display', 'none')) {
                        $(this.elements.resultsMore).css('opacity', '1');
                        $(this.elements.resultsMore).html("<div class=\"btn\" style=background-color:" + this.highChartsOptions.colors[0] + ">Show Amortization Schedule</div>");
                    }
                }
                var monthly_principal = parseFloat(monthly_mortgage - monthly_interest).toFixed(2);

                total_mortgage = parseFloat(total_mortgage) + parseFloat(monthly_mortgage);

                total_principal = parseFloat(total_principal) + parseFloat(monthly_principal);

                total_interest = parseFloat(total_interest) + parseFloat(monthly_interest);

                var monthStr = Kiosk.convertMonth(month);
                tablerow = "<tr> \
              <td>" + monthStr + " " + year + "</td> \
              <td class='principal'>" + monthly_principal + "</td> \
              <td class='interest'>" + monthly_interest + "</td> \
              <td>$" + parseFloat(monthly_mortgage).toFixed(2) + "</td> \
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
                    <td><strong>Principal<br>$" + this.numberWithCommas(parseFloat(total_principal).toFixed(2)) + "</strong></td> \
                    <td><strong>Interest<br>$" + this.numberWithCommas(parseFloat(total_interest).toFixed(2)) + "</strong></td> \
                    <td><strong>Total Payments<br>$" + this.numberWithCommas(parseFloat(total_mortgage).toFixed(2)) + "</strong></td> \
                    <td></td> \
                    </tr>";
            tableData = tableData + tablerow;
            $("h2" + this.elements.amortizationHeader).html('Amortization Schedule');
            var totalinterest = parseFloat(total_interest).toFixed(2);
            //show total interest, with commas
            $(this.elements.totalInterest).html('$' + this.numberWithCommas(totalinterest));
            //if the payment is not a number (error in input), do not display the $NaN
            if (isNaN(totalinterest)) {
                $(this.elements.totalInterest).css('opacity', '0');
            } else {
                $(this.elements.totalInterest).css('opacity', '1');
            }
            $("table" + this.elements.amortization).html(tableData);

            //Build the Highchart
            var principal_percent = total_principal / total_mortgage * 100;
            var interest_percent = total_interest / total_mortgage * 100;
            // console.log(total_principal,total_mortgage);
            // Build the pie chart
            $(this.elements.pieChart).highcharts({
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
                        payments: this.numberWithCommas((principal_percent * total_mortgage / 100).toFixed(2))
                    }, {
                        name: "Interest",
                        y: interest_percent,
                        payments: this.numberWithCommas((interest_percent * total_mortgage / 100).toFixed(2))
                    }]
                }]
            }); // End Highchart - Pie
        }
    }, {
        key: "calculateCredit",
        value: function calculateCredit() {
            var amountOwed = $(this.elements.creditBalance).val();
            var remainingBalance = $(this.elements.creditBalance).val();
            var monthlyRate = $(this.elements.creditRate).val() / 100 / 12;

            var monthlyPayment = $(this.elements.creditMonthlyAmount).val();
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
                interestPaid = remainingBalance - (amountOwed - monthlyPayment * payments);
            }

            $(this.elements.creditResult).html(months + ' Months');
            $(this.elements.creditInterest).html('$' + this.numberWithCommas(interestPaid.toFixed(2)));
            $(this.elements.creditMinPayment).html((amountOwed * .025).toFixed(2));

            //Build the Highchart
            var total_paid = interestPaid + amountOwed;
            var principal_percent = amountOwed / total_paid * 100;
            var interest_percent = interestPaid / total_paid * 100;
            $(this.elements.pieChart).highcharts({
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
                        payments: this.numberWithCommas((principal_percent * total_paid / 100).toFixed(2))
                    }, {
                        name: "Interest",
                        y: interest_percent,
                        payments: this.numberWithCommas((interest_percent * total_paid / 100).toFixed(2))
                    }]
                }]
            }); // End Highchart - Pie */
        }
    }, {
        key: "showFullAmortizationSchedule",
        value: function showFullAmortizationSchedule() {
            var _this = this;

            $(this.elements.resultsMore).css('display', 'none');
            $(this.elements.resultsTable).css('display', 'initial');
            $(this.elements.resultsMore).css('opacity', '0');
            $('.content').animate({
                scrollTop: $('.output').offset().top
            }, 1000);
            var month = parseInt($(this.currentMonth));
            Kiosk.convertMonth(month);
            var tickStart = 13 - month;
            var loanamount = $(this.elements.loanAmount).val().replace(/,/g, "");
            var loan_amount = parseFloat(loanamount);
            $(this.elements.columnChart).highcharts({
                data: {
                    table: document.getElementById('amortization'),
                    complete: function complete(options) {
                        options.series.splice(2, 1);
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
                        formatter: function formatter() {
                            return "$" + this.value;
                        }
                    }
                }],
                xAxis: {
                    type: 'category',
                    startOnTick: false,
                    endOnTick: false,
                    tickInterval: 12,
                    tickPositioner: function tickPositioner() {
                        var positions = [],
                            tick = tickStart,
                            increment = 12;
                        for (tick; tick - increment <= this.dataMax; tick += increment) {
                            positions.push(tick);
                        }
                        return positions;
                    },
                    labels: {
                        formatter: function formatter() {
                            return _this.value.replace(/\D/g, '');
                        }
                    }
                },
                series: [{
                    yAxis: 0,
                    tooltip: {
                        headerFormat: '<b>{point.key}</b><br>',
                        pointFormat: '<b>{series.name}: ${point.y:.2f}</b><br>Percent of Payments: {point.percentage:.1f}%'
                    }
                }, {
                    yAxis: 0,
                    tooltip: {
                        headerFormat: '<b>{point.key}</b><br>',
                        pointFormat: '<b>{series.name}: ${point.y:.2f}</b><br>Percent of Payments: {point.percentage:.1f}%'
                    }
                }, {
                    yAxis: 1,
                    type: 'spline',
                    stacking: 'normal',
                    tooltip: {
                        headerFormat: '<b>{point.key}</b><br>',
                        pointFormat: '<b>{series.name}: ${point.y:.2f}</b><br>'
                    }
                }]
            }); // End Highchart - Column
            //add $ into table data
            $('.principal').prepend('$');
            $('.interest').prepend('$');
            $('.mortgage').prepend('$');
        }
    }, {
        key: "initialSetup",
        value: function initialSetup() {
            //Disallow Comma on Number Inputs
            $("input[type=number]").keypress(function (evt) {
                if (String.fromCharCode(evt.which) == ",") return false;
            });
            //Back To Top Button
            $("a[href='#top']").click(function () {
                $('.content').animate({
                    scrollTop: $('header').offset().top
                }, 1000);
                return false;
            });
        }
    }, {
        key: "numberWithCommas",
        value: function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
        }
        //colorsArray is an array of string hex colors.
        //fontFamily is comma-spearated string of fonts,
        //backgroundColor is a hex value or transparent

    }, {
        key: "setHighchartsOptions",
        value: function setHighchartsOptions(colorsArray, fontFamily, backgroundColor) {
            Highcharts.setOptions({
                colors: colorsArray,
                chart: {
                    fontFamily: fontFamily,
                    backgroundColor: backgroundColor
                },
                lang: {
                    thousandsSep: ','
                }
            });
        }
    }, {
        key: "setEventListeners",
        value: function setEventListeners(listener, elArray, functionToFire) {
            var elString = elArray.join();
            var els = document.querySelectorAll(elString);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = els[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var el = _step.value;

                    el.addEventListener('click', functionToFire.bind(this));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return FinancialCalculator;
}();