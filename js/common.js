//Her skal vi lage funskjoner som er felles eller hjelpefunkson




function getHappeningsFromStorage(){
    let happenings;
    if(localStorage.getItem("happenings")==null){
      happenings=[];
    }else {
      happenings=JSON.parse(localStorage.getItem("happenings"));
    }
    return happenings;
  }
  
  console.log("happenings: ", getHappeningsFromStorage())
  
  function addHappeningToStorage(newHappening){
  let happenings=getHappeningsFromStorage();
  happenings.push(newHappening);
  localStorage.setItem("happenings",JSON.stringify(happenings));
  
  }
