const { default: axios } = require("axios");
const { parse } = require("dotenv");
const moment = require('moment');


 const  loanrequest= {
    "id": 18979,
    "product_id": 345,
    "company_id": 214,
    "loan_schema_id": 366,
    "kudos_loan_id": "4582969788239",
    "kudos_borrower_id": "CHMPNKFIPJ",
    "partner_loan_id": "boskytest11",
    "partner_borrower_id": "boskytest",
    "first_name": "SUBHAM",
    "middle_name": null,
    "last_name": "NISHAD",
    "sector": null,
    "type_of_addr": null,
    "resi_addr_ln1": "1685 AVAS VIKAS NO 3 THANA KALYANPUR KANPUR KANPUR KANPUR NAGAR ",
    "resi_addr_ln2": null,
    "city": "KANPUR",
    "state": "UP",
    "pincode": 208017,
    "per_addr_ln1": "1685 AVAS VIKAS NO 3 THANA KALYANPUR KANPUR KANPUR KANPUR NAGAR ",
    "per_addr_ln2": null,
    "per_city": "pincodeToCity(per_pincode)",
    "per_state": "pincodeToState(per_pincode)",
    "per_pincode": 208017,
    "appl_phone": "7376235906",
    "appl_pan": "CHMPN3771J",
    "email_id": "shubhamnishad@paisabazaar.com",
    "aadhar_card_num": "********4003",
    "dob": "1999-03-02",
    "ebill_num": null,
    "gender": "M",
    "photo_id_type": null,
    "photo_id_num": null,
    "addr_id_type": null,
    "addr_id_num": "",
    "no_year_current_addr": null,
    "total_experience": null,
    "cibil_score_borro": "657",
    "purpose_of_loan": "general loan",
    "annual_income_borro": null,
    "borro_bank_name": "HDFC Bank, India",
    "borro_bank_branch": null,
    "borro_bank_acc_num": "50100370907870",
    "borro_bank_ifsc": "HDFC0009596",
    "sanction_status": null,
    "sanction_date": null,
    "applied_amount": "30000",
    "int_rate_flat_perc": null,
    "int_rate_reducing_perc": null,
    "int_type": "reducing",
    "loan_tenure": 6,
    "emi_amt": "5446",
    "processing_fees_perc": null,
    "passport": null,
    "disburse_amt": null,
    "processing_fees_amt": "1500",
    "vpa_address": null,
    "va_num": null,
    "conv_fees": null,
    "loan_int_rate": "30",
    "borro_salary": null,
    "kudos_processing_fees": null,
    "loan_int_amt": null,
    "loan_status": null,
    "loan_coupon": null,
    "repayment_amt_status": null,
    "partner_system_score": null,
    "kudos_int_rate": "17",
    "dpd_rate": "00R",
    "ABB": null,
    "current_state_name": null,
    "per_state_name": null,
    "created_at": "2021-12-01T13:11:41.000Z"
  }
  const borrowerinfo =  {
    "partner_loan_id": "boskytest11",
    "partner_borrower_id": "boskytest",
    "kudos_loan_id": 4582969788239,
    "kudos_borrower_id": "CHMPNKFIPJ",
    "repayment_type": "monthly",
    "loan_app_date": "2021-11-29",
    "employer_name": "unknown",
    "job_type": "employed",
    "foir": "1000",
    "bureau_name": "experian",
    "monthly_income_of_the_borro": "10000",
    "interest_rate": "25",
    "age": 22,
    "sanction_amount": "30000",
    "emi_day": "5",
    "disb": "=calculateDisbursal(loanrequest, borrowerinfo)",
    "upfront_interest": "=disb.upfront_interest",
    "total_charges": "=disb.total_charges",
    "net_disbur_amt": "=disb.net_disburse_amt",
    "cgst_on_pf_amt": "=18% * loanrequest.processing_fees_amt",
    "first_inst_date": "=1 < 2 ? '2000-01-02': '2020-02-02'"
  }

const calculateDisbursal = (req,res)=>{
  //  const {
  //       borrowerinfo,loanrequest
  //   } = req.body;

    var {sanction_amount,loan_app_date,interest_rate} = borrowerinfo;
    interest_rate = parseFloat(interest_rate || loanrequest.loan_int_rate,10);
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
  const currEmiDate = `${curryear}-${currmonth}-05`
  const next = moment(currEmiDate).add(2, 'M').format("YYYY-MM-DD");
console.log(next);

    let pf = (processing_fees_perc/100)*sanction_amount;
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