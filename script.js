var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

let text1="This field is mandatory";
let text2="Please enter numbers only";


function validation(){
    let grossF=document.getElementById("gross").value;
    let extraF=document.getElementById("extra").value;
    let dedF=document.getElementById("deductions").value;
    let age=document.getElementById("age").value;
    checkForEmpty(grossF,extraF,dedF);

    let a,b,c;

    var numberPattern = /^\d+$/;
    a= numberPattern.test(grossF) ? 1: 0;
    b= numberPattern.test(extraF) ? 1: 0;
    c= numberPattern.test(dedF) ? 1: 0;

    document.getElementById("grossinfo").style.bottom= a ? "50000px" : "30px";
    document.getElementById("extrainfo").style.bottom= b ? "50000px" : "30px";
    document.getElementById("dedinfo").style.bottom= c ? "50000px" : "30px";
    document.getElementById("ageinfo").style.bottom= age !='none' ? "50000px" : "30px";

    document.getElementById("gross").style.border= a ? "1px solid #ccc" : "1px solid red";
    document.getElementById("extra").style.border= b ? "1px solid #ccc" : "1px solid red";
    document.getElementById("deductions").style.border= c ? "1px solid #ccc" : "1px solid red";
    document.getElementById("age").style.border= age !='none' ? "1px solid #ccc" : "1px solid red";

    if(a && b && c && age != 'none'){
        showPopup();
    }

}
function checkForEmpty(a,b,c){
    if(a=="") tooltipUpdate(text1,1);
    if(b=="") tooltipUpdate(text1,3);
    if(c=="") tooltipUpdate(text1,7);
}
function tooltipUpdate(text,number){
    tooltipList[number]._element.setAttribute('data-bs-original-title',text);
}

function showPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    calculation();
  }

function hidePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("form").reset();
}


function calculation(){
    let gross=parseInt(document.getElementById("gross").value);
    let extra=parseInt(document.getElementById("extra").value);
    let ded=parseInt(document.getElementById("deductions").value);
    let age=parseInt(document.getElementById("age").value);
    let overall= gross + extra - ded;
    let tax;
    
    if(overall <= 800000){
        console.log("NOO TAX")
        tax=0;
    }
    else{
        if(age== 1){
            tax= 0.3 * (overall - 800000 );  
        }
        else if(age == 2){
            tax= 0.4 * (overall - 800000 );
        }
        else {
            tax= 0.1 * (overall - 800000 );
        }
    }
    let actualIncome=overall-tax;

    let span = document.getElementById("tax");
    span.innerHTML = actualIncome.toLocaleString();
    
}

document.getElementById("clickMe").addEventListener("click",(event)=>{
    event.preventDefault();
});


document.getElementById("gross").addEventListener("click",()=>{
    document.getElementById("grossinfo").style.bottom= "50000px";
    document.getElementById("gross").style.border= "1px solid #ccc";
    tooltipUpdate(text2,1);
});
document.getElementById("extra").addEventListener("click",()=>{
    document.getElementById("extrainfo").style.bottom= "50000px";
    document.getElementById("extra").style.border= "1px solid #ccc";
    tooltipUpdate(text2,3);
});
document.getElementById("deductions").addEventListener("click",()=>{
    document.getElementById("dedinfo").style.bottom= "50000px";
    document.getElementById("deductions").style.border= "1px solid #ccc";
    tooltipUpdate(text2,7);
});
document.getElementById("age").addEventListener("click",()=>{
    document.getElementById("ageinfo").style.bottom= "50000px";
    document.getElementById("age").style.border= "1px solid #ccc";
});
