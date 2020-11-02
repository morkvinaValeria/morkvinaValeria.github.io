// 1 task
button.onclick = function () { swapBlocks('header  h1', 'footer h1') };
function swapBlocks(x, y) {
    let temp = document.querySelector(x).innerHTML;
    document.querySelector(x).innerHTML = document.querySelector(y).innerHTML;
    document.querySelector(y).innerHTML = temp;
}

// 2 task
document.querySelector('.main-cell img').onclick = function () {

    const side1 = 10;
    const side2 = 20;
    document.querySelector('.main-cell #result').textContent +=
        ' S = ' + areaOfRectangle(side1, side2);
};
function areaOfRectangle(side1, side2) {
    return side1 * side2;
}


// 3 task
document.querySelector('#form-min-max').onsubmit = function (event) {
    event.preventDefault();
    let max = Math.max.apply(Math, document.querySelector('#form-min-max input[name="to-find-min-max"]').value.split(" "));
    let min = Math.min.apply(Math, document.querySelector('#form-min-max input[name="to-find-min-max"]').value.split(" "));
    document.cookie = 'max =' + max;
    document.cookie = 'min =' + min;
    document.querySelector('#form-min-max').reset();
    alert('MAX = ' + max + ', MIN = ' + min);
}
window.addEventListener('load', function () {
    if (getCookie('max')) {
        document.querySelector('#form-min-max').style = "display:none;";
        setTimeout(() => {
            if (confirm(getCookie('max') + "\nAfter you click \"OK\" cookies will be deleted !!!")) {
                document.cookie = 'max =' + getCookie('max') + '; max-age=0';
                alert('Cookies removed !!!');
                location.reload()
            }
        }, 100);
    }
    if (getCookie('min')) {
        document.querySelector('#form-min-max').style = "display:none;";
        setTimeout(() => {
            if (confirm(getCookie('min') + "\nAfter you click \"OK\" cookies will be deleted !!!")) {
                document.cookie = 'min =' + getCookie('min') + '; max-age=0';
                alert('Cookies removed !!!');
                location.reload()
            }
        }, 100);
    }
})
function getCookie(cname) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++)
        if (cookies[i].trim().split('=')[0] == cname)
            return cookies[i].trim().split('=')[1];
    return null;
}

//task4
if (window.localStorage) {
    if (localStorage.getItem('to-bold') == null) { localStorage.setItem('to-bold', 'false'); }
    else if (localStorage.getItem('to-bold') == 'false') {
        document.querySelector('.side-box-2').style.fontWeight = 'normal';
    }
    else if (localStorage.getItem('to-bold') == 'true') {
        document.querySelector('.side-box-2').style.fontWeight = 'bold';
        document.getElementById("to-bold").setAttribute('checked', 'checked');
    }
    else {
        document.querySelector('.side-box-2').style.fontWeight = 'normal';
    }
}
function changeFontWeight() {
    if (document.querySelector('#to-bold').checked === true) {
        localStorage.setItem('to-bold', 'true');
        document.querySelector('.side-box-2').style.fontWeight = 'bold';
    }
    if (document.querySelector('#to-bold').checked === false) {
        localStorage.setItem('to-bold', 'false');
        document.querySelector('.side-box-2').style.fontWeight = 'normal';
    }
}

//task5
document.getElementById('inp').onfocus = function () { inpFocus('inp') };
document.getElementById('inp').onblur = function () { inpBlur('inp') };
function inpFocus(block) {
    document.getElementById(block).style.backgroundColor = "pink";
    inp.value = 'Focus is here';
}
function inpBlur(block) {
    inp.value = 'Focus has been lost';
    document.getElementById(block).style.backgroundColor = "lightgoldenrodyellow";
}

//6 task
document.addEventListener('DOMContentLoaded', () => {
    makeEditableBlock('side-box-2-c');
    makeEditableBlock('main-cell-c');
    makeEditableBlock('menu-cell-c');
    makeEditableBlock('side-box-1-c');
    initEditableBlocks();
})

const initEditableBlocks = () => { 
    Array.from(document.getElementsByClassName('editArea')).map((area) => {
        area.addEventListener('change', (event) => {
            const newContent = event.target.value;
            if (isValidHTML(newContent)) {
                localStorage.setItem(`${event.target.parentNode.id}Content`, newContent);
                event.target.parentNode.children[0].innerHTML = newContent;
            }
            else {
                localStorage.removeItem(`${event.target.parentNode.id}Content`);
                document.location.reload();
            }
        })
    })
    Array.from(document.getElementsByClassName('editBtn')).map((btn) => {
        btn.addEventListener('click', (event) => {
            localStorage.removeItem(`${event.target.parentNode.id}Content`);
            document.location.reload();
        })
    })
}
const makeEditableBlock = (blockId) => {
    const content = localStorage.getItem(`${blockId}Content`) ?
        localStorage.getItem(`${blockId}Content`) :
        document.getElementById(blockId).innerHTML;
    document.getElementById(blockId).innerHTML = content;
    document.getElementById(blockId).insertAdjacentHTML('beforeend',
        `<textarea class="editArea">${content}</textarea>
  <button type="submit" class="editBtn">Return</button>`)
}
const isValidHTML = (html) => {
    const doc = document.createElement('div');
    doc.innerHTML = html;
    return doc.innerHTML === html;
};
