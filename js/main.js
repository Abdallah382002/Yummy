
$(".inn-load").fadeOut(0);
$(document).ready(function(){
  $(".load").fadeOut(700);
  $("body").css("overflow", "visible")
})
$(".nav-tab").hide(0);
$("#icon").click(function(){
  $(".nav-tab").toggle(1000);
  $(".open-close-icon").toggleClass("fa-bars");
  $(".open-close-icon").toggleClass("fa-xmark");
})
async function getmeal(){
  $(".inn-load").fadeIn(300);
let meals=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
 meals= await meals.json();
let listmeal = meals.categories;
displycato(listmeal);
$(".items").click(function(e){
 let ix=  $(e.target).attr("count");
 getCategoryMeals(listmeal[ix].strCategory)
}

)
$(".inn-load").fadeOut(350);
}
function displycato(arr){
  let container=``;
  for(let i=0;i<arr.length;i++){
    container +=`
  <div  class="col-3 " >
  <div   class="items position-relative cursor-pointer">
<img src="${arr[i].strCategoryThumb}" class="w-100 rounded-1" alt="">
<div count="${i}" class="layer text-center ">
<h3 count="${i}" class="py-3">${arr[i].strCategory}</h3>
<p count="${i}" >${arr[i].strCategoryDescription} </p>
</div>
</div>
 </div>
    `
  }
  document.getElementById("Data").innerHTML=container;
  
}
let searchContainer = document.getElementById("searchContainer");
let Data =document.getElementById("Data");
async function getfirst(){
  let meals=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
   meals= await meals.json();
  let listmeal = meals.meals;
  displyfirst(listmeal);
  $(".items").click(function(e){
    let iid= $(e.target).attr("count");
   getMealDetails(listmeal[iid].idMeal)
  })
  }
  function displyfirst(arr){
    let container=``;
    for(let i=0;i<arr.length;i++){
      container +=`
    <div  class="col-3 " >
    <div   class="items position-relative cursor-pointer">
<img src="${arr[i].strMealThumb}" class="w-100 rounded-1" alt="">
<div count="${i}" class="layer d-flex align-items-center ">
 <h3 count="${i}" class="mt-5">${arr[i].strMeal}</h3>
</div>
</div>
     </div>
      `
    }
    document.getElementById("Data").innerHTML=container;
  }
getfirst()
  async function getMealDetails(mealID) {
    $(".inn-load").fadeIn(300);
    Data.innerHTML = ""
    
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    
    displayMealDetails(respone.meals[0])
    $(".inn-load").fadeOut(350);

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    Data.innerHTML = cartoona
}
async function getCategoryMeals(category) {
  $(".inn-load").fadeIn(300);
  Data.innerHTML = ""
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  meals = await meals.json()
  
  displyfirst(meals.meals.slice(0, 20))
  $(".items").click(function(e){
    let iid= $(e.target).attr("count");
    getMealDetails(meals.meals[iid].idMeal)
  })
  $(".inn-load").fadeOut(350);

}

$("#cat").click(function(){
  getmeal();
  $("#search").removeClass("d-block")
  $("#search").addClass("d-none")
})
async function getMealsname(searchFirst) {
  Data.innerHTML = ""
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFirst}`)
  meals = await meals.json()
  displyfirst(meals.meals)
}
async function getMealsfirstletter(searchFirst) {
  Data.innerHTML = ""
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFirst}`)
  meals = await meals.json()
  displyfirst(meals.meals)

}

$("#exampleFormControlInput1").keyup(function(){
let searchFirst=$("#exampleFormControlInput1").val();
if(searchFirst.length > 0){
$(".inn-load").fadeIn(300);
getMealsname(searchFirst)
$(".inn-load").fadeOut(350);}
else
Data.innerHTML="";

})

$("#exampleFormControlInput2").keyup(function(){
  let searchFirst=$("#exampleFormControlInput2").val();
  if(searchFirst.length > 0){
    $(".inn-load").fadeIn(300);
  getMealsfirstletter(searchFirst[0]);
  $(".inn-load").fadeOut(350);
}
  else
  Data.innerHTML="";

})


$("#ser").click(function(){
  $("#search").addClass("d-block")
  $("#search").removeClass("d-none")
  Data.innerHTML="";
})
function displyarea(arr){
  let container=``;
  for(let i=0;i<arr.length;i++){
    container +=`
    <div class="col-md-3 items">
    <div count="${arr[i].strArea}" class="rounded-2 text-center cursor-pointer">
            <i count="${arr[i].strArea}" class="fa-solid fa-house-laptop fa-4x"></i>
            <h3 count="${arr[i].strArea}">${arr[i].strArea}</h3>
    </div>
</div>
    `
  }
  document.getElementById("Data").innerHTML=container;
}
async function getarea() {
  $(".inn-load").fadeIn(300);
  Data.innerHTML = ""
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  meals = await meals.json()
  displyarea(meals.meals)
  $(".items").click(function(e){
    let iid= $(e.target).attr("count");
    getareameal(iid);
  })
  $(".inn-load").fadeOut(350);
}
$("#are").click(function(){
  $(".nav-tab").toggle(1000);
  getarea();
  $("#search").removeClass("d-block")
  $("#search").addClass("d-none")
})

async function getareameal(area) {
  $(".inn-load").fadeIn(300);
  Data.innerHTML = ""
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  meals = await meals.json()
  displyfirst(meals.meals)
  $(".items").click(function(e){
    let iid= $(e.target).attr("count");
    getMealDetails(meals.meals[iid].idMeal)
  })
  $(".inn-load").fadeOut(350);
}
function displyIng(arr){
  let container=``;
  for(let i=0;i<arr.length;i++){
    container +=`
    <div class="col-md-3 items">
    <div count="${arr[i].strIngredient}"   class="rounded-2 text-center cursor-pointer">
            <i count="${arr[i].strIngredient}" class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 count="${arr[i].strIngredient}">${arr[i].strIngredient}</h3>
            <p count="${arr[i].strIngredient}">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
</div>
    `
  }
  document.getElementById("Data").innerHTML=container;
}
async function getIng() {
  $(".inn-load").fadeIn(300);
  Data.innerHTML = ""
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  meals = await meals.json()
  displyIng(meals.meals.slice(0,20))
  $(".items").click(function(e){
    let iid= $(e.target).attr("count");
    getareaIng(iid);
  })
  $(".inn-load").fadeOut(350);
}
$("#ING").click(function(){
  $(".nav-tab").toggle(1000);
  getIng();
  $("#search").removeClass("d-block")
  $("#search").addClass("d-none")
})
async function getareaIng(area) {
  $(".inn-load").fadeIn(300);
  Data.innerHTML = ""
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${area}`)
  meals = await meals.json()
  displyfirst(meals.meals)
  $(".items").click(function(e){
    let iid= $(e.target).attr("count");
    getMealDetails(meals.meals[iid].idMeal)
  })
  $(".inn-load").fadeOut(350);
  }
  function displycontent(){
    let container=`<div class="pt-5 d-flex justify-content-center align-items-center">
    <div class="w-75 row g-3" >
        <div class="col-6">
            <input type="text" class="form-control " id="exampleFormControlInput11"  placeholder="Enter Your Name ">
            <div class="alert alert-danger mt-2 w-100 text-center d-none" id="alr1"  role="alert">
                Special characters and numbers not allowed
            </div> 
            <div class="alert alert-success mt-2 w-100 text-center d-none"  id="alr11"  role="alert">
             Success
           </div>           
        </div>
        <div class="col-6">
            <input type="email" class="form-control" id="exampleFormControlInput22" placeholder="Enter your Email ">
            <div class="alert alert-danger mt-2 w-100 text-center d-none" id="alr2"  role="alert">
                Email not valid *exemple@yyy.zzz
              </div> 
              <div class="alert alert-success mt-2 w-100 text-center d-none"  id="alr22"  role="alert">
              Success
            </div>          
        </div>
        <div class="col-6">
            <input type="tel" class="form-control" id="exampleFormControlInput33" placeholder="Enter your Phone">
            <div class="alert alert-danger mt-2 w-100 text-center d-none"  id="alr3"  role="alert">
                Enter valid Phone Number
        </div> 
        <div class="alert alert-success mt-2 w-100 text-center d-none"  id="alr33"  role="alert">
        Success
      </div>          
        </div>
        <div class="col-6">
            <input type="number" class="form-control" id="exampleFormControlInput44" placeholder="Enter your Age">
            <div class="alert alert-danger mt-2 w-100 text-center d-none"  id="alr4"  role="alert">
                Enter valid age
                 </div>   
                 <div class="alert alert-success mt-2 w-100 text-center d-none"  id="alr44"  role="alert">
                 Success
               </div>        
        </div>
        <div class="col-6">
            <input type="password" class="form-control" id="exampleFormControlInput55" placeholder="Enter your password">
            <div class="alert alert-danger mt-2 w-100 text-center d-none"  id="alr5"  role="alert">
                Enter valid password *Minimum eight characters, at least two letter uppercase and lowercase and one number:*
            </div> 
            <div class="alert alert-success mt-2 w-100 text-center d-none"  id="alr55"  role="alert">
            Success
          </div>          
        </div>
        <div class="col-6">
            <input type="password" class="form-control" id="exampleFormControlInput66" placeholder="repassword">
            <div class="alert alert-danger mt-2 w-100 text-center d-none"  id="alr6"  role="alert">
                Enter valid repassword
            </div> 
            <div class="alert alert-success mt-2 w-100 text-center d-none"  id="alr66"  role="alert">
            Success
          </div>          
        </div>
    
        <div class="col-12 text-center mt-2">
            <button type="button" id="butt" disabled class="btn btn-outline-danger btn-lg">Submit</button>
        </div>
    
    </div>
    </div>`
    Data.innerHTML=container;
  }
  $("#con").click(function(){
    displycontent();
  
  }
  )