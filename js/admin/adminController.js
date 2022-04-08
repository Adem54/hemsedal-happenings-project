
function choosePaymentType(id){
    model.data.paymentTypes=model.data.paymentTypes.map((payment,index)=> parseInt(payment.id)==id ? { id:payment.id, title:payment.title  ,isChecked:true } : { id:payment.id, title:payment.title  ,isChecked:false });
    model.inputs.adminPage.happening.paymentTypeId.name=id;
  }
  

  function getChecked(isChecked){
    return isChecked ? "checked" : "";
  }

function getHappeningStartDate(selectedDate){
  console.log("happening startDate",selectedDate.value)
    let startDateTime=selectedDate.value;
    let getDate=startDateTime.slice(0,10);
    let getTime=startDateTime.slice(11,16);
    model.inputs.adminPage.happening.happeningStartDate.name=getDate;
    model.inputs.adminPage.happening.happeningStartTime.name=getTime;
  
    }
    
    function getHappeningEndDate(selectedDate){
      let startDateTime=selectedDate.value;
      let getDate=startDateTime.slice(0,10);
      let getTime=startDateTime.slice(11,16);
      model.inputs.adminPage.happening.happeningEndDate.name=getDate;
      model.inputs.adminPage.happening.happeningEndTime.name=getTime;
      }

      
function getAnnouncementStartDate(selectedDate){
    let startDateTime=selectedDate.value;
    let getDate=startDateTime.slice(0,10);
    let getTime=startDateTime.slice(11,16);
    model.inputs.adminPage.happening.announcementStartDate.name=getDate;
    model.inputs.adminPage.happening.announcementStartTime.name=getTime;
   
    }
  
    function getAnnouncementEndDate(selectedDate){
      let startDateTime=selectedDate.value;
      let getDate=startDateTime.slice(0,10);
      let getTime=startDateTime.slice(11,16);
      model.inputs.adminPage.happening.announcementEndDate.name=getDate;
      model.inputs.adminPage.happening.announcementEndTime.name=getTime;
      }


       //VALIDATION FUNCTIONS
 
     function handleSubmit(event){
       event.preventDefault();
       model.inputs.adminPage.isSubmitted=true;
   if (!checkAllRequiredFields(model.inputs.adminPage.happening)){
      updateView();
          return;
        }else {
        addNewHappening(model.inputs.adminPage.happening);
        }
        updateView();
        }


function cleanInputFields(){

  let {happening}=model.inputs.adminPage;
 
happening.title={name:"",isFieldRequired:true,isValidate:false}
happening.description={name:"",isFieldRequired:false}
happening.imageUrl={name:"",isFieldRequired:false};
happening.categoryId={name:null, isFieldRequired:true,isValidate:false}
let paymentType=model.inputs.adminPage.happening.paymentTypeId;
if(paymentType.name){ 
  model.data.paymentTypes=model.data.paymentTypes.map(payment=>payment.id=paymentType.name ? {id:payment.id,title:payment.title,isChecked:false} : payment);
}
happening.paymentTypeId={name:null,isFieldRequired:true,isValidate:false};
happening.happeningStartDate={name:"",isFieldRequired:true,isValidate:false}
happening.happeningStartTime={name:"",isFieldRequired:true,isValidate:false}
happening.happeningEndDate={name:"",isFieldRequired:true,isValidate:false}
happening.happeningEndTime={name:"",isFieldRequired:true,isValidate:false}
happening.announcementStartDate={name:"",isFieldRequired:false}
happening.announcementStartTime={name:"",isFieldRequired:false}
happening.announcementEndDate={name:"",isFieldRequired:false}
happening.announcementEndTime={name:"",isFieldRequired:false}
happening.webSiteUrl={name:"",isFieldRequired:false}

}



function addNewHappening(){
   let id=findLastId(model.data.happenings)+1;
let newHappening={
    id,...getHappeningValues()
}
console.log("newHappening: ", newHappening);

addHappeningToStorage(newHappening);
model.data.happenings.push(newHappening);
}



function getHappeningValues(){
  let {happening}=model.inputs.adminPage;
  let eventKeys=Object.keys(happening);
  let eventValues=Object.values(happening);
  eventValues=eventValues.map(item=>item.name);
  let newEvent=Object.assign.apply({},eventKeys.map((value,index)=>({[value]:eventValues[index]})));
 
return newEvent;
}


function findLastId(happenings){
let lastId=happenings.reduce((acc,happening)=>acc>happening.id ? acc : happening.id,0);
return lastId;
}


function checkAllRequiredFields(happening){
     let happeningKeys=Object.keys(happening);
     let happeningValues=Object.values(happening);
     happeningValues=happeningValues.map(item=>item.isFieldRequired ? {...item,isValidate:checkInputValue(item.name,item.isValidate)}: item);
     happeningValuesRequiredFields=happeningValues.filter(item=>item.isFieldRequired);
     model.inputs.adminPage.happening =  Object.assign.apply({}, happeningKeys.map( (v, i) => ( {[v]: happeningValues[i]} ) ) );
     let allinputsCheckResult=happeningValuesRequiredFields.every((item)=>item.isFieldRequired && item.isValidate);
     return allinputsCheckResult;
    }
 
   

   function checkInputValue(inputValue,isValidate){
     if(inputValue=="" || inputValue==null){
       isValidate=false;
      }else {
        isValidate=true;
      }
      return isValidate;
      }
   
   
   function showValidationStyle(isValidate,errorClass,successClass){
     if(!isValidate){
       return errorClass;
     }else{
       return successClass;
     }
   }

 
   

   function showValidationMessage(isValidate,errorMessage){
     if(!isValidate){
       return  `<span class="errorValidationMessage">  ${errorMessage} </span>`;
     }else {
       
       return `<span class="icon-checkmark"></span>`;
     }

   }
   

   function alertHandle(){
    model.inputs.adminPage.isSubmitted=false;
    cleanInputFields();
    updateView();
  }
  
 

 