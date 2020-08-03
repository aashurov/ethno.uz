<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
function oldSender() {
    var checkbox = document.getElementById('checkbox1').checked;
    if (checkbox) {
        document.getElementById("dvPinNo1").style.display = "unset";
        document.getElementById("dvPinNo2").style.display = "none";

    } else if (checkbox == false) {
        document.getElementById("dvPinNo1").style.display = "none";
        document.getElementById("dvPinNo2").style.display = "unset";
    }
}

function oldRecipient() {
    var checkbox = document.getElementById('checkbox2').checked;
    if (checkbox == true) {
        document.getElementById("dvPinNo3").style.display = "unset";
        document.getElementById("dvPinNo4").style.display = "none";

    } else if (checkbox == false) {
        document.getElementById("dvPinNo3").style.display = "none";
        document.getElementById("dvPinNo4").style.display = "unset";
    }
}

function sum() {
    var parcelWeight = parseFloat(document.getElementById('parcelWeight').value);
    var parcelLength = parseFloat(document.getElementById('parcelLength').value) * 0.01;
    var parcelWidth = parseFloat(document.getElementById('parcelWidth').value) * 0.01;
    var parcelHeight = parseFloat(document.getElementById('parcelHeight').value) * 0.01;
    var parcelPlan = parseFloat(document.getElementById('parcelPlan').value);

    var overallWeight = (parcelLength * parcelWidth * parcelHeight) * 163;
    var courierService = 0;
    var parcelDiscount = 0;
    var untilDoor = 0;
    if (autoSizingCheck3.checked == true) {
        courierService = 2;
    }
    if (parseFloat((document.getElementById('parcelDiscount').value).length) != 0) {
        parcelDiscount = document.getElementById('parcelDiscount').value / 100;
    }


    var pricePlan = 0;

    switch (parcelPlan) {
        case 1: {
            if (autoSizingCheck4.checked == true) {
                untilDoor = 6;
            }
            pricePlan = 6;
            if (overallWeight > parcelWeight) {
                var priceUS = (overallWeight - parcelWeight) * 1.5 + parcelWeight * pricePlan + courierService + untilDoor;
                priceUS = priceUS - (priceUS * parcelDiscount);
            } else {
                var priceUS = parcelWeight * pricePlan + courierService + untilDoor;
                priceUS = priceUS - (priceUS * parcelDiscount);

            }
            document.getElementById('parcelPriceUS').value = (priceUS);
            document.getElementById('parcelPriceRU').value = (priceUS * 62);
            document.getElementById('parcelPriceUZS').value = (priceUS * 9570);
            myDate(5);
            myDate2(10);


        }

        break;
    case 2:
        pricePlan = 10;
        if (autoSizingCheck4.checked == true) {
            untilDoor = 2;

        }
        if (overallWeight > parcelWeight) {
            var priceUS = (overallWeight - parcelWeight) * 1.5 + parcelWeight * pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);
        } else {
            var priceUS = parcelWeight * pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);

        }
        document.getElementById('parcelPriceUS').value = (priceUS).toLocaleString('en');
        document.getElementById('parcelPriceRU').value = (priceUS * 62).toLocaleString('en');
        document.getElementById('parcelPriceUZS').value = (priceUS * 9570).toLocaleString('en');
        myDate(3);
        myDate2(5);

        break;

    case 3:
        pricePlan = 11;
        if (autoSizingCheck4.checked == true) {
            untilDoor = 6;

        }
        if (overallWeight > parcelWeight) {
            var priceUS = (overallWeight - parcelWeight) * 1.5 + parcelWeight * pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);
        } else {
            var priceUS = parcelWeight * pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);

        }
        document.getElementById('parcelPriceUS').value = (priceUS).toLocaleString('en');
        document.getElementById('parcelPriceRU').value = (priceUS * 62).toLocaleString('en');
        document.getElementById('parcelPriceUZS').value = (priceUS * 9570).toLocaleString('en');
        myDate(3);
        myDate2(5);
        break;
    case 4:
        pricePlan = 30;
        if (overallWeight > parcelWeight) {
            var priceUS = (overallWeight - parcelWeight) * 1.5 + parcelWeight * pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);
        } else {
            var priceUS = parcelWeight * pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);

        }
        document.getElementById('parcelPriceUS').value = (priceUS).toLocaleString('en');
        document.getElementById('parcelPriceRU').value = (priceUS * 62).toLocaleString('en');
        document.getElementById('parcelPriceUZS').value = (priceUS * 9570).toLocaleString('en');
        myDate(1);
        myDate2(1, 5);

        break;
    case 5:
        pricePlan = 11; {
            var priceUS = pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);

            document.getElementById('parcelPriceUS').value = (priceUS);
            document.getElementById('parcelPriceRU').value = (priceUS * 62);
            document.getElementById('parcelPriceUZS').value = (priceUS * 9570);

            document.getElementById('parcelWeight').value = "0.5";
            document.getElementById('parcelLength').value = "0";
            document.getElementById('parcelWidth').value = "0";
            document.getElementById('parcelHeight').value = "0";
            myDate(10);
            myDate2(15);
        }
        break;
    case 6:
        pricePlan = 17; {
            var priceUS = pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);

            document.getElementById('parcelPriceUS').value = (priceUS);
            document.getElementById('parcelPriceRU').value = (priceUS * 62).toLocaleString('en');
            document.getElementById('parcelPriceUZS').value = (priceUS * 9570).toLocaleString('en');

            document.getElementById('parcelWeight').value = "0.5";
            document.getElementById('parcelLength').value = "0";
            document.getElementById('parcelWidth').value = "0";
            document.getElementById('parcelHeight').value = "0";
            myDate(3);
            myDate2(5);

        }
        break;
    case 7:
        pricePlan = 30; {
            var priceUS = pricePlan + courierService + untilDoor;
            priceUS = priceUS - (priceUS * parcelDiscount);

            document.getElementById('parcelPriceUS').value = (priceUS).toLocaleString('en');
            document.getElementById('parcelPriceRU').value = (priceUS * 62).toLocaleString('en');
            document.getElementById('parcelPriceUZS').value = (priceUS * 9570).toLocaleString('en');

            document.getElementById('parcelWeight').value = "0.5";
            document.getElementById('parcelLength').value = "0";
            document.getElementById('parcelWidth').value = "0";
            9570
            document.getElementById('parcelHeight').value = "0";
            myDate(1);
            myDate2(1, 5);

        }
        break;
    default:
        // alert( "Пожалуйста выберите тариф" );
    }



}

function MyFunction() {
    document.getElementById('parcelPriceUS').value = "";
    document.getElementById('parcelPriceRU').value = "";
    document.getElementById('parcelPriceUZS').value = "";
    document.getElementById('parcelPlan').value = "";
    document.getElementById('currentTime').innerHTML = '';
    document.getElementById('currentTime2').innerHTML = '';
    document.getElementById("timediv").style.display = "none";


}

function MyFunction1() {
    document.getElementById('parcelWeight').value = "";
    document.getElementById('parcelLength').value = "";
    document.getElementById('parcelWidth').value = "";
    document.getElementById('parcelHeight').value = "";
    document.getElementById('parcelPlan').value = "";


}

function priceCustomUS() {
    var priceCustom = parseFloat(document.getElementById('parcelPriceUS').value);

    document.getElementById('parcelPriceRU').value = (priceCustom * 62).toLocaleString('en');
    document.getElementById('parcelPriceUZS').value = (priceCustom * 9570).toLocaleString('en');
}

function priceCustomRU() {
    var priceCustom = parseFloat(document.getElementById('parcelPriceRU').value);

    document.getElementById('parcelPriceUS').value = (priceCustom / 62).toLocaleString('en');
    document.getElementById('parcelPriceUZS').value = ((priceCustom / 62) * 9570).toLocaleString('en');
}

function priceCustomUZS() {
    var priceCustom = parseFloat(document.getElementById('parcelPriceUZS').value);

    document.getElementById('parcelPriceUS').value = (priceCustom / 9570).toLocaleString('en');
    document.getElementById('parcelPriceRU').value = ((priceCustom / 9570) * 62).toLocaleString('en');
}

function myDate(daysToAddd) {
    var ttime = new Date();
    var startYear = ttime.getFullYear();
    var startMonth = ttime.getMonth();
    var startDay = ttime.getDate();
    var daysToAdd = daysToAddd;
    var sdate = new Date();
    var edate = new Date();
    var dayMilliseconds = 1000 * 60 * 60 * 24;
    sdate.setFullYear(startYear, startMonth, startDay);
    edate.setFullYear(startYear, startMonth, startDay + daysToAdd);
    var weekendDays = 0;
    while (sdate <= edate) {
        var day = sdate.getDay()
        if (day == 0 || day == 6) {
            weekendDays++;
        }
        sdate = new Date(+sdate + dayMilliseconds);
    }
    sdate.setFullYear(startYear, startMonth, startDay + weekendDays + daysToAdd);
    document.getElementById('currentTime').innerHTML = "Посылка прибудет примерно от <b>" + sdate.toLocaleDateString("ru-RU", {
        month: 'short',
        day: 'numeric'
    }, {
        timezone: "UTC"
    });
    document.getElementById("timediv").style.display = "unset";

    return sdate;
}

function myDate2(daysToAddd) {
    var ttime = new Date();
    var startYear = ttime.getFullYear();
    var startMonth = ttime.getMonth();
    var startDay = ttime.getDate();
    var daysToAdd = daysToAddd;
    var sdate = new Date();
    var edate = new Date();
    var dayMilliseconds = 1000 * 60 * 60 * 24;
    sdate.setFullYear(startYear, startMonth, startDay);
    edate.setFullYear(startYear, startMonth, startDay + daysToAdd);
    var weekendDays = 0;
    while (sdate <= edate) {
        var day = sdate.getDay()
        if (day == 0 || day == 6) {
            weekendDays++;
        }
        sdate = new Date(+sdate + dayMilliseconds);
    }
    sdate.setFullYear(startYear, startMonth, startDay + weekendDays + daysToAdd);
    console.log(sdate.toLocaleDateString("en", {
        timezone: "UTC"
    }));
    document.getElementById('currentTime2').innerHTML = "До <b>" + sdate.toLocaleDateString("ru-RU", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }, {
        timezone: "UTC"
    });
    document.getElementById("timediv").style.display = "unset";

    return sdate;
    //.toUTCString()
}
</script>
<!-- end Simple Custom CSS and JS -->
