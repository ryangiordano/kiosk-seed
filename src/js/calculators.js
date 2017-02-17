let options = {
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
    highChartsOptions:{
      colors:['#a0b940','#AB8BC4','#7DC1D8','#1b1b1b'],
      font:'Ubuntu, Arial, sans-serif',
      background:'transparent'
    }

}


class FinancialCalculator {
    constructor(options) {

        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.setHighchartsOptions(this.highChartsOptions.colors,this.highChartsOptions.font,this.highChartsOptions.background);
    }
    init() {
        //we set event listeners and other default things here:
        let el = this.elements;
        //get current month and add to hidden input
        let currentMonth = new Date().getMonth() + 1;
        $(el.month).val(currentMonth);
        //get current year and add to hidden input
        let currentYear = new Date().getFullYear();
        $(el.year).val(currentYear);
        //Disallow Comma on Number Inputs
        $("input[type=number]").keypress(function(evt) {
            if (String.fromCharCode(evt.which) == ",") return false;
        });
        // Mortgage & Loan Calculator
        //if the loan type is set, then set the default values. If it's set to custom, make a custom calculator.
        if (this.loanType) {
            this.setDefaultLoanValues(this.loanType);
            this.calculateMonthlyPayment();
        }// TODO: custom calc else if
        //Back To Top Button
        $("a[href='#top']").click(function() {
            $('.content').animate({
                scrollTop: ($('header').offset()).top
            }, 1000);
            return false;
        });
        //Hide Payment Protection Options If Not Selected
        $(el.paymentProtection).change(function() {
            if ($(el.paymentProtection).val() == 'Yes') {
                $(el.protectionCoverage).show();
                $('form.auto').css("padding-bottom", "10px");
            } else {
                $(el.protectionCoverage).hide();
                $('form.auto').css("padding-bottom", "30px");
            }
        });
        //When there is new data in each of these fields, the calculate dividend
        let dividendEls = document.querySelectorAll(`${el.dividendPrincipal}, ${el.dividendPrincipal}, ${el.dividendTerm}`);
        for(let dividendEl of dividendEls){
          dividendEl.addEventListener('keyup',()=>{this.calculateDividend()})
        }
            this.calculateDividend();
        //on change, calculate the monthly payment
        let monthlyPaymentEls = document.querySelectorAll(`${el.startDate}, ${el.loanAmount}, ${el.interest}, ${el.termYears}, ${el.termMonths}, ${el.gap}, ${el.paymentProtection}, ${el.protectionCoverage}`);
        for(let monthlyPaymentEl of monthlyPaymentEls){
          monthlyPaymentEl.addEventListener('change',()=>{
            this.calculateMonthlyPayment();

          })
        }


        $(`${el.creditBalance}, ${el.creditRate}, ${el.creditMonthlyAmount}`).change(() => {
            setTimeout(this.creditCalc, 1000);
        });
        document.querySelector(el.resultsMore).addEventListener('click',()=>{
          this.showFullAmortizationSchedule();
        })
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
    setDefaultLoanValues(loanType, custom) {
        if (typeof custom === "object") {
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
    populateLoanValues(options) {
        $(this.elements.loanAmount).val(options.amount);
        $(this.elements.interestAmount).val(options.interest);
        $(this.elements.termMonths).val(options.termMonths);
    }

    populateCreditValues(options) {
        $(this.elements.creditBalance).val(options.balance);
        $(this.elements.creditRate).val(options.rate);
        $(this.elements.creditMonthlyAmount).val(options.monthlyAmount);
    }
    calculateDividend() {

        let dividend_principal = parseFloat($(this.elements.dividendPrincipal).val());
        let initial_deposit = parseFloat($(this.elements.dividendPrincipal).val());
        let dividend_rate = parseFloat(($(this.elements.dividendRate).val()) / 100) / 1;
        let dividend_term = parseInt($(this.elements.dividendTerm).val());
        let months = 0;
        let savings_arr = [initial_deposit];

        while (dividend_term > months) {
            months++;
            //dividend rate divided by 12, compounded monthly
            dividend_principal = (dividend_principal * Math.pow((1 + dividend_rate / 12), 1));
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
    calculateMonthlyPayment() {
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
        let loanamount = $(this.elements.loanAmount).val().replace(/,/g, "");
        let loan_amount = parseFloat(loanamount);

        if ($(this.elements.gap).val() == "Yes" && this.loanType == 'auto') {
            loan_amount = loan_amount + 375
        }

        let interest_rate = parseFloat($(this.elements.interest).val()) / 100;
        let monthly_interest_rate = interest_rate / 12;
        let length_of_mortgage = parseInt($(this.elements.termYears).val()) * 12;
        if (this.monthlyYearly == 'months') {
            length_of_mortgage = parseInt($(this.elements.termMonths).val());

        }else{
          length_of_mortgage = parseInt($(this.elements.termYears).val());
        }
        // begin the formula for calculate the fixed monthly payment
        // REFERENCE: P = L[c(1 + c)n]/[(1 + c)n - 1]
        let protection;

        let top_val = monthly_interest_rate * Math.pow((1 + monthly_interest_rate), length_of_mortgage);
        let bot_val = Math.pow((1 + monthly_interest_rate), (length_of_mortgage)) - 1;
        let monthly_mortgage = parseFloat(loan_amount * (top_val / bot_val)).toFixed(2);
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

        $(this.elements.total).html(`$${this.numberWithCommas(parseFloat(monthly_mortgage))}`);

        //if the payment is not a number (error in input), do not display the $NaN
        if (isNaN(monthly_mortgage)) {
            $(this.elements.total).css('opacity', '0');
        } else {
            $(this.elements.total).css('opacity', '1');
        }
    }
    calculateAmortization(loan_amount, monthly_mortgage, monthly_interest_rate, length_of_mortgage) {
        let month = parseInt($(this.elements.month).val());
        let year = parseInt($(this.elements.year).val());
        let tableData = "<tr> \
                  <th>Month</th> \
                  <th>Principal</th> \
                  <th>Interest</th> \
                  <th>Payment</th> \
                  <th>Balance</th> \
                  </tr>";
        // Initializing the empty totals
        let total_mortgage = parseFloat(0);
        let total_principal = parseFloat(0);
        let total_interest = parseFloat(0);
        let tablerow;
        console.log(length_of_mortgage);
        for (let i = length_of_mortgage; i > 0; i--) {

            let monthly_interest = parseFloat(loan_amount * monthly_interest_rate).toFixed(2);
            if (isNaN(monthly_interest)) {
                $(this.elements.resultsMore).css('opacity', '0');
                $(this.elements.resultsTable).css('display', 'none');
            } else {
                if ($(this.elements.resultsTable).css('display', 'none')) {
                    $(this.elements.resultsMore).css('opacity', '1');
                    $(this.elements.resultsMore).html(`<div class="btn" style="background-color:#a0b940">Show Amortization Schedule</div>`);
                }
            }
            let monthly_principal = parseFloat(monthly_mortgage - monthly_interest).toFixed(2);

            total_mortgage = parseFloat(total_mortgage) + parseFloat(monthly_mortgage);

            total_principal = parseFloat(total_principal) + parseFloat(monthly_principal);

            total_interest = parseFloat(total_interest) + parseFloat(monthly_interest);
            let monthStr = Kiosk.convertMonth(month);
            tablerow = "<tr> \
              <td>" + monthStr + " " + year + "</td> \
              <td class='principal'>" + monthly_principal + "</td> \
              <td class='interest'>" + monthly_interest + "</td> \
              <td>$" + (parseFloat(monthly_mortgage)).toFixed(2) + "</td> \
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
        $(`h2${this.elements.amortizationHeader}`).html('Amortization Schedule');
        let totalinterest = parseFloat(total_interest).toFixed(2);
        //show total interest, with commas
        $(this.elements.totalInterest).html('$' + this.numberWithCommas(totalinterest));
        //if the payment is not a number (error in input), do not display the $NaN
        if (isNaN(totalinterest)) {
            $(this.elements.totalInterest).css('opacity', '0');
        } else {
            $(this.elements.totalInterest).css('opacity', '1');
        }
        $(`table${this.elements.amortization}`).html(tableData);

        //Build the Highchart
        let principal_percent = (total_principal / total_mortgage) * 100;
        let interest_percent = (total_interest / total_mortgage) * 100;
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
                    payments: this.numberWithCommas(((principal_percent * total_mortgage) / 100).toFixed(2))
                }, {
                    name: "Interest",
                    y: interest_percent,
                    payments: this.numberWithCommas(((interest_percent * total_mortgage) / 100).toFixed(2))
                }]
            }]
        }); // End Highchart - Pie

    }
    calculateCredit() {
        let amountOwed = $(this.elements.creditBalance).val();
        let remainingBalance = $(this.elements.creditBalance).val();
        let monthlyRate = (creditRate.value / 100) / 12;
        let monthlyPayment = creditMonthlyAmount.value;
        let payments = 0;
        let months = 0;
        let interestPaid = 0;
        let minPayment = (amountOwed * .025).toFixed(2);
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
        $('#credit-interest').html('$' + this.numberWithCommas(interestPaid.toFixed(2)));
        $('#min-payment').html((amountOwed * .025).toFixed(2));

        //Build the Highchart
        let total_paid = interestPaid + amountOwed;
        let principal_percent = (amountOwed / total_paid) * 100;
        let interest_percent = (interestPaid / total_paid) * 100;
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
                    payments: this.numberWithCommas(((principal_percent * total_paid) / 100).toFixed(2))
                }, {
                    name: "Interest",
                    y: interest_percent,
                    payments: this.numberWithCommas(((interest_percent * total_paid) / 100).toFixed(2))
                }]
            }]
        }); // End Highchart - Pie */
    }
    showFullAmortizationSchedule() {
        $(this.elements.resultsMore).css('display', 'none');
        $(this.elements.resultsTable).css('display', 'initial');
        $(this.elements.resultsMore).css('opacity', '0');
        $('.content').animate({
            scrollTop: ($('.output').offset()).top
        }, 1000);
        var month = parseInt($(this.elements.month).val());
        Kiosk.convertMonth(month);
        var tickStart = 13 - month;
        var loanamount = $(this.elements.loanAmount).val().replace(/,/g, "");
        var loan_amount = parseFloat(loanamount);
        $(this.elements.columnChart).highcharts({
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
                    formatter: ()=>{
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
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }
    //colorsArray is an array of string hex colors.
    //fontFamily is comma-spearated string of fonts,
    //backgroundColor is a hex value or transparent
    setHighchartsOptions(colorsArray, fontFamily, backgroundColor) {
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

}
