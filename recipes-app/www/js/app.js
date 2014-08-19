                           
window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);

// The dynamically built HTML pages. In a real-life app, In a real-life app, use Handlerbar.js, Mustache.js or another template engine


var detailsPage =
    '<div>' +
        '<div class="header"><h1>{{title}}</h1><a href="#" class="btn">Back</a></div>' +
        '<div class="scroller">' +
            '<div class="recipes">' +
                '<h2>{{name}}</h2>' +
                '<img src="images/{{img}}" alt="Failed to find image"/>' +
                '<p><br/></p>' +
                '<p>Submitted: {{date}}</p>' +
                '<p>Category: {{Category}}</p>' +
                '<p>Author: {{Author}}</p>' +
                '<p>Yield: {{Yield}}</p>' +
                '<p>Total: {{Total}}</p>' +
                '<p>Ingredients: <br/>{{Ingredients}}</p>' +
                '<p>Preparation: <br/>{{Preparation}}</p>' +
            '</div>' +
        '</div>' +
    '</div>';

saveRecipes();
retVals = loadRecipes();
reps = retVals["reps"];
homePage = retVals["home"];
var slider = new PageSlider($("#container"));
$(window).on('hashchange', route);

// Basic page routing
function route(event) {
    var page,
        hash = window.location.hash;
//    var obj = null;
//    for(var key in reps)
//    {
//        console.log(key);
//        console.log(value);
//        console.log("Key");
//        console.log(hash);
//        if("#"+key === hash)
//        {
//          console.log(key);
//          obj = reps[key].name;
//          console.log(obj);
//          console.log("obj");
//        }
//    }
//    console.log(hash);
    hash = hash.replace('#','');
    console.log(reps[hash]);
    console.log((hash in reps));
    if (hash in reps) {
        page = merge(detailsPage, {img: reps[hash].image, name: reps[hash].name, Preparation: reps[hash].Preparation, Yield: reps[hash].Yield, Total: reps[hash].Total, Ingredients: reps[hash].Ingredients, author: reps[hash].author, date: reps[hash].date, category: reps[hash].category});
        
    }
    else {
        page = homePage;
//        slider.slide($(homePage), "left");
    }

    slider.slidePage($(page));

}

// Primitive template processing. In a real-life app, use Handlerbar.js, Mustache.js or another template engine
function merge(tpl, data) {
    return tpl.replace("{{img}}", data.img)
              .replace("{{title}}", data.name)
              .replace("{{name}}", data.name)
              .replace("{{Preparation}}", data.Preparation)
              .replace("{{Yield}}", data.Yield)
              .replace("{{Total}}", data.Total)
              .replace("{{Ingredients}}", data.Ingredients)
              .replace("{{Author}}", data.author)
              .replace("{{date}}", typeof data.submitted != 'undefined'? data.submitted : 'No Date'  )
              .replace("{{Category}}", data.category);
}
function loadRecipes()
{
    // The dynamically built HTML pages. In a real-life app, In a real-life app, use Handlerbar.js, Mustache.js or another template engine
    var homePage =
    '<div>' +
        '<div class="header"><h1>KeyW Recipe Book</h1></div>' +
        '<div class="scroller">' +
            '<ul class="list">';
    var homeEnd = '</ul>' +
        '</div>' +
    '</div>';
   
    var theList = JSON.parse(window.localStorage.getItem("recipes"));
    console.log(theList);
    //console.log(theList.Recipe1.name);
     for( obj in theList)
     {
         console.log("obj");
         
         
         homePage += '<li><a href="#' + obj + '"><strong>' + obj + '</strong></a></li>' 
   
         
     }
    
    homePage += homeEnd;
    return {"reps":theList, "home":homePage};
}
function saveRecipes()
{
    var todoArray = {"Asiago-Olive Rolls":{name: "Easy Asiago-Olive Rolls", image:null, Yield: "Makes 8 to 10 servings",
Total: "25 Minutes", Ingredients: "1 (13.8-oz.) can refrigerated classic pizza crust dough<br/>1/4 cup refrigerated olive tapenade<br/>1/2 cup grated Asiago cheese<br/>1 teaspoon chopped fresh rosemary<br/>1 tablespoon butter, melted",Preparation:"Preheat oven to 450\". Unroll pizza crust dough. Spread olive tapenade over dough, leaving a 1/4-inch border. Sprinkle with cheese and rosemary. Gently roll up dough, starting at 1 long side. Cut into 10 (1 1/4-inch-thick) slices. Place slices in a lightly greased 9-inch round cake pan. Brush top of dough with melted butter. Bake 15 to 20 minutes or until golden. Serve immediately.", author: "Theresa Day", date:"2/26/2014", category: "Appetizer"},"Sam's Famous Oysters":{name: "Sam's Famous Oysters", image:null, Yield:"", Total:"", Ingredients: "3 Dozen  Fresh Shucked Oysters On The Half Shell<br/>1 Pound Sliced Pork Bacon<br/>16oz Fresh Spinach<br/>1 Clove Garlic Minced<br/>1 Pound Freshly Shredded Parmesan Cheese", Preparation:"In a large skillet over medium heat fry the bacon until browned and crispy. Remove the bacon from the skillet and crush it up into ¼ to ½ inch size pieces and set aside. Add the fresh spinach into the hot skillet and cook until completely wilted then add the garlic and 1/3 of the parmesan cheese and stir it in continue cooking for a couple minutes then remove from heat.<br/><br/>Preheat oven to 400F<br/><br/>Arrange the oyster on the half shell on a cookie sheet divide the spinach mixture evenly between the oysters and top with the parmesan cheese. Bake for 7 to 10 minutes.<br/>Top with the bacon and serve.", author:	"Sam S. Ventura", date:	"2/21/2014",	category:"Appetizer"}};
    item = JSON.stringify(recipes);
    console.log(item);
      window.localStorage.setItem("recipes", JSON.stringify(recipes));
}

route(reps);