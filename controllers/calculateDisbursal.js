const { default: axios } = require("axios");

const calculateDisbursal = (req,res)=>{
   const {
        borrowerinfo,loanrequest
    } = req.body;

    // const borrowerinfo = {
    //     sanction_amount: 1000,
    //     upfront_interest: 0
    //   };
    //   const loanrequest = {
    //     // processing_fees_amt: null,
    //     loan_tenure: 3,
    //     // processing_fees_perc: 2
    //   };

    let {sanction_amount} = borrowerinfo;
    let upfront_interest = borrowerinfo.upfront_interest || '0.0';
    let {processing_fees_amt,loan_tenure,processing_fees_perc} = loanrequest;
    if(!processing_fees_amt){
        if(!processing_fees_perc) {
            processing_fees_perc = 0;
            processing_fees_amt = 0;
        } else{
            processing_fees_perc = parseFloat(processing_fees_perc,10); 
            processing_fees_amt = (processing_fees_perc/100)*sanction_amount;
        }
    }
    let gst = parseInt(((18/ 100) * parseInt(processing_fees_amt))).toFixed(2);
    let total_charges = parseInt(parseInt(processing_fees_amt)+parseInt(gst)+parseInt(upfront_interest)).toFixed(2);
    let net_disburse_amt = parseInt(parseInt(sanction_amount)-parseInt(total_charges)).toFixed(2); 
    let input= {
        "principal":parseInt(sanction_amount),
        "period":parseInt(loan_tenure),
        "interest":parseInt(upfront_interest),
        "emi_day":5,
       }
       const disburseData = {net_disburse_amt:net_disburse_amt,gst:gst,total_charges:total_charges}
    //    if(input.interest==0.0){
           const data = {...disburseData};
           res.status(200).json({success:true,data:data})
    //    }else{
    //     const monthlyemi =  function(input,disburseData){
    //         return new Promise(function(resolve,reject){      
    //          axios.post("https://lmsutils-api.onrender.com/api/emi/monthlyemi",input)
    //             .then(function(resp){
    //                const data = {...disburseData,...resp.data.data};          
    //               res.status(200).json({success:true,data:data});
    //             })
    //             .catch(function(err){
    //                  reject();
    //             });
    //         });
    //     }
    //     monthlyemi(input,disburseData); 
    //    }
}



module.exports = calculateDisbursal;