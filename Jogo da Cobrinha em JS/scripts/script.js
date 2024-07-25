window.onload = function () {
    // get the canvas element by ID
    const area = document.getElementById('backgroundSquare')
    // sets the context of the area element to 2d
    const ctx = area.getContext("2d")

    // number of houses the snake will walk in each frame update 
    const speed = 1

    // inicial speed
    let sx = 0
    let sy = 0

    // starting point of the snake
    let px = 10
    let py = 15

    // initial position of the "apple" that will be eaten by the little piece
    let applex = 15
    let appley = 15

    // part size
    const size = 20
    // quantity of pieces
    const qtd = 30

    // array for snake trail
    let trail = []
    let tail = 1

    let intervalTime = 120;

    // hide modal at the beginning
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';

    // closes the modal when clicking the Play Again button
    var closeButton = document.querySelector('.close');
    closeButton.onclick = function () {
        modal.style.display = 'none';
    }

    // calculates the game score
    let score = 0;
    let highestScore = 0
    document.getElementById("recorde").innerHTML = "Recorde: 0"

    // triggers the function every time a keyboard key is pressed
    document.addEventListener("keydown", keyPush)
    // game function will be called every 120 milliseconds
    let gameInterval = setInterval(game, intervalTime)

    function game() {
        px += sx
        py += sy

        //controle da cobra dentro do quadro para repetição nas bordas
        if (px < 0) {
            px = qtd - 1
        }
        if (px > qtd - 1) {
            px = 0
        }
        if (py < 0) {
            py = qtd - 5
        }
        if (py > qtd - 1) {
            py = 0
        }

        ctx.fillStyle = "#111D4A" //blue
        ctx.fillRect(0, 0, area.width, area.height)

        ctx.fillStyle = "#EA2B1F"; // red

        // calculates the coordinates of the center of the circle
        let centerX = applex * size + size / 2;
        let centerY = appley * size + size / 2;
        let radius = size / 2;

        // draw the circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();

        for (let i = 0; i < trail.length; i++) {
            ctx.fillStyle = "#09BC8A";
            ctx.fillRect(trail[i].x * size, trail[i].y * size, size, size);
            ctx.strokeRect(trail[i].x * size, trail[i].y * size, size, size);
            if (trail[i].x === px && trail[i].y === py) {
                if (trail.length > 2) {
                    var scoreText = document.querySelector('#score');
                    modal.style.display = "";
                    document.getElementById("score").innerHTML = "Pontuação: " + score
                    if (highestScore < score) {
                        highestScore = score;
                        console.log(score)
                        console.log(highestScore)
                        scoreText.style.color = "#3cef3c"
                        intervalTime = 120;
                        clearInterval(gameInterval);
                        gameInterval = setInterval(game, intervalTime);
                    } else {
                        scoreText.style.color = "red"
                    }
                    document.getElementById("recorde").innerHTML = "Recorde: " + highestScore
                }
                sx = 0;
                sy = 0;
                tail = 1
                score = 0;
            }
        }

        trail.push({ x: px, y: py })

        while (trail.length > tail) {
            trail.shift()
        }

        if (applex == px && appley == py) {
            tail++
            score++
            if (score % 5 === 0) {
                intervalTime -= 17;  // Aumenta o intervalo em 2ms
                clearInterval(gameInterval);  // Limpa o intervalo atual
                gameInterval = setInterval(game, intervalTime);  // Define o novo intervalo
            }

            applex = Math.floor(Math.random() * qtd)
            appley = Math.floor(Math.random() * (qtd - 5))
        }
    }

    window.addEventListener("keydown", function (e) {
        // arrow keys
        if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    // stores the last arrow pressed
    let lastKeyPressed = ""

    function keyPush(e) {
        switch (e.keyCode) {
            case 37: // left
                if (lastKeyPressed != "right") {
                    sx = -speed
                    sy = 0
                    lastKeyPressed = "left"
                }
                break
            case 38: // up
                if (lastKeyPressed != "down") {
                    sx = 0
                    sy = -speed
                    lastKeyPressed = "up"
                }
                break
            case 39: // right
                if (lastKeyPressed != "left") {
                    sx = speed
                    sy = 0
                    lastKeyPressed = "right"
                }
                break
            case 40: // down
                if (lastKeyPressed != "up") {
                    sx = 0
                    sy = speed
                    lastKeyPressed = "down"
                }
                break
        }
    }

}
