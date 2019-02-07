let chunks = []

cookie = Cookies.get('chunks');

for (i = 0; i < 29; i++) {
    if (chunks.length <= i) {
        chunks.push([]);
    }
    for (j = 0; j < 26; j++) {
        chunks[i].push(document.createElement('a'));
        document.body.appendChild(chunks[i][j]);
        chunks[i][j].classList.add("chunk");
        updateChunk(chunks[i][j], 'unused');
        try {
            updateChunk(chunks[i][j], cookie[i][j].s);
        } catch(e){}

        chunks[i][j].classList.add("unused");
        chunks[i][j].setAttribute('style', 'top:'+(j*64)+"px; left:"+(i*64)+"px");
        chunks[i][j].onclick = function() {
            if (this.classList.contains('unused')) {
                // this.classList.remove('unused');
                // this.classList.add('possible');
                updateChunk(this, 'possible')
            } else if (this.classList.contains('possible')) {
                // this.classList.remove('possible');
                // this.classList.add('active');
                updateChunk(this, 'active')
            } else if (this.classList.contains('active')) {
                // this.classList.remove('active');
                // this.classList.add('unused');
                updateChunk(this, 'unused')
            }
            console.log(JSON.stringify(chunks))
            Cookies.set('chunks', JSON.stringify(chunks), { expires: 365 })
        }
    }
}

// button = document.getElementById('add');
button = document.getElementById('add-chunk');
button.onclick = function() {
    var candidates = document.getElementsByClassName("possible");
    // console.log(candidates)
    var newChunk = candidates[Math.floor(Math.random()*candidates.length)];
    newChunk.classList.remove('possible');
    newChunk.classList.add('active');
    // console.log(newChunk);
    var x = newChunk.style.left.split('px')[0]/64;
    var y = newChunk.style.top.split('px')[0]/64;
    // console.log(newChunk.style.left,newChunk.style.top)
    // console.log(x,y)
    try {
        if (chunks[x-1][y].classList.contains('unused')) {
            // chunks[x-1][y].classList.remove('unused');
            // chunks[x-1][y].classList.add('possible');
            updateChunk(chunks[x-1][y], 'possible')
        }
    } catch(e){}
    try {
        if (chunks[x+1][y].classList.contains('unused')) {
            // chunks[x+1][y].classList.remove('unused');
            // chunks[x+1][y].classList.add('possible');
            updateChunk(chunks[x+1][y], 'possible')
        }
    } catch(e){}
    try {
        if (chunks[x][y-1].classList.contains('unused')) {
            // chunks[x][y-1].classList.remove('unused');
            // chunks[x][y-1].classList.add('possible');
            updateChunk(chunks[x][y-1], 'possible')
        }
    } catch(e){}
    try {
        if (chunks[x][y+1].classList.contains('unused')) {
            // chunks[x][y+1].classList.remove('unused');
            // chunks[x][y+1].classList.add('possible');
            updateChunk(chunks[x][y+1], 'possible')
        }
    } catch(e){}
    console.log(JSON.stringify(chunks))
    Cookies.set('chunks', JSON.stringify(chunks), { expires: 365 })
    console.log("cookie:" + document.cookie)
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return null;
}

function updateChunk(chunk, status) {
    if (status!=='unused') { chunk.classList.remove('unused'); }
    if (status!=='possible') { chunk.classList.remove('possible'); }
    if (status!=='active') { chunk.classList.remove('active'); }
    chunk.classList.add(status)
    chunk.s=status.charAt(0)
}
