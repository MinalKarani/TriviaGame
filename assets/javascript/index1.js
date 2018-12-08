//Question Answers Object
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


var intervalId;
var time = 10;
var timerRunning = false;
var currentQuestion=0;
var correctAnswers=0;var incorrectAnswers=0;var unanswered=0;
var messageResult="";


function newGame()
{
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unanswered").empty();
    $("#startOverBtn").hide();
    
}

//Major function 
function StartGame(){
    $("#message").empty();
    $("#gif").empty();
    $("#correctedAnswer").empty();
    newGame();
    start();
    i=currentQuestion;
    $(".Question").html(Questions[i].question);
    $.each(Questions[i].answerOptions, function(index, character) {
    var choices = $('<div>');
    choices.html("<a href='#'>"+Questions[i].answerOptions[index]);
    choices.attr({'id': index });
    choices.addClass('options');
    $('.ansOptions').append(choices);
    });
    
    $(".options").on("click",function(){
        stop();
        var userAnswer=$(this).attr("id");
        var index=Questions[i].correctAnswer
        $(".Question").empty();
        $(".ansOptions").empty();
        $(".options").empty();

        if((Questions[i].answerOptions[userAnswer])===(Questions[i].answerOptions[index]))
        {
         
            correctAnswers++;
            messageResult="Correct Answer!!";
            ShowAnswer();
            
    
        }
        else if((Questions[i].answerOptions[userAnswer])!=(Questions[i].answerOptions[index]))
        {
            incorrectAnswers++;
            messageResult="Incorrect Answer!!";
            ShowAnswer();
        }
        
    });

      
}
    $("#startBtn").show();

    //To Start the game very first time 
    $("#startBtn").on("click",function()
    {
        $("#startBtn").hide();
        StartGame();
    });

    //Reseting the timer
    function reset() {
        time=10;
        $("#timeRemaining").html("<h2> Time remaining 00:"+time+"</h2>");
             
    }

    //Starting the timer
    function start() {

        $("#timeRemaining").html("<h2> Time remaining 00:"+time+"</h2>");
        if (!timerRunning) {
          intervalId = setInterval(count, 1000);
          timerRunning = true;
        }
      }

      //Stopping the timer
      function stop() {
      
        clearInterval(intervalId);
        
        timerRunning = false;
      }

        function count() {

        time--;
        
        $("#timeRemaining").html("<h2> Time remaining 00:0"+time+"</h2>");
       
        //If time limit is reached 
        if(time===0)
        {
            
            $(".Question").empty();
            $(".ansOptions").empty();
            $(".options").empty();
            unanswered++;
            stop();
            reset();
            messageResult="Time is up!!";
            ShowAnswer();
        }
      
      }

      //function to display correct Answer on screen 
      function ShowAnswer()
      {
          reset();
          $("#timeRemaining").empty();
          $("#message").text(messageResult);
          var index=Questions[i].correctAnswer
          $("#correctedAnswer").text("Correct Answer is: "+Questions[i].answerOptions[index]);
          console.log(Questions[i].url);
          $("#gif").html("<img src="+Questions[i].url+">");
          

          if(currentQuestion === (Questions.length-1)){ 
            setTimeout(Score, 2000);
        } else{
            currentQuestion++;
            setTimeout(StartGame, 2000);
        }	
      }

      //display Final Score after all the questions form Questions object has been displayed
      function Score()
      {
        $("#timeRemaining").empty();
        $("#message").empty();
        $("#gif").empty();
        $("#correctedAnswer").empty();
        $("#finalMessage").text("Game Over");
        $("#correctAnswers").text("Total Correct Answers:"+correctAnswers);
        $("#incorrectAnswers").text("Total InCorrect Answers:"+incorrectAnswers);
        $("#unanswered").text("Total Unaswerd:"+unanswered);
        $("#startOverBtn").show();
        }

    // Replaying the game 
      $("#startOverBtn").on("click",function()
      {
        currentQuestion=0;
        correctAnswers=0;
        incorrectAnswers=0;
        unanswered=0
        messageResult="";
        StartGame();
      });
      
        
      

      