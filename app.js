

//Randomize Array
function shuffle(arr) {
    var ctr = arr.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}


// Generate Random Images
function randomizeImages () {

	var loadImages = document.querySelector('#images_container');

	let arrImg = [1,2,3,4,5,6,1,2,3,4,5,6]
	shuffle(arrImg);

	for (let k=0; k<total_cards; k++) {

		let img_div = document.createElement('div');
		img_div.classList.add('divi');

		let img = document.createElement('img');
		img.src = 'images/paint' + arrImg[k] + '.jpeg'
		img.style.visibility = 'hidden';
		
		img_div.appendChild(img);
		loadImages.appendChild(img_div);
	}
}

function storage () {

	document.getElementById("lowest").textContent = sessionStorage.getItem("lowest_score") || 'N/A';
}

function main() {

	storage();
	randomizeImages();
}

const total_cards = 12;
var total_clicks = 0;
var cards_open = 0;
var previousImg = '';


//Reset Button - Event Listener
resetGame.addEventListener ('click', function (event) {

	if (cards_open === total_cards) {
		if (document.getElementById("lowest").textContent == 'N/A') {
			sessionStorage.setItem("lowest_score", total_clicks);	
		} else {
			sessionStorage.setItem("lowest_score", Math.min(total_clicks, sessionStorage.getItem("lowest_score")));	
		}
	}
	window.location.reload(true);
});


//Flip Images - Event Listener
images_container.addEventListener('click', function (event) {

    if (event.target.classList == "divi") {
    	var childImg = event.target.firstElementChild;
    	childImg.style.visibility = 'visible';
    	total_clicks++;
    	document.getElementById("score").textContent = total_clicks;
    }

    if (!previousImg) {
    	previousImg = childImg;

    } else {

    	setTimeout(function(){

	    	if (previousImg.src === childImg.src) {
	    		cards_open += 2;
	    		document.getElementById("open").textContent = cards_open;
	    	} else {
	    		childImg.style.visibility = 'hidden';
	    		previousImg.style.visibility = "hidden";
	    	}
	    	previousImg = '';

	    }, 500); 
    }

 });

document.onload = main();
