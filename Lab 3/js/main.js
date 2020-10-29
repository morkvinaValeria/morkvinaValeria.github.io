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
})


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