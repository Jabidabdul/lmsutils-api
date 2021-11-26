

const calculateDisbursal = (req,res)=>{
   const {
        processing_fees_amt,
        loan_tenure,
        sanction_amount,
       upfront_interest
    } = req.body;

// gs    res.send({sanctionAmount});
if(!sanction_amount){
   let  (processing_fees/100) * sanction_amount;
   let gst =(18/100)*(processing_fees/100) *sanction_amount; 
   let total_charges = processing_fees_amt+gst+upfront_interest;
   let net_disburse_amt = sanction_amount-total_charges; 
 res.status(200).json({gst,total_charges,net_disburse_amt});
}else{
    let gst = (18/ 100) * processing_fees_amt;
    let total_charges = processing_fees_amt+gst+upfront_interest;
    let net_disburse_amt = sanction_amount-total_charges; 
 res.status(200).json({gst,total_charges,net_disburse_amt});
}
 

}

module.exports = calculateDisbursal;