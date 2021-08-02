document.addEventListener('DOMContentLoaded', () =>{
    //open and close menu
    $( "#openNav" ).click(function() {
        document.getElementById("sidenav").style.width = "250px";
    });
    $( "#closeNav" ).click(function() {
        document.getElementById("sidenav").style.width = "0";
    });

    const grid = document.querySelector('.grid')
    const width = 14
    const height = 8

    //layout of grid and what is in the squared
    //0 - grass | 1 - road | 1.1 - curve-1 | 1.2 - curve-2 | 1.3 - curve-3 | 1.4 - curve-4
    //| 2 - about | 3 - contact | 4 - skills | 5 - portfolio 
    const layout =[
        0,0,0,0,0,0,0,2,0,0,0,0,0,0,
        0,0,0,1.1,1,1,1,1.3,0,0,0,0,0,0,
        0,0,0,1,0,0,0,0,0,0,0,0,0,0,
        1.1,1,1,1,1,1,1,1,1,1,1,1,3,0,
        1,0,0,0,0,1,0,0,0,1,0,0,0,0,
        1,0,0,0,0,1,0,0,0,1.2,1,1.4,0,0,
        1,0,0,0,0,4,0,0,0,0,0,5,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0
    ]
    const squares = []

    function createBoard(){
        for (let i = 0; i < layout.length; i++){
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            var grass = ['grass-1', 'grass-2', 'grass-1'];
            var randomGrass = grass[Math.floor(Math.random()*grass.length)];

            //add layout to the board
            if(layout[i] === 0){
                squares[i].classList.add(randomGrass)
            }
            else if(layout[i] === 1){
                squares[i].classList.add('road')  
            }
            else if(layout[i] === 1.1){
                squares[i].classList.add('curve-1')  
            }
            else if(layout[i] === 1.2){
                squares[i].classList.add('curve-2')  
            }
            else if(layout[i] === 1.3){
                squares[i].classList.add('curve-3')  
            }
            else if(layout[i] === 1.4){
                squares[i].classList.add('curve-4')  
            }
            else if(layout[i] === 2){
                squares[i].classList.add('about')  
            }
            else if(layout[i] === 3){
                squares[i].classList.add('contact')  
            }
            else if(layout[i] === 4){
                squares[i].classList.add('skills')  
            }
            else if(layout[i] === 5){
                squares[i].classList.add('portfolio')  
            }
        }
    }
    createBoard()

    // show text
    function showText(e){
        if(!squares[playerCurrentIndex -width]?.classList.contains('about') &&
            !squares[playerCurrentIndex +width]?.classList.contains('skills') &&
            !squares[playerCurrentIndex +width]?.classList.contains('portfolio') &&
            !squares[playerCurrentIndex +1]?.classList.contains('contact') && 
            e == null || e == 0
        ){
            document.getElementById("sidenav").style.width = "0";
            $("#index").show();
            $("#about").hide();
            $("#skills").hide();
            $("#portfolio").hide();
            $("#contact").hide();
        }
        else if(squares[playerCurrentIndex -width]?.classList.contains('about') || 
            e == 1
        ){
            document.getElementById("sidenav").style.width = "0";
            $("#index").hide();
            $("#about").show();
            $("#skills").hide();
            $("#portfolio").hide();
            $("#contact").hide();
        }
        else if(squares[playerCurrentIndex +1]?.classList.contains('contact')| 
            e == 4
        ){
            document.getElementById("sidenav").style.width = "0";
            $("#index").hide();
            $("#about").hide();
            $("#skills").hide();
            $("#portfolio").hide();
            $("#contact").show();
        }
        else if(squares[playerCurrentIndex +width]?.classList.contains('skills')| 
            e == 2
        ){
            document.getElementById("sidenav").style.width = "0";
            $("#index").hide();
            $("#about").hide();
            $("#skills").show();
            $("#portfolio").hide();
            $("#contact").hide();
        }
        else if(squares[playerCurrentIndex +width]?.classList.contains('portfolio')| 
            e == 3
        ){
            document.getElementById("sidenav").style.width = "0";
            $("#index").hide();
            $("#about").hide();
            $("#skills").hide();
            $("#portfolio").show();
            $("#contact").hide();
        }

    }
    const navAHome = document.querySelector('.navAHome');
    navAHome.addEventListener('click', () => showText(0));
    const navAbout = document.querySelector('.navAbout');
    navAbout.addEventListener('click', () => showText(1));
    const navSkills = document.querySelector('.navSkills');
    navSkills.addEventListener('click', () => showText(2));
    const navPortfolio = document.querySelector('.navPortfolio');
    navPortfolio.addEventListener('click', () => showText(3));
    const navContact = document.querySelector('.navContact');
    navContact.addEventListener('click', () => showText(4));

    //starting position of player
    let playerCurrentIndex = 98

    squares[playerCurrentIndex].classList.add('player', 'back')

    const arrowLeft = document.querySelectorAll(".arrow-left")
    const arrowTop = document.querySelectorAll(".arrow-top")
    const arrowRight = document.querySelectorAll(".arrow-right")
    const arrowBottom = document.querySelectorAll(".arrow-bottom")

    function movePlayer(e){
        squares[playerCurrentIndex].classList.remove('player','back')
        squares[playerCurrentIndex].classList.remove('player','front')
        squares[playerCurrentIndex].classList.remove('player','left')
        squares[playerCurrentIndex].classList.remove('player','right')

        switch(e.keyCode) {
            case 37:
                if(playerCurrentIndex % width !== 0 && 
                    squares[playerCurrentIndex -1]?.classList.contains('road') ||
                    squares[playerCurrentIndex -1]?.classList.contains('curve-1') ||
                    squares[playerCurrentIndex -1]?.classList.contains('curve-2') ||
                    squares[playerCurrentIndex -1]?.classList.contains('curve-3') ||
                    squares[playerCurrentIndex -1]?.classList.contains('curve-4')
                ){
                    playerCurrentIndex -= 1
                }
                showText();
                squares[playerCurrentIndex].classList.add('player','left')

                break
            case 38:
                if(playerCurrentIndex - width >= 0 && 
                    squares[playerCurrentIndex -width]?.classList.contains('road')||
                    squares[playerCurrentIndex -width]?.classList.contains('curve-1') ||
                    squares[playerCurrentIndex -width]?.classList.contains('curve-2') ||
                    squares[playerCurrentIndex -width]?.classList.contains('curve-3') ||
                    squares[playerCurrentIndex -width]?.classList.contains('curve-4')
                ) {
                    playerCurrentIndex -= width
                }
                showText();
                squares[playerCurrentIndex].classList.add('player','back')

                break
            case 39:
                if(playerCurrentIndex % width < width - 1 && 
                    squares[playerCurrentIndex +1]?.classList.contains('road')||
                    squares[playerCurrentIndex +1]?.classList.contains('curve-1') ||
                    squares[playerCurrentIndex +1]?.classList.contains('curve-2') ||
                    squares[playerCurrentIndex +1]?.classList.contains('curve-3') ||
                    squares[playerCurrentIndex +1]?.classList.contains('curve-4')
                ){
                    playerCurrentIndex += 1
                }
                showText();
                squares[playerCurrentIndex].classList.add('player','right')

                break
            case 40:
                if (playerCurrentIndex + width < width * height && 
                    squares[playerCurrentIndex +width].classList.contains('road')||
                    squares[playerCurrentIndex +width]?.classList.contains('curve-1') ||
                    squares[playerCurrentIndex +width]?.classList.contains('curve-2') ||
                    squares[playerCurrentIndex +width]?.classList.contains('curve-3') ||
                    squares[playerCurrentIndex +width]?.classList.contains('curve-4')
                ){
                    playerCurrentIndex += width
                }
                showText();
                squares[playerCurrentIndex].classList.add('player','front')

                break
        }
    }

    //document.addEventListener('keyup', movePlayer)
    arrowLeft[0].addEventListener('click', () => movePlayer({ keyCode: 37 }))
    arrowTop[0].addEventListener('click', () => movePlayer({ keyCode: 38 }))
    arrowRight[0].addEventListener('click', () => movePlayer({ keyCode: 39 }))
    arrowBottom[0].addEventListener('click', () => movePlayer({ keyCode: 40 }))

    $(function($){

        $("form").submit(function(event) {
    
            event.preventDefault();
    
            $.ajax({
            url: "https://formspree.io/f/xbjqzool", 
            method: "POST",
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                message: $("#message").val()
            },
            dataType: "json"
            }).done(function(){
                $("#name").val("");
                $("#email").val("");
                $("#message").val("");
                $("#contact").hide();
                $("#msgForm").show();
                $("#msgForm .title").html("Email successfully sent!");
                $("#msgForm a").html("Return");
            }).fail(function(){
                $("#contact").hide();
                $("#msgForm").show();
                $("#msgForm .title").html("Error sending email!");
                $("#msgForm a").text("Retry");
            });
        });
    }) ;

    $( "#btnReturn" ).click(function() {
        $("#contact").show();
        $("#msgForm").hide();
    });
})