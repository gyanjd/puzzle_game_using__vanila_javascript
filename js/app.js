
var images = { src: 'images/rhino.jpg'};

function label(){
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    startGame(images, gridSize);
}

window.onload = function () {
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    startGame(images, gridSize);
};

function startGame(images, gridSize){
    // console.log(images)
    setImage(images, gridSize);
    document.getElementById('playPanel').style.display = 'block';
    var ul = document.getElementById('sortable');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
};


function setImage(images, gridSize) {

    var percentage = 100 / (gridSize - 1);
    var image = images;

    document.getElementById('actualImage').setAttribute('src', image.src);
    document.getElementById('sortable').innerHTML = '';

    for (var i = 0; i < (gridSize * gridSize); i++) {
        var xpos = (percentage * (i % gridSize)) + '%';
        var ypos = (percentage * Math.floor(i / gridSize)) + '%';

        let li = document.createElement('li');
        li.id = i;
        li.setAttribute('data-value', i);

        if(i != (gridSize * gridSize)-1 ){
            li.style.backgroundImage = 'url(' + image.src + ')';
            li.style.backgroundSize = (gridSize * 100) + '%';
            li.style.backgroundPosition = xpos + ' ' + ypos;
        } else {
            li.setAttribute('class', 'origin');
        }

        li.style.width = 400 / gridSize + 'px';
        li.style.height = 400 / gridSize + 'px';
        

        li.setAttribute('draggable', 'true');
        li.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id);
        li.ondragover = (event) => event.preventDefault();
        li.ondrop = (event) => {
            let origin = document.getElementById(event.dataTransfer.getData('data'));
            let dest = document.getElementById(event.target.id);
            let p = dest.parentNode;

            if (origin && dest && p && dest.className.includes('origin')) {
                let temp2 = dest.nextSibling;
                let temp = origin.nextSibling;
                let x_diff = origin.offsetLeft-dest.offsetLeft;
                let y_diff = origin.offsetTop-dest.offsetTop;

                if(y_diff == 0 && origin.nextSibling && origin.nextSibling.className.includes('origin')){ 
                    moveright();
                }

                else if(y_diff == 0 && origin.previousSibling && origin.previousSibling.className.includes('origin')){ 
                    moveleft();
                }

                else {
                    //UP & DOWN SWAP
                    // let curNode = dest;

                    // var i = 0;
                    // while( (curNode = curNode.previousSibling) != null ) 
                    //   i++;

                    // var originNodeDown = Number(i)-Number(gridSize);
                    // var originNodeUp = Number(i)+Number(gridSize);

                    // console.log(originNodeUp);
                    // console.log(originNodeDown);

                    // if(dest.className.includes('origin') || origin.className.includes('origin')){
                        p.insertBefore(origin, dest);
                        p.insertBefore(dest, temp);
                    // }
                }

                let vals = Array.from(document.getElementById('sortable').children).map(x => x.id);

                if (isSorted(vals)) {
                    document.getElementById('actualImageBox').append('<h1>Game Over</h1>');
                }
            }
        };
        li.setAttribute('dragstart', 'true');
        document.getElementById('sortable').appendChild(li);
    }

    var ul = document.getElementById('sortable');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
};


window.addEventListener('keydown', function (e) {
    
    key = e.keyCode;
    if(key==37){
        e.preventDefault();
        moveleft();
    }
    if(key==38){
        e.preventDefault();
        moveup();
    }
    if(key==39){
        e.preventDefault();
        moveright();
    }
    if(key==40){
        e.preventDefault();
        movedown();
    }
});

function moveleft(){
    let origin = document.getElementsByClassName('origin')[0].nextSibling;
    console.log('ff');
    if(origin){
        console.log('ff');

        let p = origin.parentNode;
        let dest = origin.previousSibling;

        let x_diff = origin.offsetLeft-dest.offsetLeft;
        let y_diff = origin.offsetTop-dest.offsetTop;

        if(y_diff == 0){ //&& x_diff == 133
            p.insertBefore(origin, dest);
        }

        let vals = Array.from(document.getElementById('sortable').children).map(x => x.id);
        if (isSorted(vals)) {
            document.getElementById('actualImageBox').append('<h1>Game Over</h1>');
        }
    }
}

function moveright(){
    let origin = document.getElementsByClassName('origin')[0].previousSibling;
        console.log('d');

    if(origin){
        console.log('d');

        let p = origin.parentNode;
        let dest = origin.nextSibling;

        let x_diff = origin.offsetLeft-dest.offsetLeft;
        let y_diff = origin.offsetTop-dest.offsetTop;

        if(y_diff == 0){ // && x_diff == -133
            p.insertBefore(dest, origin);
        }
        let vals = Array.from(document.getElementById('sortable').children).map(x => x.id);
        if (isSorted(vals)) {
            document.getElementById('actualImageBox').append('<h1>Game Over</h1>');
        }
    }
}

function moveup(){
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    let curNode = document.getElementsByClassName('origin')[0];
    let origin = curNode;
    let dest = origin;

    var i = 0;
    while( (curNode = curNode.previousSibling) != null ) 
      i++;
    
    var originNode = Number(i)+Number(gridSize);
    if(originNode < (gridSize*gridSize)){
        origin = origin.parentNode.childNodes[originNode];
        let temp = origin.nextSibling;

        let p = origin.parentNode;

        let x_diff = origin.offsetLeft-dest.offsetLeft;
        let y_diff = origin.offsetTop-dest.offsetTop;

        if(x_diff == 0){ //y_diff == 133 && 
            //UP SWAP
            p.insertBefore(origin, dest);
            p.insertBefore(dest, temp);
        }

        let vals = Array.from(document.getElementById('sortable').children).map(x => x.id);
        if (isSorted(vals)) {
            document.getElementById('actualImageBox').append('<h1>Game Over</h1>');
        }
    }
}


function movedown(){
    var gridSize = document.querySelector('#levelPanel input[type="radio"]:checked').getAttribute('value');
    let curNode = document.getElementsByClassName('origin')[0];
    let origin = curNode;
    let dest = origin;

    var i = 0;
    while( (curNode = curNode.previousSibling) != null ) 
      i++;
    
    var originNode = Number(i)-Number(gridSize);
    if(originNode >= 0){
        origin = origin.parentNode.childNodes[originNode];
        let temp2 = dest.nextSibling;
        
        let p = origin.parentNode;

        let x_diff = origin.offsetLeft-dest.offsetLeft;
        let y_diff = origin.offsetTop-dest.offsetTop;

        if(x_diff == 0){ //y_diff == -133 && 
            //DOWN SWAP
            p.insertBefore(dest, origin);
            p.insertBefore(origin, temp2);
        }

        let vals = Array.from(document.getElementById('sortable').children).map(x => x.id);
        if (isSorted(vals)) {
            document.getElementById('actualImageBox').append('<h1>Game Over</h1>');
        }
    }
}

isSorted = (arr) => {
    arr.every((elem, index) => {
        return elem == index; 
    });
}
