function updateUserView() {
  
  document.getElementById("app").innerHTML = `  
<div  onclick="closetoggleCategoryBox(event)" >
    ${createHeaderTopHtml()}
    ${createEkstraPaidSlider()}
    ${createSearchHappeningBar()}
    ${
      model.inputs.userPage.isCategoryBtnClicked
        ? createMultipleChoiceCategory()
        : ""
    }
    ${createFilterButtons()}
    ${createHappeningList()}
</div>
  `;
 
}

function createMobilMenu(){
  return `
    <a class="nav-mobil-icon" onclick="showMobilMenu()">
    ${model.inputs.userPage.isMobilToggleMenu ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>'}
     
    </a> 
  `;
}
function createHeaderTopHtml() {
  let headerTop = ``;
  headerTop += `
<header class="fullscreen-header">
    <nav class="nav nav-top">
      <figure class="nav__list ">
        <a href="" class="nav__list-item"> Hemsedal-logo</a>
      </figure>
      <ul class="nav__list nav-menu
      ${model.inputs.userPage.isMobilToggleMenu ? 'responsive' : ''}
      ">
        <li><a class="nav__list-item" href="">Hjem</a></li>
        <li>
          <a href="#" class="nav__list-item create-happening-btn " 
          onclick="model.app.page='admin'; updateView()"
          >
            <span class="icon-plus"> </span>
            <span>Oprett ny happening</span></a>
        </li>
        <li>
          <a class="nav__list-item" href="">Logg in</a>
        </li>
      </ul>
      ${createMobilMenu()}
    </nav>    
    <h1 class="header__title">HVA SKJER I HEMSEDAL!</h1>
</header> 
    `;
  return headerTop;
}


function createEkstraPaidSlider() {
  let ekstraPaidSlider = ``;
  ekstraPaidSlider += `
    <div class="slider-title main-title">
    <h1>Ekstrabetalte Aktiviteter</h1>
    </div>
    <section class="happenings">
    <section class="slider-container extraPaid-container">
    ${createReadMoreModal()}
    `;
    let result=getHappeningsFromStorage().sort((a,b)=>{
      return new Date(a.happeningStartDate)-new Date(b.happeningStartDate)
    });
  let item = ``;
  let extraPaidHappenings = getHappeningByPaymentType(result, 3);
  for (let i = 0; i < extraPaidHappenings.length; i++) {
    let extraPaidHappening = extraPaidHappenings[i];
    let category = getCategoryById(
      model.inputs.userPage.categories,
      extraPaidHappening.categoryId
    );
    let categoryTitleInEnglish = translateCategoryTitleToEnglish(
      category.title
    );
    let startDate = extraPaidHappening.happeningStartDate;
    let endDate = extraPaidHappening.happeningEndDate;
    let startTime = extraPaidHappening.happeningStartTime;
    let endTime = extraPaidHappening.happeningEndTime;
    let startDateAllFormats = getMyAllDateFormats(startDate);
    let endDateAllFormats = getMyAllDateFormats(endDate);
    item += `

<div 
id="${extraPaidHappening.id}"
class="cart-container">
  <div class="cart-image"
  style="
  background-image: url(
    ${
      extraPaidHappening.imageUrl ||
      `https://source.unsplash.com/random/?${categoryTitleInEnglish}`
    }
  )
  "
  >
<div class="announcement-icon icon-container">
<i class="fa-solid fa-bullhorn"></i>
</div>
<div class="category-icon icon-container">
  <span class="${category.icon}"></span>
</div>
</div>



<div class="cart-calender">
  <div class="cart-calender-date">
    <span class="cart-calender-day">${startDateAllFormats.day}</span>
    <span class="cart-calender-month"> ${startDateAllFormats.monthByShortText.toUpperCase()}</span>
  </div>

<div class="cart-calender-content">

<h3>${extraPaidHappening.title}</h3>

<div>

<div class="cart-calender-text">
  <i class="fa-solid calender-icon fa-calendar-days"></i>
  <span class="cart-calender-wholeDate"
    >${startDateAllFormats.monthByLongText} ${
      startDateAllFormats.dayByOneDigit
    }, ${startDateAllFormats.year} - ${endDateAllFormats.monthByLongText} ${
      endDateAllFormats.dayByOneDigit
    }, ${endDateAllFormats.year}</span
  >
</div>
<div class="cart-calender-text">
  <i class="fa-solid calender-icon fa-clock"></i>
  <span class="cart-calender-time">${startTime}  - ${endTime}</span>
</div>
<div class="cart-calender-text">
  <i class="fa-solid calender-icon fa-location-dot"></i>
  <span class="cart-calender-place"
    >Hemsedal</span
  >
</div>
</div>

</div>
</div>

<div class="read-more">
<a onclick="readMore('${extraPaidHappening.id}')" >
<span>Les mer</span> <i class="fa-solid fa-right-long"></i>
</a>
</div>
</div>

    `;
  }

  ekstraPaidSlider +=
    item +
    `

    </section> </section>
  
       `;
 

  return ekstraPaidSlider;
}

function createSearchHappeningBar() {
  getStartEndDateCurrentValue();
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  let searchHappeningBar = ``;
  searchHappeningBar += `
    <div class="filterBar-title"><h2>Søk Happening</h2></div>
<section
class="filterBar-container">
<div class="filterBar-subcontainer">

  <div class="filterBar-container-div">

    <div class="filterBar-container__item">
      <div class="start-date-title date-title">
        <span>Start dato</span>
      </div>
        
        <div class="ui calendar start-date" id="start-date">
          <div class="ui  ">
            <i class="calendar icon"></i>
            <input 
            min="${now.toISOString().slice(0, 16)}"
            value="${
              model.inputs.userPage.chosenDateFrom
                ? model.inputs.userPage.chosenDateFrom
                : (this.value = now.toISOString().slice(0, 16))
            }"
            onchange="getStartDate(event)"
            onClick="stopPropagation(event)"
            class="input date-field" type="datetime-local" placeholder="Start dato"
            >
          </div>
        </div>
      
    </div> 
    

    <div class="filterBar-container__item">
  <div class="end-date-title date-title">
    <span>Slutt dato</span>
  </div>
    
    <div class="ui calendar end-date" id="end-date">
      <div class="ui  ">
        <i class="calendar icon"></i>
        <input
        min="${now.toISOString().slice(0, 16)}"
        value="${
          model.inputs.userPage.chosenDateTo
            ? model.inputs.userPage.chosenDateTo
            : (this.value = now.toISOString().slice(0, 16))
        }"
        onchange="getEndDate(event)"
        onClick="stopPropagation(event)"
        class="input date-field" type="datetime-local" placeholder="Slutt dato"  >
      </div>
    </div>
</div>

    </div>   `;

  let monthSelectOptionField = ``;


  searchHappeningBar +=
    monthSelectOptionField +
    `
    
<div class="filterBar-container-div">

  <div class="category-container">
    <div class="filterBar-container__item  category_filter">
     <span class="category_label date-title"> Kategori</span>
      <div class="filterBar-container__item-category  category_field_selectBtn  calendar"  >     `;

  let categoryIconBtn = `
    
    <a href="#" style="text-decoration:none; color:#000" id="category-toggle" for="kategori" onclick="toggleCategory(event)">
    <input
    class="category-input"
    value="Kategori"
     style="border:none;  outline:none" id="kategori" type="text" />
    <i  class="fa-solid category-up-down fa-angle-${model.inputs.userPage.isCategoryBtnClicked ? "up" : "down"
    }"></i>
    </a>
    `;

  searchHappeningBar +=
    categoryIconBtn +
    `  <span>
    ${
      getselectedCategoryCountNumber(model.inputs.userPage.categories) == 0
        ? ""
        : getselectedCategoryCountNumber(model.inputs.userPage.categories)
    }
      </span>
      </div>
    </div>

  </div>

  <div class="search-happening-btn filterBar-container__item ">
  <div class=" date-title">
    <span>&nbsp&nbsp&nbsp</span>
  </div>
  <button
onclick="
 searchHappenings(
    getHappeningAsideFromExtraPaid(model.data.happenings),
    model.inputs.userPage.categories,
    model.inputs.userPage.chosenDateFrom,
    model.inputs.userPage.chosenDateTo
 ); 
 model.inputs.userPage.filterBtnState='';
 updateView()"
class="search-btn   ">Søk Happening &nbsp &nbsp<i class="fa-solid fa-play"></i></button></div>
</div>

</section>
    
    `;

  return searchHappeningBar;
}

function createMultipleChoiceCategory() {
  let multipleCoiceCategory = ``;
  multipleCoiceCategory += `
    <section class="category-container__item   category_list    ">
  <div class="category_list__item  " >
    <input ${getChecked(model.inputs.userPage.isSelectedAll)} 
    type="checkbox"
    onclick="selectAllOrNone(this.checked);stopPropagation(event)" >
    <label> Select All</label>
  </div>   `;

  let categories = model.inputs.userPage.categories;
  let categoryCheckBox = ``;
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];

    categoryCheckBox += `
   <div class="category_list__item  " >
    <input ${getChecked(
      category.isSelected
    )}  onclick="toggleCategorySelected(${category.id}); stopPropagation(event)" type="checkbox" >
    <label> ${category.title}</label>
  </div> 
   
   `;
  }

  multipleCoiceCategory += categoryCheckBox + `</section>`;

  return multipleCoiceCategory;
}

function createFilterButtons() {
  let filterButtons = ``;
  filterButtons += `
    <div class="filterBtns-wrapper" >
<div   class="happenings-title main-title">
<h1>Happenings</h1>
</div>
<div class="filterBtns-container">
<div><button

class="filter-btn ${model.inputs.userPage.filterBtnState=='tomorrow' ? 'active' : ''} "
 onclick="model.inputs.userPage.filterBtnState='tomorrow';
 updateView()">I morgen</button></div>
<div><button
onclick="model.inputs.userPage.filterBtnState='this-week';
 updateView()"
class="filter-btn  ${model.inputs.userPage.filterBtnState=='this-week' ? 'active' : ''}">Denne uka</button></div>
<div><button
onclick="model.inputs.userPage.filterBtnState='this-month';
 updateView()"
class="filter-btn ${model.inputs.userPage.filterBtnState=='this-month' ? 'active' : ''} ">Denne måneden</button></div>
</div>
</div>
    
    `;

  return filterButtons;
}

function createHappeningList() {

  let { categories } = model.inputs.userPage;
  let { chosenDateFrom, chosenDateTo } = model.inputs.userPage;
  let result=getHappeningsFromStorage().sort((a,b)=>{
    return new Date(a.happeningStartDate)-new Date(b.happeningStartDate)
  });
  let happeningsWithoutExtraPaid = getHappeningAsideFromExtraPaid(
  result
  );
  //searchHappenings working fra begynnelsen
  let getFilteredData = searchHappenings(
    happeningsWithoutExtraPaid,
    categories,
    chosenDateFrom,
    chosenDateTo
  );
  
  let happeningList = ``;

  happeningList += `
   
<section class="happenings" 
>
<div class=" slider-container nonExtraPaidContainer ">
${createReadMoreModal()}

`;

  let happeningsDiv = ``;



  for (let i = 0; i < getFilteredData.length; i++) {
    let happening = getFilteredData[i];
    let category = getCategoryById(
      model.inputs.userPage.categories,
      happening.categoryId
    );

    let categoryTitleInEnglish = translateCategoryTitleToEnglish(
      category.title
    );
    let startDate = happening.happeningStartDate;
    let endDate = happening.happeningEndDate;
    let startTime = happening.happeningStartTime;
    let endTime = happening.happeningEndTime;
    let startDateAllFormats = getMyAllDateFormats(startDate);
    let endDateAllFormats = getMyAllDateFormats(endDate);
    happeningsDiv += `
<div id="${happening.id}" class="cart-container">
<div class="cart-image"

style="
background-image: url(
${
  happening.imageUrl ||
  `https://source.unsplash.com/random/?${categoryTitleInEnglish}`
}
)

"

>

<div class="category-icon icon-container">
<span class="${category.icon}"></span>
</div>
</div>

<div class="cart-calender">
<div class="cart-calender-date nonExtraPaid">
<span class="cart-calender-day nonExtraPaid-day ">${
      startDateAllFormats.day
    }</span>
<span class="cart-calender-month nonExtraPaid-month"> ${startDateAllFormats.monthByShortText.toUpperCase()}</span>
</div>

<div class="cart-calender-content">
<!-- <span class="cart-calender-title">Konsert</span> -->
<h3>${happening.title}</h3>

<div>

<div class="cart-calender-text">
<i class="fa-solid calender-icon fa-calendar-days"></i>
<span class="cart-calender-wholeDate"
 >${startDateAllFormats.monthByLongText} ${
      startDateAllFormats.dayByOneDigit
    }, ${startDateAllFormats.year} - ${endDateAllFormats.monthByLongText} ${
      endDateAllFormats.dayByOneDigit
    }, ${endDateAllFormats.year}</span
>
</div>
<div class="cart-calender-text">
<i class="fa-solid calender-icon fa-clock"></i>
<span class="cart-calender-time">${startTime}  - ${endTime}</span>
</div>
<div class="cart-calender-text">
<i class="fa-solid calender-icon fa-location-dot"></i>
<span class="cart-calender-place"
 >Hemsedal</span
>
</div>
</div>

</div>
</div>

<div class="read-more">
<a onclick="readMore('${happening.id}')">
<span>Les mer</span> <i class="fa-solid fa-right-long"></i>
</a>
</div>
</div>

 `;
  }
  happeningList += happeningsDiv + `</div></section> `;
  return happeningList;
}

 




function readMoreBtn(id){
  return `
          <div class="read-more">
            <a onclick="readMore('${id}')">
              <span>Les mer</span>
              <i class="fa-solid fa-right-long"></i>
            </a>
          </div>
  `;
  }
  
  function createReadMoreText(title,value){
    return `
          <div> 
            <span> ${title}:${value}</span>
          </div>
    `;
  }
  
  function createReadMoreModal() {
      let readMoreModal = ``;
  if(!model.inputs.userPage.clickedHappeningId)  return readMoreModal;  
  
    let happeningId=model.inputs.userPage.clickedHappeningId;
    let happening = findElementById(
      model.data.happenings,
      parseInt(happeningId)
    );
  
    let category = getCategoryById(
      model.inputs.userPage.categories,
      happening.categoryId
    );
    let categoryTitleInEnglish = translateCategoryTitleToEnglish(category.title);
  
    let {
      monthByToDigit,
      monthByShortText,
      year,
      day
    } = getMyAllDateFormats(happening.happeningStartDate);
    let {
      monthByToDigit:monthEndToDigit,
      monthByShortText:monthEndShortText,
      year:yearEndDate,
      day:endDay
    } = getMyAllDateFormats(happening.happeningEndDate);
    let monthStartDate=doFirstLetterUpper(monthByShortText);
    let monthEndDate=doFirstLetterUpper(monthEndShortText);
  
    let startDate=`${day}  ${monthStartDate}  ${year}   ${happening.happeningStartTime}`;
    let endDate=`${endDay}  ${monthEndDate}  ${yearEndDate}  ${happening.happeningEndTime}`;      
    readMoreModal += `
    <section
      onclick="cancelModal()"
      class="modal
      ${ model.inputs.userPage.isReadMoreNoneExtraPaidBtnClicked || model.inputs.userPage.isReadMoreExtraPaidBtnClicked? 'modal2' : ''}
      ">
      <div class="modal-wrapper">
         <div class="modal-image"
         style="
          background-image: url(
            ${
              happening.imageUrl ||
              `https://source.unsplash.com/random/?${categoryTitleInEnglish}`
            }
          )
  
          "
          >
            <section class="modal-date"> 
              <div class="modal-date__day">${day}</div>
              <div class="modal-date__mon-year">
              ${monthStartDate} ${year}
              </div>
            </section>
         </div>
          <div class="modal-description">
            <div class="cancel-icon">
              <a   onclick="cancelModal()"> 
                <span class="icon-cross"></span>
              </a>
            </div>
            <div class="modal-description__title">
              <h1>
              ${happening.title}
              </h1>
            </div>
            <div class="small-info">
                ${createReadMoreText('Type',category.title)}
                ${createReadMoreText('Start dato',startDate)}
                ${createReadMoreText('Slutt dato',endDate)}
                <div>
                    <span>
                      Sted: Hemsedal
                    </span>
                </div>
            </div>
            <div class="modal-description__text">${happening.description} 
            </div>
        </div>
      </div>
    </section>
    
    `;
    return readMoreModal;
  }
  
  
  
  function cancelModal() {
    console.log("Cancel Modal");
    model.inputs.userPage.isReadMoreExtraPaidBtnClicked = false;
    model.inputs.userPage.isReadMoreNoneExtraPaidBtnClicked = false;
    updateView();
    
  }
  
  
  
  function readMore(happeningId) {
    let happening=findElementById(model.data.happenings,happeningId);
    let {paymentTypeId}=happening;
    console.log("paymetnTypeId: ", paymentTypeId);
    if(paymentTypeId===3){
      model.inputs.userPage.isReadMoreExtraPaidBtnClicked = true;
  
    }else{
      model.inputs.userPage.isReadMoreNoneExtraPaidBtnClicked = true;
  
    }
    model.inputs.userPage.clickedHappeningId = happeningId;
    updateView();
  
  }