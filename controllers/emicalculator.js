
const monthlyemi = (req,res)=>{
    const {principal,period,interest,} =req.body;
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]
        let monthNumber = new Date().getMonth()-1;
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
            const emiPerMonth = {month : "" ,EMI : 0 ,Interest : 0 ,Principal : 0 ,
                BalanceDue : tempPrincipal
            }
            emiPerMonth.month = months[(monthNumber++ >= 11) ? (monthNumber = 0) : monthNumber]
            emiPerMonth.EMI = Math.round(emiAmount);
            emiPerMonth.Interest = Math.round(((emiPerMonth.BalanceDue) * (Number(interest)/100))/12);
            emiPerMonth.Principal = Math.round((Math.round(emiAmount))-(emiPerMonth.Interest));
            emiPerMonth.BalanceDue = Math.round(emiPerMonth.BalanceDue - emiPerMonth.Principal);
            tempPrincipal = emiPerMonth.BalanceDue;
            tempArray.push(emiPerMonth)
            interestPay = interestPay + emiPerMonth.Interest;
            totalPay = totalPay + emiPerMonth.Interest + emiPerMonth.Principal;
        }
    }
    findEmiAmount(principal,interest,period);
    res.status(200).json({success:true,data:{loanEmi:loanEmi,totalPay:totalPay,interestPay:interestPay,monthlyData:tempArray}});
}

module.exports = monthlyemi;  