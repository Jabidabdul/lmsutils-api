
const calculateDues = (req,res)=>{
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
            const emiPerMonth = {total : 0 ,int_value : 0 ,principal_amount : 0 ,remaining_pricipal : tempPrincipal ,date: year,
            }
            emiPerMonth.date = months[(monthNumber++ >= 11) ? (monthNumber = 0) : monthNumber]
            emiPerMonth.total = parseFloat((emiAmount).toFixed(2));
            emiPerMonth.int_value = parseFloat((((emiPerMonth.remaining_pricipal) * (parseInt(interest)/100))/12).toFixed(2));
            emiPerMonth.principal_amount = parseFloat(((emiAmount)-(emiPerMonth.int_value)).toFixed(2));
            emiPerMonth.remaining_pricipal = parseFloat((emiPerMonth.remaining_pricipal - emiPerMonth.principal_amount).toFixed(2));
            tempPrincipal = parseFloat((emiPerMonth.remaining_pricipal)).toFixed(2);
            if(emiPerMonth.date === "01") year++;
            emiPerMonth.date = year+"-"+String(emiPerMonth.date)+"-"+String(emi_day);
        
            interestPay = parseFloat(interestPay.toFixed(2)) + emiPerMonth.int_value
            totalPay = parseFloat(totalPay + emiPerMonth.int_value + emiPerMonth.principal_amount);
            emiPerMonth.int_value = emiPerMonth.int_value.toString()+"A"
            tempArray.push(emiPerMonth)
        }
    }
    findEmiAmount(principal,interest,period);
    res.status(200).json({success:true,data:{principal:principal,loan_emi:loanEmi,total:parseFloat(totalPay.toFixed(3)),interest_pay:interestPay,dues:tempArray}});
}

module.exports = calculateDues;  