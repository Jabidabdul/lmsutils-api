const { default: axios } = require("axios");


const calculateDisbursal = (req,res)=>{
   const {
        processing_fees_amt,
        loan_tenure,
        sanction_amount,
       upfront_interest
    } = req.body;
    var data = {};
if(!sanction_amount){
   let gst =(18/100)*(processing_fees/100) *sanction_amount; 
   let total_charges = processing_fees_amt+gst+upfront_interest;
   let net_disburse_amt = sanction_amount-total_charges; 
 res.status(200).json({success:true,data:{gst,total_charges,net_disburse_amt}});
}else{
    let gst = parseInt(((18/ 100) * processing_fees_amt)).toFixed(2);
    let total_charges = parseInt(processing_fees_amt+gst+upfront_interest).toFixed(2)
    let net_disburse_amt = parseInt(sanction_amount-total_charges).toFixed(2); 
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
               console.log(data);              
              res.status(200).json({success:true,data:data});
            })
            .catch(function(err){
                 reject();
            });
        });
    }
    monthlyemi(input,disburseData);
}
}


module.exports = calculateDisbursal;