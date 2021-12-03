
const monthlyemi = (req,res)=>{
    const {principal,period,interest,emi_day="01"} =req.body;
    const months = ["01", "02", "03", "04", "05", "06",
        "7", "08", "09", "10", "11", "12"]
        let monthNumber = new Date().getMonth()-1;
        let year = new Date().getFullYear();
    const tempArray = [];
    let interestPay = 0;
    let totalPay = 0;
    let loanEmi = 0;
    const findEmiAmount=(principal, interest, period)=>{
        const month = true;
        const actutalInterest = parseFloat(interest)/12/100;
        const totalInterest = parseFloat(Math.pow((1 + actutalInterest), month ? parseInt(period) : (parseInt(period)*12)));
        const totalPrincipalAmount = parseInt(principal) * actutalInterest;
        const tempInterest = totalInterest - 1;
        const emiAmount = parseFloat(totalPrincipalAmount * (totalInterest/tempInterest));
        loanEmi = parseFloat(emiAmount.toFixed(2));
        const tempPeriod = month ? parseInt(period) : (parseInt(period)*12)
        let tempPrincipal = parseInt(principal)
        for(let i=0; i<tempPeriod; i++){
            const emiPerMonth = {total : 0 ,interest : 0 ,principal : 0 ,remaining_principle : tempPrincipal ,date: year,
            }
            emiPerMonth.date = months[(monthNumber++ >= 11) ? (monthNumber = 0) : monthNumber]
            emiPerMonth.total = parseFloat((emiAmount).toFixed(2));
            emiPerMonth.interest = parseFloat((((emiPerMonth.remaining_principle) * (parseInt(interest)/100))/12).toFixed(2));
            emiPerMonth.principal = parseFloat(((emiAmount)-(emiPerMonth.interest)).toFixed(2));
            emiPerMonth.remaining_principle = parseFloat((emiPerMonth.remaining_principle - emiPerMonth.principal).toFixed(2));
            tempPrincipal = parseFloat((emiPerMonth.remaining_principle)).toFixed(2);
            if(emiPerMonth.date === "01") year++;
            emiPerMonth.date = year+"-"+String(emiPerMonth.date)+"-"+String(emi_day);
            tempArray.push(emiPerMonth)
            interestPay = parseFloat(interestPay.toFixed(2)) + emiPerMonth.interest;
            totalPay = parseFloat(totalPay + emiPerMonth.interest + emiPerMonth.principal);
        }
    }
    findEmiAmount(principal,interest,period);
    res.status(200).json({success:true,data:{principal:principal,loan_emi:loanEmi,total:totalPay,interest_pay:interestPay,emi_monthly:tempArray}});
}

module.exports = monthlyemi;  