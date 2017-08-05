$(document).ready(function()
{
   // //Array for the autocomplete text box
   //  var texts =["Matrix", "America","the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part", "love", "friend", "family", "father","mother", "computer","school","people", "class", "wife", "husband","bianca", "john", "miake", "michael", "desmond","ceser","chris","forrest", "jeff","jose","tammy","luis","nicholas","omar","tatiana","nate","nick"];
   //  //Array for the buttons
   //  var topic =["made","may","part", "love", "friend", "family", "father","mother", "computer","school","people", "class", "wife", "husband"];
   //  $("#autocomplete").autocomplete({
   //      lookup: texts,
   //      onSelect: function (option)
   //      {
   //      $("#autocomplete").val(option.value);

   //      }
   //   });

    //show the array in the buttons
    function show() {
        for (var i = 0; i < topic.length; i++) 
            {
                var myBtn = $("<button>");
                myBtn.addClass("btn btn-primary btn-lg MovieBtn");
                myBtn.text(topic[i]);
                $("#btnPlace").append(myBtn);
            }
    }
    // retrieve data from the APi for the selected button
    function getApi()
    {
    //console.log("a click");
        var content = $(this).text();
        queryURL ="http://api.giphy.com/v1/gifs/search?q="+content+"&api_key=83b6f797941e41fb940e70d7a6fa9d09&limit=10";
         $("#gifInfo").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response)
            {
                for (var i = 0; i < 10; i++)
                 {        
                console.log(response.data[i].images.original_still.url);
                var myimg = $('<div class="thumbnail imageShown" data-status="still" data-text='+response.data[i].rating+' data-scr='+response.data[i].images.original_still.url+' value='+response.data[i].images.original.url+'><img id="myimg" src=' +response.data[i].images.original_still.url+ '> Rating: '+response.data[i].rating+'</div>' );
                $("#gifInfo").append(myimg);
            }

        })
    }
    show();

//change the image jpeg to gif and pause
    function playGif()
    {
        var status = $(this).attr("data-status");
        var temp = $(this).attr("value");
        var src1 = $(this).attr("data-scr");
        var text1 = "Rating: "+ $(this).attr("data-text");
        
        if (status==="still")
            {
                 console.log(status);
                 console.log(temp);
                 $(this).attr("data-status","giphy");
                 var newImg = $("<img>");
                  newImg.addClass("newImg");
                 newImg.attr("src", temp);
                 $(this).empty();
                  $(this).append(newImg, text1);
            }
            else
            {
                console.log(status);
                console.log(src1);
                $(this).attr("data-status","still");
                 var newImg = $("<img>");
                 newImg.addClass("newImg");
                 newImg.attr("src", src1);
                 $(this).empty();
                 $(this).append(newImg, text1);
            }
    }
    //onClick on the button to add new search button
    $("#addMovie").on("click", function(){
        var textValue = $("#autocomplete").val().trim().toUpperCase();
        var  n =topic.indexOf(textValue);
        //textbox cannot be empty
        if (textValue==="")
            {
                alert("Text box cannot be empty");
            }
            //multiple same entry not allowed
        else if( n>0)
            {
                alert("This text exists in the array");
            }
        else
            {
             $("#btnPlace").empty();
             topic.push(textValue);
             show();
            }    
    });
    //when the button is clicked fetch from the api
    $(document).on("click",".MovieBtn", getApi);
    //play mp4 when the image is clickes
    $(document).on("click",".imageShown", playGif);
    //end of document on ready
});