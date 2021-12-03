
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
        const actutalInterest = Number(interest)/12/100;
        const totalInterest = Math.pow((1 + actutalInterest), month ? Number(period) : (Number(period)*12));
        const totalPrincipalAmount = Number(principal) * actutalInterest;
        const tempInterest = totalInterest - 1;
        const emiAmount = totalPrincipalAmount * (totalInterest/tempInterest);
        loanEmi = Math.round(emiAmount)
        const tempPeriod = month ? Number(period) : (Number(period)*12)
        let tempPrincipal = Number(principal)
        for(let i=0; i<tempPeriod; i++){
            const emiPerMonth = {total : 0 ,interest : 0 ,principal : 0 ,remaining_principle : tempPrincipal ,date: year,
            }
            emiPerMonth.date = months[(monthNumber++ >= 11) ? (monthNumber = 0) : monthNumber]
            emiPerMonth.total = Math.round(emiAmount);
            emiPerMonth.interest = Math.round(((emiPerMonth.remaining_principle) * (Number(interest)/100))/12);
            emiPerMonth.principal = Math.round((Math.round(emiAmount))-(emiPerMonth.interest));
            emiPerMonth.remaining_principle = Math.round(emiPerMonth.remaining_principle - emiPerMonth.principal);
            tempPrincipal = emiPerMonth.remaining_principle;
            if(emiPerMonth.date === "01") year++;
            emiPerMonth.date = year+"-"+String(emiPerMonth.date)+"-"+String(emi_day);
            tempArray.push(emiPerMonth)
            interestPay = interestPay + emiPerMonth.interest;
            totalPay = totalPay + emiPerMonth.interest + emiPerMonth.principal;
        }
    }
    findEmiAmount(principal,interest,period);
    res.status(200).json({success:true,data:{loan_emi:loanEmi,total:totalPay,interest_pay:interestPay,emi_monthly:tempArray}});
}

module.exports = monthlyemi;  