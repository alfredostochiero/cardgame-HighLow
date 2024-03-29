const message = document.querySelector(".message");
        const score = document.querySelector(".score");
        const button = document.querySelectorAll("button");
        const gameplay = document.querySelector(".gameplay");
        const recorde = document.querySelector('.record');
        let curCardValue = 0;
        let scoreValue = 0;
        let record;
        if (localStorage.JogoRecord == "undefined"){
        	    localStorage.setItem("JogoRecord",0);
        	} else {
        		record = localStorage.getItem("JogoRecord")
        	}
        recorde.innerHTML = record;
        

        let deck = [];
        const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
        const suits = ["hearts", "diams", "clubs", "spades"];
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener("click", playGame);
        }

        function toggleButtons() {
            button[0].classList.toggle("hideButton");
            button[1].classList.toggle("hideButton");
            button[2].classList.toggle("hideButton");
            
        }

        function playGame(e) {
            let temp = e.target.innerText;
            let myCard = drawCard();
            if (temp == "Start") {
                message.innerHTML = "Maior ou Menor";
                gameplay.innerHTML = "";
                makeCard(myCard);
                toggleButtons();
                return;
            }
          
            if(myCard.value == curCardValue){
                message.innerHTML = "Empatou";
            }else{
                if((temp=="Maior" && (myCard.value >curCardValue)) || (temp == "Menor" && (myCard.value<curCardValue))){
                    scoreValue++;
                    score.innerHTML = scoreValue;
                    
                    message.innerHTML = "Correto, Próximo?";
	                    if(scoreValue > record)
	                    {
		                    record++;   
		                    localStorage.setItem("JogoRecord",record);  
	                		recorde.innerHTML = record; 
		                     
	                    }
	                  
	                   
                   
                    
                }else{
                    message.innerHTML = "Errou! Game Over";
                    
                    scoreValue = 0;
                    score.innerHTML = 0; /* pontuação zera ao perder o jogo   */
                    toggleButtons();
                     
                    
                    
                }
            }
            
            makeCard(myCard);
            
        }

        function drawCard() {
            if (deck.length > 0) {
                let randIndex = Math.floor(Math.random() * deck.length);
                let card = deck.splice(randIndex, 1)[0];
                return card;
            }
            else {
                makeDeck();
                return drawCard();
            }
        }

        function makeDeck() {
            deck = [];
            for (let i = 0; i < suits.length; i++) {
                for (let j = 0; j < ranks.length; j++) {
                    let card = {};
                    card.suit = suits[i];
                    card.rank = ranks[j];
                    card.value = (j + 1);
                    deck.push(card);
                }
            }
        }

        function makeCard(card) {
            let html1 = card.rank + "<br>&" + card.suit + ";";
            let html2 = card.rank + "&" + card.suit + ";";
            let curCards = document.querySelectorAll(".card");
            let div = document.createElement("div");
            div.setAttribute("class", "card");
            div.style.left = (curCards.length * 25) + "px";
            curCardValue = card.value;
            if (card.suit === "hearts" || card.suit === "diams") {
                div.classList.add("red");
            }
            let span1 = document.createElement("span");
            span1.setAttribute("class", "tiny");
            span1.innerHTML = html2;
            div.appendChild(span1);
            let span2 = document.createElement("span");
            span2.setAttribute("class", "big");
            span2.innerHTML = html1;
            div.appendChild(span2);
            gameplay.appendChild(div);
        }