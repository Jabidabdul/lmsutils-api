const { default: axios } = require("axios");
const { parse } = require("dotenv");
const moment = require('moment');




const calculateDisbursal = (req,res)=>{
   const {
        borrowerinfo,loanrequest
    } = req.body;

    var {sanction_amount,loan_app_date} = borrowerinfo;
   var  interest_rate = parseFloat(interest_rate || loanrequest.loan_int_rate,10);
    // var upfront_interest = borrowerinfo.upfront_interest;
    let {processing_fees_amt,loan_tenure,processing_fees_perc} = loanrequest;
    var upfront_interest = 0;
        var today = new Date();
        var loan_day = loan_app_date.substring(8, 10);
        var daysdiff = 0;

        var next ="";
        if(parseInt(loan_day)>=1 && parseInt(loan_day)<=5){
            daysdiff = 5-parseInt(loan_day);
            const currmonth =  moment().month();
            const curryear = moment().year();
            const currEmiDate = `${curryear}-${currmonth}-05`
            next = moment(currEmiDate).add(2, 'M').format("YYYY-MM-DD");
        }else{
             daysdiff =30-parseInt(loan_day)+5;
             const currmonth =  moment().month();
             const curryear = moment().year();
             const currEmiDate = `${curryear}-${currmonth}-05`
             next = moment(currEmiDate).add(3, 'M').format("YYYY-MM-DD");
             console.log("inside else",daysdiff);
        }

      console.log(daysdiff);
        let interestr = interest_rate/100;
        console.log(interestr);
        upfront_interest = parseFloat((daysdiff/365)*interestr*parseInt(sanction_amount),10).toFixed(2);
        var pf =0;
    if(!processing_fees_perc){
        if(!processing_fees_amt) {
            processing_fees_perc = 0;
            processing_fees_amt = 0;
        } else{
           pf = parseFloat(processing_fees_amt).toFixed(2);
        }
    }else{
      pf = parseFloat((processing_fees_perc/100)*sanction_amount);
    }
  

  console.log(sanction_amount,daysdiff,upfront_interest);
    let gst = parseInt(((18/ 100) * parseInt(pf))).toFixed(2);
    let total_charges = parseInt(parseInt(processing_fees_amt)+parseInt(gst)+parseInt(upfront_interest)).toFixed(2);
    // let net_disburse_amt = parseInt(parseInt(sanction_amount)-parseInt(total_charges)).toFixed(2); 
    let net_disburse_amt = (parseInt(sanction_amount)-pf-gst-upfront_interest).toFixed(2);
         const disburseData = {net_disburse_amt:net_disburse_amt,gst_on_pf:gst,total_charges:total_charges,pf:pf,upfront_interest,first_inst_date:next}
           const data = {...disburseData};      
           console.log(req.url, JSON.stringify(req.body,null,2));
           res.status(200).json({success:true,data:data})
}

module.exports = calculateDisbursal;