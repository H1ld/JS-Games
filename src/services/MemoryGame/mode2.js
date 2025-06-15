function setupScript2() {

    const emojis = ["😁","😁","😎","😎","💖","💖","😒","😒","😡","😡","👽","👽","🔥","🔥","✌️","✌️"];
    let gameStarted = false;

    function startGame() {
        document.getElementById('startButton').style.display = 'none';
        if (!gameStarted) {
            gameStarted = true;
            for (let i = emojis.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
            }

            for (let i = 0; i < emojis.length; i++) {
                let box = document.createElement('div');
                box.className = 'item';
                box.innerHTML = emojis[i];
                box.onclick = function(){
                    if (!this.classList.contains('boxOpen')) {
                        this.classList.add('boxOpen');
                        let openBoxes = document.querySelectorAll('.boxOpen');
                        if (openBoxes.length === 2) {
                            if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                                openBoxes.forEach(box => box.classList.add('boxMatch'));
                                openBoxes.forEach(box => box.classList.remove('boxOpen'));
                                if (document.querySelectorAll('.boxMatch').length === emojis.length) {
                                    alert('Felicitation!🎉🎉🎉🎉');
                                }
                            } else {
                                setTimeout(() => {
                                    openBoxes.forEach(box => box.classList.remove('boxOpen'));
                                }, 500);
                            }
                        }
                    }
                };

                document.querySelector('.game-grid').appendChild(box);
            }

            const todasAsCaixas = document.querySelectorAll('.item');
            setTimeout(() => {
                openBoxesForTime(todasAsCaixas, 5000);
            }, 1000);
        }
    }

    document.getElementById('startButton').addEventListener('click', startGame);

    function openBoxesForTime(caixas, tempo) {
        caixas.forEach(caixa => caixa.classList.add('boxOpen'));
        setTimeout(() => {
        
            caixas.forEach(caixa => caixa.classList.remove('boxOpen'));
        }, tempo);
    }
}

setupScript2();
