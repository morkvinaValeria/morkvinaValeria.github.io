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
if (window.localStorage) {
    if (localStorage.getItem('check') == null) { localStorage.setItem('check', 0); }
    else if (localStorage.getItem('check') == 0) { document.querySelector('#side-box-2').style.fontWeight = 'normal' }
    else { document.querySelector('#side-box-2').style.fontWeight = 'bold' }
}
function clickMeBold() {
    if (document.querySelector('#to-bold').checked === true) {
        localStorage.setItem('check', 1);
        document.querySelector('#side-box-2').style.fontWeight = 'normal';
    }
    if (document.querySelector('#to-bold').checked === false) {
        localStorage.setItem('check', 0);
        document.querySelector('#side-box-2').style.fontWeight = 'bold';
    }
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
