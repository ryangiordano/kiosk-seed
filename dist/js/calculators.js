'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var options = {
    elements: {
        areaChart: '#area-chart',
        amortization: '#amortization',
        amortizationHeader: '#amortization-header',
        columnChart: '#column-chart',
        creditBalance: '#creditBalance',
        creditRate: '#creditRate',
        creditMonthlyAmount: '#creditMonthlyAmount',
        dividendPrincipal: '#dividend-principal',
        dividendRate: '#dividend-rate',
        dividendTerm: '#dividend-term',
        dividends: '#dividends',
        interestAmount: '#interest',
        interest: '#interest',
        gap: '#gap',
        loanAmount: '#amount',
        month: '#month',
        pieChart: '#pie-chart',
        resultsMore: '#results-more',
        resultsTable: '#results-table',
        startDate: '#start-date',
        termMonths: '#term-months',
        termYears: '#term-years',
        total: '#total',
        totalInterest: '#total_interest',
        year: '#year'
    },
    loanType: 'auto',
    monthlyYearly: 'months',
    highChartsOptions: {
        colors: ['#a0b940', '#AB8BC4', '#7DC1D8', '#1b1b1b'],
        font: 'Ubuntu, Arial, sans-serif',
        background: 'transparent'
    }

};

var FinancialCalculator = function () {
    function FinancialCalculator(options) {
        _classCallCheck(this, FinancialCalculator);

        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.setHighchartsOptions(this.highChartsOptions.colors, this.highChartsOptions.font, this.highChartsOptions.background);
    }

    _createClass(FinancialCalculator, [{
        key: 'init',
        value: function init() {
            var _this = this;

            //we set event listeners and other default things here:
            var el = this.elements;
            //get current month and add to hidden input
            var currentMonth = new Date().getMonth() + 1;
            $(el.month).val(currentMonth);
            //get current year and add to hidden input
            var currentYear = new Date().getFullYear();
            $(el.year).val(currentYear);
            //Disallow Comma on Number Inputs
            $("input[type=number]").keypress(function (evt) {
                if (String.fromCharCode(evt.which) == ",") return false;
            });
            // Mortgage & Loan Calculator
            //if the loan type is set, then set the default values. If it's set to custom, make a custom calculator.
            if (this.loanType) {
                this.setDefaultLoanValues(this.loanType);
                this.calculateMonthlyPayment();
            } // TODO: custom calc else if
            //Back To Top Button
            $("a[href='#top']").click(function () {
                $('.content').animate({
                    scrollTop: $('header').offset().top
                }, 1000);
                return false;
            });
            //Hide Payment Protection Options If Not Selected
            $(el.paymentProtection).change(function () {
                if ($(el.paymentProtection).val() == 'Yes') {
                    $(el.protectionCoverage).show();
                    $('form.auto').css("padding-bottom", "10px");
                } else {
                    $(el.protectionCoverage).hide();
                    $('form.auto').css("padding-bottom", "30px");
                }
            });
            //When there is new data in each of these fields, the calculate dividend
            var dividendEls = document.querySelectorAll(el.dividendPrincipal + ', ' + el.dividendPrincipal + ', ' + el.dividendTerm);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = dividendEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dividendEl = _step.value;

                    dividendEl.addEventListener('keyup', function () {
                        _this.calculateDividend();
                    });
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

            this.calculateDividend();
            //on change, calculate the monthly payment
            var monthlyPaymentEls = document.querySelectorAll(el.startDate + ', ' + el.loanAmount + ', ' + el.interest + ', ' + el.termYears + ', ' + el.termMonths + ', ' + el.gap + ', ' + el.paymentProtection + ', ' + el.protectionCoverage);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = monthlyPaymentEls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var monthlyPaymentEl = _step2.value;

                    monthlyPaymentEl.addEventListener('change', function () {
                        _this.calculateMonthlyPayment();
                    });
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            $(el.creditBalance + ', ' + el.creditRate + ', ' + el.creditMonthlyAmount).change(function () {
                setTimeout(_this.creditCalc, 1000);
            });
            document.querySelector(el.resultsMore).addEventListener('click', function () {
                _this.showFullAmortizationSchedule();
            });
            // //used if allowing calculation based on year OR month
            // $('select[id=monthly-yearly]').change(function() {
            //     //$("#term-months").val("");
            //     //$("#term-years").val("");
            //     if ($(this).val() == 'months') {
            //         $('#years-field').hide();
            //         $('#months-field').show();
            //     } else {
            //         $('#months-field').hide();
            //         $('#years-field').show();
            //     };
            // });
        }
        //set default values
        //takes in loan type string or flagged for custom.
        //takes custom, an object:
        // {
        //   amount: "string",
        //   interest: "string",
        //   termMonths: "string"
        // }

    }, {
        key: 'setDefaultLoanValues',
        value: function setDefaultLoanValues(loanType, custom) {
            if ((typeof custom === 'undefined' ? 'undefined' : _typeof(custom)) === "object") {
                this.populateLoanValues({
                    amount: custom.amount,
                    interest: custom.interest,
                    termMonths: custom.termMonths
                });
            } else {
                switch (loanType) {
                    case "auto":
                        this.populateLoanValues({
                            amount: "9500",
                            interest: "4",
                            termMonths: "48"
                        });
                        break;
                    case "mortgage":
                        this.populateLoanValues({
                            amount: "155000",
                            interest: "3.85",
                            termMonths: "30"
                        });
                        break;
                    case "personal":
                        this.populateLoanValues({
                            amount: "5000",
                            interest: "8.5",
                            termMonths: "36"
                        });
                        break;
                    case "boat":
                        this.populateLoanValues({
                            amount: "15000",
                            interest: "3.99",
                            termMonths: "60"
                        });
                        break;
                    case "credit":
                        this.populateCreditValues({
                            balance: "1500",
                            rate: "9.25",
                            monthlyAmount: '30'
                        });
                        break;
                }
            }
        }
    }, {
        key: 'populateLoanValues',
        value: function populateLoanValues(options) {
            $(this.elements.loanAmount).val(options.amount);
            $(this.elements.interestAmount).val(options.interest);
            $(this.elements.termMonths).val(options.termMonths);
        }
    }, {
        key: 'populateCreditValues',
        value: function populateCreditValues(options) {
            $(this.elements.creditBalance).val(options.balance);
            $(this.elements.creditRate).val(options.rate);
            $(this.elements.creditMonthlyAmount).val(options.monthlyAmount);
        }
    }, {
        key: 'calculateDividend',
        value: function calculateDividend() {

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
        key: 'calculateMonthlyPayment',
        value: function calculateMonthlyPayment() {
            //set the monthly interest depending on the years.
            $(this.elements.resultsMore).css('display', 'flex');
            if (this.loanType === 'mortgage') {
                if ($(this.elements.termYears).val() == 30) {
                    $(this.elements.interest).val('3.85');
                }
                if ($(this.elements.termYears).val() == 20) {
                    $(this.elements.interest).val('3.75');
                }
                if ($(this.elements.termYears).val() == 15) {
                    $(this.elements.interest).val('3.125');
                }
                if ($(this.elements.termYears).val() == 10) {
                    $(this.elements.interest).val('3.00');
                }
            }
            // setting these as local variables...easier to read vs huge parse float equations.
            var loanamount = $(this.elements.loanAmount).val().replace(/,/g, "");
            var loan_amount = parseFloat(loanamount);

            if ($(this.elements.gap).val() == "Yes" && this.loanType == 'auto') {
                loan_amount = loan_amount + 375;
            }

            var interest_rate = parseFloat($(this.elements.interest).val()) / 100;
            var monthly_interest_rate = interest_rate / 12;
            var length_of_mortgage = parseInt($(this.elements.termYears).val()) * 12;
            if (this.monthlyYearly == 'months') {
                length_of_mortgage = parseInt($(this.elements.termMonths).val());
            } else {
                length_of_mortgage = parseInt($(this.elements.termYears).val());
            }
            // begin the formula for calculate the fixed monthly payment
            // REFERENCE: P = L[c(1 + c)n]/[(1 + c)n - 1]
            var protection = void 0;

            var top_val = monthly_interest_rate * Math.pow(1 + monthly_interest_rate, length_of_mortgage);
            var bot_val = Math.pow(1 + monthly_interest_rate, length_of_mortgage) - 1;
            var monthly_mortgage = parseFloat(loan_amount * (top_val / bot_val)).toFixed(2);
            if (this.loanType == 'auto') {
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

            $(this.elements.total).html('$' + this.numberWithCommas(parseFloat(monthly_mortgage)));

            //if the payment is not a number (error in input), do not display the $NaN
            if (isNaN(monthly_mortgage)) {
                $(this.elements.total).css('opacity', '0');
            } else {
                $(this.elements.total).css('opacity', '1');
            }
        }
    }, {
        key: 'calculateAmortization',
        value: function calculateAmortization(loan_amount, monthly_mortgage, monthly_interest_rate, length_of_mortgage) {
            var month = parseInt($(this.elements.month).val());
            var year = parseInt($(this.elements.year).val());
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

                var monthly_interest = parseFloat(loan_amount * monthly_interest_rate).toFixed(2);
                if (isNaN(monthly_interest)) {
                    $(this.elements.resultsMore).css('opacity', '0');
                    $(this.elements.resultsTable).css('display', 'none');
                } else {
                    if ($(this.elements.resultsTable).css('display', 'none')) {
                        $(this.elements.resultsMore).css('opacity', '1');
                        $(this.elements.resultsMore).html('<div class="btn" style="background-color:#a0b940">Show Amortization Schedule</div>');
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
            $('h2' + this.elements.amortizationHeader).html('Amortization Schedule');
            var totalinterest = parseFloat(total_interest).toFixed(2);
            //show total interest, with commas
            $(this.elements.totalInterest).html('$' + this.numberWithCommas(totalinterest));
            //if the payment is not a number (error in input), do not display the $NaN
            if (isNaN(totalinterest)) {
                $(this.elements.totalInterest).css('opacity', '0');
            } else {
                $(this.elements.totalInterest).css('opacity', '1');
            }
            $('table' + this.elements.amortization).html(tableData);

            //Build the Highchart
            var principal_percent = total_principal / total_mortgage * 100;
            var interest_percent = total_interest / total_mortgage * 100;
            console.log("Building pie chart");
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
        key: 'calculateCredit',
        value: function calculateCredit() {
            var amountOwed = $(this.elements.creditBalance).val();
            var remainingBalance = $(this.elements.creditBalance).val();
            var monthlyRate = creditRate.value / 100 / 12;
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
                interestPaid = remainingBalance - (amountOwed - monthlyPayment * payments);
            }

            $('#credit-result').html(months + ' Months');
            $('#credit-interest').html('$' + this.numberWithCommas(interestPaid.toFixed(2)));
            $('#min-payment').html((amountOwed * .025).toFixed(2));

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
        key: 'showFullAmortizationSchedule',
        value: function showFullAmortizationSchedule() {
            var _this2 = this;

            $(this.elements.resultsMore).css('display', 'none');
            $(this.elements.resultsTable).css('display', 'initial');
            $(this.elements.resultsMore).css('opacity', '0');
            $('.content').animate({
                scrollTop: $('.output').offset().top
            }, 1000);
            var month = parseInt($(this.elements.month).val());
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
                            return _this2.value.replace(/\D/g, '');
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
        key: 'numberWithCommas',
        value: function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
        }
        //colorsArray is an array of string hex colors.
        //fontFamily is comma-spearated string of fonts,
        //backgroundColor is a hex value or transparent

    }, {
        key: 'setHighchartsOptions',
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
    }]);

    return FinancialCalculator;
}();