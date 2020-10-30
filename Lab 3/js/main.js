// 1 task
button.onclick = function () { swapBlocks('header  h1', 'footer h1') };

// 2 task
document.querySelector('.main-cell img').onclick = function () {

    const side1 = 10;
    const side2 = 20;
    document.querySelector('.main-cell #result').textContent +=
        ' S = ' + areaOfRectangle(side1, side2);
};

// 3 task
document.querySelector('#form-min-max').onsubmit = function (event) {
    event.preventDefault();
    let max = Math.max.apply(Math,document.querySelector('#form-min-max input[name="to-find-min-max"]').value.split(" "));
    let min = Math.min.apply(Math, document.querySelector('#form-min-max input[name="to-find-min-max"]').value.split(" "));
    document.cookie = 'max =' + max;
    document.cookie = 'min =' + min;
    document.querySelector('#form-min-max').reset();
    alert('MAX = '+max + ', MIN = '+ min);
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

//task4
loadFontWeight('doFontWeight')
document.getElementById('form-bold').onchange = function (event) {
    event.preventDefault();
    if (document.querySelector('#form-bold input[name="to-bold"]').checked) {
        var doFontWeight = true;
    }
    else {
        var doFontWeight = false;
    }
    localStorage.setItem('doFontWeight', doFontWeight);
    loadFontWeight('doFontWeight');
}


function loadFontWeight(localStorageKey) {
    if (localStorage.getItem(localStorageKey)) {
        if (localStorage.getItem(localStorageKey) == true) {
            changeFontWeight('side-box-2');
            document.querySelector('form-bold').setAttribute("checked");
        }
        else {
            document.getElementById('side-box-2').style.fontWeight = 'normal';
            document.getElementById('form-bold').removeAttribute("checked"); 
        }
    }
}
function changeFontWeight(block) {
    let elem = document.getElementById(block);
    elem.outerHTML = '<b>' + elem.innerHTML + '</b>';
}

function swapBlocks(x,y)
{
    let temp = document.querySelector(x).innerHTML;
    document.querySelector(x).innerHTML = document.querySelector(y).innerHTML;
    document.querySelector(y).innerHTML = temp;
}

function areaOfRectangle(side1, side2) {
    return side1 * side2;
}
function getCookie(cname) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++)
        if (cookies[i].trim().split('=')[0] == cname)
            return cookies[i].trim().split('=')[1];
    return null;
}
