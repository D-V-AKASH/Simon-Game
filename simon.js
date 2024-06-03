var colors = ['red','blue','green','yellow'];

var generatedColor = [];

//to check game status

var gameStart = false;

$(document).keypress(function(event)
{ 
    if (!gameStart && event.which ===13)
    {
        var firstColor = colorsGeneration();
        playSound(firstColor);
        animateButton(firstColor);
        $('.infos').text('Level 0');
    }
    gameStart = true;   
})

let highScore =0;
displayScore();

//color generation

function colorsGeneration()
{
    var randomNumber = Math.floor(Math.random()*4);

    var randomColor = colors[randomNumber];

    generatedColor.push(randomColor);
    console.log(generatedColor);

    return randomColor;
}

var result =1;

//user choice

$('.btn').click(function()
{
    if(result === 1)
    {
        var userChoiceId = $(this).attr("id");
        
        playSound(userChoiceId);

        animateButton(userChoiceId);
    
        checkAnswer(userChoiceId);   
        console.log(generatedColor);
    }

})

// to check answers
var level = 0;
var i = 0;
var noOfRightClicks = 0;
var storingScore;

function checkAnswer(clickedButton) 
{
   if(clickedButton === generatedColor[i])
    {
        console.log('success!');
        result =1;
        
        $('.score').text('Score: ' +(noOfRightClicks+1));
        noOfRightClicks++;     

        if(noOfRightClicks>highScore)
        {
            storingScore = JSON.stringify(localStorage.setItem('storedScore',noOfRightClicks));  //to store datas using Json first make it as a string
            displayScore();    
        }

        if(i === level)
        {
            setTimeout(() => {
                colorsGeneration();
                playSequence();
            }, 700);

            level++;
            $('.infos').text('Level '+level);
            i = 0;
        }
        else
        {
            i++;
        }
    }

    else
    {
        console.log('failure');
        result = 0;
        $('.infos').text('Wrong Button! Press Enter to Restart');
        $(document).keypress('enter', function()
        {
            location.reload();
        })
    }
}

//playing sequence

function playSequence()
{
    let index =0;

    let intervalId = setInterval(() => {

        let chosenColor = generatedColor[index];

        playSound(chosenColor);
        animateButton(chosenColor);

        index++;

        if(index === generatedColor.length)
        {
            clearInterval(intervalId);
        }

    }, 700);
} 

//sound

function playSound(buttonSound)
{
    var buttonSound = new Audio('./Simon Game Challenge Starting Files/sounds/'+ buttonSound +'.mp3');
    buttonSound.play();
}

//animation

function animateButton(pressedButton)
{
    $('#' +pressedButton).fadeOut(10).fadeIn(10);
    $('#' +pressedButton).addClass("pressed");

    setTimeout(() => {
        $('#' +pressedButton).removeClass("pressed");
    }, 100);
}

function displayScore()
{
    highScore = JSON.parse(localStorage.getItem('storedScore'));

    $('.high-score').text('High Score: ' + highScore);
}

$('.reset').click(function()
{
    console.log("clicked");
    localStorage.removeItem('storedScore');
    highScore =0;
    storingScore = JSON.stringify(localStorage.setItem('storedScore',highScore));
    $('.high-score').text('High Score: ' + highScore);
    location.reload();
})














