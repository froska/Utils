
var investA = $("#investmentAmount").val(5000);
// var investY = $("#investmentAmountSIP").val(15);
var investY = $("#investmentYears").val(25);


function animateGraph(time) {
    var path1 = 522.957;
    var path2 = 572.872;
    $("#path1").css({ "stroke-dashoffset": path1 });
    $("#path2").css({ "stroke-dashoffset": path2 });

    setTimeout(function () {
        $("#path1").show();
        $("#path2").show();
    }, 500);
    setTimeout(function () {
        $("#path1").css({ "stroke-dashoffset": 0 });
        $("#path2").css({ "stroke-dashoffset": 0 });
        setTimeout(function () {
            $('.mf-circles').fadeIn(1400);
            $('.funds_label').show();

        }, 1400);
    }, time);

}

function FV(PMT, IR, NP, Yearly) {
    IR = IR / 100;
    if (!Yearly) {
        IR = IR / 12;
        NP = NP;
    }
    FV1 = PMT * (Math.pow(1 + IR, NP) - 1) / IR;
    return parseInt(FV1);
}

function FV_for_lumsum(PMT, IR, NP) {
    FV_lumsum = parseInt((PMT * Math.pow((1 + (IR / 100)), (NP))) - PMT);
    return FV_lumsum;
}
var first = 0;
function CalCommission() {

    $('.mf-circles').hide();
    $('.funds_label').hide();
    
    $("#path1").hide();
    $("#path2").hide();

    var path1 = 522.957;
    var path2 = 572.872;
    $("#path1").css({ "stroke-dashoffset": path1 });
    $("#path2").css({ "stroke-dashoffset": path2 });

    //alert("cla test");
    var investA = $("#investmentAmount").val();
    
    var investSIP = $("#investmentAmountSIP").val();
    var investY = $("#investmentYears").val();
    // var investY = $($("#investmentYears")[0]).attr("aria-valuenow");
    if (investY == 'undefined' || investY == 0) {
        investY = 1;
    }
    $("#years_selected").text(investY+' Year'+(investY>2?'s':''));
    var returnL;
    var IRDirect = $("#investmentAmountSIP").val();
    var IRRegular = $("#investmentAmountSIP").val()-1;
    //var calValueA12;
    //var calValueA13;
    //var calValueS12;
    //var calValueS13;
    //var calValueL;
    //var calValueS;
    var calcInterest;

    if (investA > 0) {

        calcInterest=calculateInvestment(parseFloat(investA),parseFloat(investSIP),parseFloat(investY));
        // console.log('investY',(investY),'investA',(investA),'investSIP',(investSIP),calcInterest);

        calValueA12 = calculateCompoundInterest(investA, investY, IRDirect);
        // console.log("Direct Lumsum: "+calValueA12 );
        calValueA13 = calculateCompoundInterest(investA, investY, IRRegular);
       // console.log("Regular Lumsum: "+calValueA13);
        // return;
        // calValueA12 = (parseInt((investA * Math.pow((1 + (12 / 100)), (investY))) - investA));
        // calValueA13 = (parseInt((investA * Math.pow((1 + (13 / 100)), (investY))) - investA));
    }
    else {
        calValueA12 = 0;
        calValueA13 = 0;
    }
    // if (investSIP > 0) {
    //     InvestmentYears = investY;
    //     InvestmentMonth = InvestmentYears * 12;
    //     NP = InvestmentMonth + 1; // add one for the first month
    //     calValueS12 = FV(investSIP, IRDirect, NP, false);
    //
    //
    //     calValueS13 = FV(investSIP, IRRegular, NP, false);
    //
    //
    //     // calValueS12 = (parseInt((investSIP * ((Math.pow((1 + (12 / 100)), investY)) - 1)) / (12 / 100)));
    //     // calValueS13 = (parseInt((investSIP * ((Math.pow((1 + (13 / 100)), investY)) - 1)) / (13 / 100)));
    // }
    // else {
    //     calValueS12 = 0;
    //     calValueS13 = 0;
    // }

    // calValueL = calValueA12 - calValueA13 ;
    // calValueS = calValueS12 - calValueS13 ;

    var calDirect = calcInterest.totalInvestment;
    var calregular = calcInterest.totalSubscription;

    var calDiffSL = calcInterest.totalInterest;
    returnL = "NGN " + numberWithCommas((calDiffSL).toFixed(2));
    $("#returnAmount").text(returnL);
    var lenL = calDiffSL.toFixed(0).toString().length;
    // console.log('calDiffSL',calDiffSL,'calDirect',calDirect,'calregular',calregular,lenL)
    // if (lenL < 4) {
    // //    //var returnL = "Rs. " + Math.round(calValueL / 1000) /100 + " K";
    //     returnL = "NGN " + (calDiffSL).toFixed(2);
    //     $("#returnAmount").text(returnL);
    // }
    // else if (lenL == 4 || lenL == 5) {
    //     //    //var returnL = "Rs. " + Math.round(calValueL / 1000) /100 + " K";
    //     // returnL = "NGN " + (calDiffSL / 1000).toFixed(2) + " K";
    //     returnL = "NGN " + (calDiffSL / 1000).toFixed(2) + " K";
    //     $("#returnAmount").text(returnL);
    // }
    // else{
    //     returnL = "NGN " + (calDiffSL / 100000).toFixed(2) + " M";
    //     $("#returnAmount").text(returnL);
    // }
    // console.log(returnL);
    $("#regularFund").html("NGN " + changeValueToString(calregular));
    $("#directFund").html("NGN " + changeValueToString(calDirect));
    animateGraph(700);
    if (first == 1) {
        if (window.innerWidth < 640) {
            $('html, body').animate({
                scrollTop: $("#clac-price-box").offset().top
            }, 2000);
        }
        
    }
    first = 1; // for the second time function call
    
}
function calculateInvestment(subscription, rate, tenure){
    var tenureMonth = tenure*12;//Divide tenure (in years) by 12 to get months
 var totalInvestment = 0;
 var interest;
 var totalInterest = 0;
 var totalSubscription = 0;
    rate /= tenureMonth;

    for(var i = 0; i < tenureMonth; i++) {
        totalInvestment += subscription;
        interest = (rate/100) * totalInvestment;
        totalInvestment += interest;
        totalInterest += interest;
        totalSubscription += subscription;
        // console.log(i,'MSubscription',totalSubscription,'MInvestment',totalInvestment,'Minterest',interest,'\n');
    }

    return { 'totalSubscription':totalSubscription, 'totalInterest':totalInterest, 'totalInvestment':totalInvestment };
}

function changeValueToString(value) {
    
    // value = value.toFixed(2);
    return ('<i class="fa fa-inr"></i>' + numberWithCommas(value.toFixed(2)));
    // if (value.toString().length >= 4 && value.toString().length <= 6) {
    //     var returnString =  ('<i class="fa fa-inr"></i>' + (value / 1000).toFixed(2) + " K");
    // } else if (value.toString().length >= 7 && value.toString().length <= 9) {
    //     var returnString = ('<i class="fa fa-inr"></i>' + (value / 1000000).toFixed(2) + " M");
    // } else if (value.toString().length >= 10 && value.toString().length <= 12) {
    //     var returnString = ('<i class="fa fa-inr"></i>' + (value / 1000000000).toFixed(2) + " B");
    // }
    // return returnString;
}
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
// alert(calculateCompondInterest(100000,  25 , 15));

// exact  153665 // 15 // 
// 32435296.1504077  // 32850737.352287784
// 39130438.97995285 // 39662178.16635222

// alert(calculateCompondInterest(10000, 25 , 1.25));
function calculateCompoundInterest(P , Years , rate_of_interest) {
    ROI = rate_of_interest / 100;
    
    CI = (P * ( Math.pow((1 + ROI) , (Years))));
    return parseInt(CI);
}