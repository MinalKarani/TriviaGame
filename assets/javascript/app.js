
Questions=[
        {
        question:"What type of animal is a seahorse?",
        answerOptions:["Crustacean","Arachnid","Fish","Shell"],
        correctAnswer:2,
        url:"assets/images/Seahorse.jpg"
        },
        {
        question:"Which of the following dogs is the smallest??",
        answerOptions:["Dachshund","Poodle","Pomeranian","Chihuahua"],
        correctAnswer:3,
        url:"assets/images/Chihuahua.jpg"
        },
        {
        question:"What color are zebras?",
        answerOptions:["White with black stripes","Black with white stripes","Both of the above","None of the above"],
        correctAnswer:1,
        url:"assets/images/Zebra.png"
        },
        {
        question:"What existing bird has the largest wingspan?",
        answerOptions:["Stork","Swan","Condor","Albatross"],
        correctAnswer:3,
        url:"assets/images/Albatross.jpg"
        },
        {
        question:"What is the biggest animal that has ever lived?",
        answerOptions:["Blue whale","African elephant","Apatosaurus (aka brontosaurus)","Spinosaurus"],
        correctAnswer:0,
        url:"assets/images/Bluewhale.png",
        },
        {
        question:"What pets do more families own?",
        answerOptions:["Birds","Cats","Dogs","Horses"],
        correctAnswer:1,
        url:"assets/images/Cats.jpg"
        },
        {
        question:"What animal lives the longest?",
        answerOptions:["Ocean quahog (clam)","Red sea urchin","Galapagos tortois","Rougheye rockfish"],
        correctAnswer:0,
        url:"assets/images/Ocean-quahog.jpg"
            },
        {
        question:"What are female elephants called??",
        answerOptions:["Mares","Sows","Cows","Dams"],
        correctAnswer:2,
        url:"assets/images/BabyElephant.jpg"
        },
        {
        question:"Which of the following animals sleep standing up?",
        answerOptions:["Gorillas","Flamingos","Camels","Ravens"],
        correctAnswer:1,
        url:"assets/images/Flamingos.jpeg"
        },
        {
        question:"What is the fastest water animal?",
        answerOptions:["Porpoise","Sailfish","Flying fish","Tuna"],
        correctAnswer:1,
        url:"assets/images/Sailfish.jpg"
        },
];


var intervalId;var nextintervalId;
var time = 0;
var clockRunning = false;
var currentQuestion=0;
var correctAnswers=0;var incorrectAnswers=0;var unanswered=0;
var messageResult="";

function StartGame(){
    $("#message").empty();
    $("#gif").empty();
    $("#correctedAnswer").empty();
    start();
    
    //i=Math.floor(Math.random() * Questions.length);;
    i=currentQuestion;
    $(".question").html(Questions[i].question);
    console.log(i);
    $.each(Questions[i].answerOptions, function(index, character) {
    var choices = $('<div>');
    choices.text(Questions[i].answerOptions[index]);
    choices.attr({'id': index });
    choices.addClass('options');
    $('.answerList').append(choices);
    
        //stop();
    });
    
    $(".options").on("click",function(){
        var userAnswer=$(this).attr("id");
        var index=Questions[i].correctAnswer
        console.log(userAnswer);
        $(".question").empty();
        $(".answerList").empty();

        if((Questions[i].answerOptions[userAnswer])===(Questions[i].answerOptions[index]))
        {
            console.log("Correct!!!!!!!");
            correctAnswers++;
            messageResult="Correct Answer!!";
            //stop();
            ShowAnswer();
            
    
        }
        else
        {
            incorrectAnswers++;
            messageResult="Incorrect Answer!!";
            //reset();
            ShowAnswer();
        }
    });

    $(".options").onmouseover=function(){
        console.log("HOVER");
        options.css({"background-color":"green"});
    };
  
}
    $("#startBtn").show();
    $("#startBtn").on("click",function()
    {
        $("#startBtn").hide();
        StartGame();
    });

    function reset() {
        time=00;
        $("#timeLeft").html("<h2> Time remaining 00:0"+time+"</h2>");
             
    }
    function start() {

        $("#timeLeft").html("<h2> Time remaining 00:"+time+"</h2>");
        if (!clockRunning) {
          intervalId = setInterval(count, 1000);
          clockRunning = true;
        }
      }
      function stop() {
      
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        
        clockRunning = false;
      }
      function count() {

        time++;
        $("#timeLeft").html("<h2> Time remaining 00:"+time+"</h2>");
        
        if(time===15)
        {
            
            $(".question").empty();
            $(".answerList").empty();
            unanswered++;
            reset();
            messageResult="Time is up!!";
            ShowAnswer();
        }
      
      }
      function ShowAnswer()
      {
          stop();
          reset();
          $("#message").text(messageResult);
          console.log(i);
          var index=Questions[i].correctAnswer
          $("#correctedAnswer").text("Correct Answer is: "+Questions[i].answerOptions[index]);
          console.log(Questions[i].url);
          $("#gif").html("<img src="+Questions[i].url+">");
          //nextintervalId = setTimeout(showNextSet(), 500);
          //clearInterval(nextintervalId);

          if(currentQuestion === (Questions.length-1)){
            setTimeout(scoreboard, 2000)
        } else{
            currentQuestion++;
            setTimeout(StartGame, 2000);
        }	
      }
      function scoreboard()
      {
        $("#timeLeft").empty();
        $("#message").empty();
        $("#gif").empty();
        $("#correctedAnswer").empty();
        $("#finalMessage").text("Game Over");
        $("#correctAnswers").text("Total Correct Answers:"+correctAnswers);
        $("#incorrectAnswers").text("Total InCorrect Answers:"+incorrectAnswers);
        $("#unanswered").text("Total Unaswerd:"+unanswered);
      }
