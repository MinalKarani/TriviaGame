
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
var clockRunning = false;
var currentQuestion=0;
var correctAnswers=0;var incorrectAnswers=0;var unanswered=0;
var messageResult="";
var answered;

function newGame()
{
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unanswered").empty();
    $("#startOverBtn").hide();
    
}
function StartGame(){
    $("#message").empty();
    $("#gif").empty();
    $("#correctedAnswer").empty();
    newGame();
    start();
    answered=true;
    i=currentQuestion;
    $(".question").html(Questions[i].question);
    $.each(Questions[i].answerOptions, function(index, character) {
    var choices = $('<div>');
    choices.html("<a href='#'>"+Questions[i].answerOptions[index]);
    choices.attr({'id': index });
    choices.addClass('options');
    $('.answerList').append(choices);
    
        
    });
    
    $(".options").on("click",function(){
        stop();
        var userAnswer=$(this).attr("id");
        var index=Questions[i].correctAnswer
        $(".question").empty();
        $(".answerList").empty();
        $(".options").empty();

        if((Questions[i].answerOptions[userAnswer])===(Questions[i].answerOptions[index])&& (answered == true))
        {
         
            correctAnswers++;
            messageResult="Correct Answer!!";
            ShowAnswer();
            
    
        }
        else if((Questions[i].answerOptions[userAnswer])!=(Questions[i].answerOptions[index])&& (answered == true))
        {
            incorrectAnswers++;
            messageResult="Incorrect Answer!!";
            ShowAnswer();
        }
        else{
            answered=true;
        }
    });

      
}
    $("#startBtn").show();
    $("#startBtn").on("click",function()
    {
        $("#startBtn").hide();
        StartGame();
    });

    function reset() {
        time=10;
        $("#timeLeft").html("<h2> Time remaining 00:"+time+"</h2>");
             
    }
    function start() {

        $("#timeLeft").html("<h2> Time remaining 00:"+time+"</h2>");
        if (!clockRunning) {
          intervalId = setInterval(count, 1000);
          clockRunning = true;
        }
      }
      function stop() {
      
        clearInterval(intervalId);
        
        clockRunning = false;
      }
      function count() {

        time--;
        
        $("#timeLeft").html("<h2> Time remaining 00:0"+time+"</h2>");
        
        if(time===0)
        {
            
            $(".question").empty();
            $(".answerList").empty();
            $(".options").empty();
            unanswered++;
            answered=false;
            stop();
            reset();
            messageResult="Time is up!!";
            ShowAnswer();
        }
      
      }
      function ShowAnswer()
      {
          reset();
          $("#timeLeft").empty();
          $("#message").text(messageResult);
          var index=Questions[i].correctAnswer
          $("#correctedAnswer").text("Correct Answer is: "+Questions[i].answerOptions[index]);
          console.log(Questions[i].url);
          $("#gif").html("<img src="+Questions[i].url+">");
          

          if(currentQuestion === (Questions.length-1)){ 
            setTimeout(scoreboard, 2000);
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
        $("#startOverBtn").show();
        
        
      }
      $("#startOverBtn").on("click",function()
      {
        currentQuestion=0;
        correctAnswers=0;
        incorrectAnswers=0;
        unanswered=0
        messageResult="";
        StartGame();
      })
      
        
      

      