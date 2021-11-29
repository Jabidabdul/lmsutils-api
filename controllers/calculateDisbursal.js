const { default: axios } = require("axios");

const calculateDisbursal = (req,res)=>{
   const {
        processing_fees_amt,
        loan_tenure,
        sanction_amount,
        upfront_interest
    } = req.body;

    let gst = parseInt(((18/ 100) * parseInt(processing_fees_amt))).toFixed(2);
    let total_charges = parseInt(parseInt(processing_fees_amt)+parseInt(gst)+parseInt(upfront_interest)).toFixed(2);
    let net_disburse_amt = parseInt(parseInt(sanction_amount)-parseInt(total_charges)).toFixed(2); 
    let input= {
        "principal":sanction_amount,
        "period":loan_tenure,
        "interest":upfront_interest
       }
       const disburseData = {net_disburse_amt:net_disburse_amt,gst:gst,total_charges:total_charges}
       const monthlyemi =  function(input,disburseData){
        return new Promise(function(resolve,reject){      
         axios.post("https://lmsutils-api.onrender.com/api/emi/monthlyemi",input)
            .then(function(resp){
               const data = {...disburseData,...resp.data.data};          
              res.status(200).json({success:true,data:data});
            })
            .catch(function(err){
                 reject();
            });
        });
    }
    monthlyemi(input,disburseData);
}


module.exports = calculateDisbursal;