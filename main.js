


//! Use to collect the value from the range /////////////////////////////////

document.querySelector("#range1").addEventListener('input' , function(){
    rangeValue1 = document.querySelector("#range1").value;
    document.querySelector("#selectedValue1").value = rangeValue1;
}
)

document.querySelector("#range2").addEventListener('input' , function(){
    rangeValue2 = document.querySelector("#range2").value;
    document.querySelector("#selectedValue2").value = rangeValue2;
}
)

document.querySelector("#range3").addEventListener('input' , function(){
    rangeValue3 = document.querySelector("#range3").value;
    document.querySelector("#selectedValue3").value = rangeValue3;
}
)

function increasePrice(myvar)
{
    rangeValue1 = parseInt(document.querySelector("#range1").value);
    rangeValue1 += 1000000;
    document.querySelector("#range1").value = rangeValue1;
    document.querySelector("#selectedValue1").value = rangeValue1;
}

//! /////////////////////////////////////////////////////////////////////////




//? /////////////////////////////////////////////////////////////////////////



function refresh()
{

    document.querySelector("#tableDIV").innerHTML = "";   //? This the innerHTML is use to remove the div instead of the style display to none
    document.querySelector("#selectedValue1").value = 0;
    document.querySelector("#selectedValue2").value = 0;
    document.querySelector("#selectedValue3").value = 0;
    document.querySelector("#range1").value = 0;
    document.querySelector("#range2").value = 0;
    document.querySelector("#range3").value = 0;
    return 0;
}


//? /////////////////////////////////////////////////////////////////////////


            

//TODO Main Calculation part of the code //////////////////////////////////////////

function calculateEMI(myvar) 
{
    document.querySelector("#tableDIV").style.display = "block";

    let loanAmount = parseFloat(document.querySelector("#selectedValue1").value);
    let years = parseFloat(document.querySelector("#selectedValue2").value);
    let annualInterestRate = parseFloat(document.querySelector("#selectedValue3").value) / 100;

    if((!loanAmount || loanAmount == 0) && !annualInterestRate && !years)
    {
        alert("Enter the Amount , Interest Rate and Years");
        return 0;

    }
    else if((!loanAmount || loanAmount == 0) && !years)
    {
        alert("Enter the Amount and years");
        return 0;

    }
    else if(!annualInterestRate && (!loanAmount || loanAmount == 0))
    {
        alert("Enter the Amount and interest rate");
        return 0;

    }
    else if(!annualInterestRate && !years)
    {
        alert("Enter the Interest rate and years");
        return 0;

    }
    else if((!loanAmount || loanAmount == 0))
    {
        alert("Enter the Amount");
        return 0;

    }
    else if(!years)
    {
        alert("Enter the years");
        return 0;

    }
    else if(!annualInterestRate)
    {
        alert("Enter the Interest Rate");
        return 0;

    }
    else
    {
        document.querySelector("#range1").value = loanAmount;
        document.querySelector("#range2").value = years;
        document.querySelector("#range3").value = Math.floor(parseFloat(document.querySelector("#selectedValue3").value));

        // Main Variables
        let openingBalance = loanAmount;
        let EMIx12 = (loanAmount * annualInterestRate * Math.pow((1 + annualInterestRate), years)) / (Math.pow((1 + annualInterestRate), years) - 1);
        let interestPaidYearly, principalPaidYearly, closingBalance;
        console.log(EMIx12);
        let str = '';

        // Display table header
        str = str + ` <div class="tableDivRow">
            <div class="tableDIVAttribute" style="width:70px;background-color:darkblue; border-top-lechrome 
            ft-radius:20px;">Year</div>
            <div class="tableDIVAttribute" >Opening Balance</div>
            <div class="tableDIVAttribute" >EMI * 12</div>
            <div class="tableDIVAttribute" >Interest Paid Yearly</div>
            <div class="tableDIVAttribute" >Principal Paid Yearly</div>
            <div class="tableDIVAttribute" style="border-top-right-radius:20px"; >Closing Balance</div>
            </div>`;

            for (let i = 1; i <= years; i++) 
            {
                interestPaidYearly = openingBalance * annualInterestRate;
                principalPaidYearly = EMIx12 - interestPaidYearly;
                closingBalance = openingBalance - principalPaidYearly;

                str = str + `
                <div class="tableDivRow">
                <div class="tableDIV" style="width:70px;">${i}</div>
                <div class="tableDIV">${openingBalance.toFixed(0)}</div>
                <div class="tableDIV">${EMIx12.toFixed(0)}</div>
                <div class="tableDIV">${interestPaidYearly.toFixed(0)}</div>
                <div class="tableDIV">${principalPaidYearly.toFixed(0)}</div>
                <div class="tableDIV">${closingBalance.toFixed(0)}</div>
                </div>`;

                openingBalance = closingBalance;
            }

        // Display results in the tableDIV element
        document.querySelector("#tableDIV").innerHTML = str;

        document.querySelector("#selectedValue1").value = 0;
        document.querySelector("#selectedValue3").value = 0;
        document.querySelector("#selectedValue2").value = 0;
    }
}


//TODO /////////////////////////////////////////////////////////////////////////////////////