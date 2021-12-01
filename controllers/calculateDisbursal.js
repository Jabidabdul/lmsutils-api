const { default: axios } = require("axios");
const { parse } = require("dotenv");
const moment = require('moment');


const calculateDisbursal = (req,res)=>{
   const {
        borrowerinfo,loanrequest
    } = req.body;

    var {sanction_amount,loan_app_date,interest_rate} = borrowerinfo;
    // var upfront_interest = borrowerinfo.upfront_interest;
    let {processing_fees_amt,loan_tenure,processing_fees_perc} = loanrequest;
    var upfront_interest = 0;

        upfront_interest =0;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var loan_day = loan_app_date.substring(8, 10);
        var daysdiff = 0;
        if(dd>=1 &&dd<=5){
            daysdiff = 5-dd;
        }else{
             daysdiff =parseInt(dd)-parseInt(loan_day)+5;
        }

        let interestr = interest_rate/100;
        upfront_interest = parseFloat((daysdiff/365)*interestr*parseInt(sanction_amount),10).toFixed(2);
        console.log(upfront_interest,daysdiff);
    
    if(!processing_fees_amt){
        if(!processing_fees_perc) {
            processing_fees_perc = 0;
            processing_fees_amt = 0;
        } else{
            processing_fees_perc = parseFloat(processing_fees_perc,10); 
            processing_fees_amt = (processing_fees_perc/100)*sanction_amount;
        }
    }


  const currmonth =  moment().month();
  const curryear = moment().year();
   console.log(currmonth,curryear)
  const currEmiDate = `${curryear}-${currmonth}-05`
  console.log(currEmiDate);
  const next = moment(currEmiDate).add(1, 'M');
  console.log(next);


    let pf = (processing_fees_perc/100)*sanction_amount;
    let gst = parseInt(((18/ 100) * parseInt(pf))).toFixed(2);
    let total_charges = parseInt(parseInt(processing_fees_amt)+parseInt(gst)+parseInt(upfront_interest)).toFixed(2);
    // let net_disburse_amt = parseInt(parseInt(sanction_amount)-parseInt(total_charges)).toFixed(2); 
    let net_disburse_amt = (parseInt(sanction_amount)-pf-gst-upfront_interest).toFixed(2);
         const disburseData = {net_disburse_amt:net_disburse_amt,gst_on_pf:gst,total_charges:total_charges,pf:pf,upfront_interest}
           const data = {...disburseData};      
           console.log(req.url, JSON.stringify(req.body,null,2));
           res.status(200).json({success:true,data:data})
}

module.exports = calculateDisbursal;