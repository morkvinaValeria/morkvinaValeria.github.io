createFormForGit('.side-box-2');//task 3
createFormForSort('.main-cell');// task 5
changeContentWithDelay(['.side-box-1', '.main-cell', '.side-box-2'], 5000);//task 1
document.getElementById('inp').onfocus = function () { inpFocus('inp', 5000) };//task 2(part 1)
ChangeFontWeightWithDelay(5000);//task 2 (part 2)
document.getElementById('inp').onblur = function () { inpBlur('inp') };
takeTwoCallBacks(func1, func2); //task 4

//task 1
async function changeContentWithDelay(contentBlockNames, delay = 0) {
    let blocks = [];
    contentBlockNames.forEach(block => {
        blocks.push(document.querySelector(block).innerHTML);
    });
    for (let index = 0; index < blocks.length - 1; index++) {
        await sleep(delay + 5000*index);
        document.querySelector(contentBlockNames[index + 1]).innerHTML = blocks[index];
    }
    await sleep(15000);
    document.querySelector(contentBlockNames[0]).innerHTML = blocks[blocks.length - 1];
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//task 2
function ChangeFontWeightWithDelay(delay) {
    setInterval(() => {
        var blockContent = document.getElementById('main-cell');
        blockContent.style.fontWeight == 'bold' ? blockContent.style.fontWeight = 'normal' : blockContent.style.fontWeight='bold';
    }, delay);
}
function inpFocus(block) {
    document.getElementById(block).style.backgroundColor = "pink";
    inp.value = 'Focus is here';

    headerFW("text1", 5000);
    headerFW("text6", 5000);
}
function headerFW(blockid, delay) {
    setTimeout(() => {
        var blockContent = document.getElementById(blockid);
        blockContent.style.fontWeight == 'normal' ? blockContent.style.fontWeight = 'bold' : blockContent.style.fontWeight = 'normal';
    }, delay);
}
function inpBlur(block) {
    inp.value = 'Focus has been lost';
    document.getElementById(block).style.backgroundColor = "lightgoldenrodyellow";
}

//task 3
function createFormForGit(blockName) {
    let gitform = document.createElement("form");
    gitform.id = 'form-git';

    let username = document.createElement("input");
    username.setAttribute('type', "text");
    username.setAttribute('name', "username");
    username.setAttribute('placeholder', "Username");
    username.setAttribute('required', true);

    let repositoryName = document.createElement("input");
    repositoryName.setAttribute('type', "text");
    repositoryName.setAttribute('name', "repository-name");
    repositoryName.setAttribute('placeholder', "Repository name");
    repositoryName.setAttribute('required', true);

    let submitButton = document.createElement("button");
    submitButton.setAttribute('type', "submit");
    submitButton.textContent = "Get commits";
    submitButton.style ="color:darkblue; font-weight:bold; background-color:aliceblue; border:5px;"

    gitform.append(username);
    gitform.append(repositoryName);
    gitform.append(submitButton);

    document.querySelector(blockName).append(gitform);
}
async function displayCommits(blockName) {
    let username = document.querySelector('#form-git > input[name="username"]').value;
    let repositoryName = document.querySelector('#form-git > input[name="repository-name"]').value;

    let response = await fetch(`https://api.github.com/repos/${username}/${repositoryName}/commits`);

    let divElement = document.createElement('div');
    divElement.id = "commits-content";
    divElement.style.height = "15%";
    divElement.style.overflow = "auto";

    let ulElement = document.createElement('ul');
    if (response.ok) {
        response.json().then(data => data.forEach(c => {
            let liElement = document.createElement('li');
            liElement.textContent = `${c.commit.author.name} : ${c.commit.message}`;
            ulElement.append(liElement);
        }));
        divElement.append(ulElement);
    }
    else {
        let pElement = document.createElement('p');
        pElement.textContent = `Error : ${response.status}(${response.statusText})`;
        pElement.style = 'color:red; display:border-box; border-bottom: solid 0.1em red;';
        divElement.append(pElement);
    }
    document.querySelector(blockName).appendChild(divElement);
}

document.addEventListener('submit', function (event) {
    //task 3
    if (event?.target.id == 'form-git') {
        event.preventDefault();
        if (document.querySelector('#commits-content')) {
            document.querySelector('#commits-content').remove();
        }
        displayCommits('#' + document.querySelector('#form-git').parentNode.id);
        document.querySelector('#form-git').reset();
    }
    //task 5
    if (event?.target.id == 'form-sort') {
        event.preventDefault();
        if (document.querySelector('#sort-content')) {
            document.querySelector('#sort-content').remove();
        }
        displayList('#' + document.querySelector('#form-sort').parentNode.id);
        document.querySelector('#form-sort').reset();
    }
});

//task 4
function func1() {
    // Code
}
async function func2() {
    // Code
    await sleep(3000);
}
async function takeTwoCallBacks(func1, func2) {
    await func1();
    console.log("function1 has finished");
    await func2();
    console.log("function2 has finished");
}

//task 5
function createFormForSort(blockName) {
    let sortform = document.createElement("form");
    sortform.id = 'form-sort';
    sortform.style = 'display:flex; flex-direction:column; border:solid 1px rgb(150, 45, 45);';

    let listOfValues = document.createElement("input");
    listOfValues.setAttribute('type', "text");
    listOfValues.setAttribute('name', "list-of-values");
    listOfValues.setAttribute('placeholder', "List of values");
    listOfValues.setAttribute('required', true);

    let submitButton = document.createElement("button");
    submitButton.setAttribute('type', "submit");
    submitButton.textContent = "Sort";
   // submitButton.style = "color:darkslateblue; font-weight:bold; background-color:aliceblue; border:5px;"

    sortform.append(listOfValues);
    sortform.append(submitButton);

    document.querySelector(blockName).append(sortform);
}
function displayList() {
    let listOfValues = document.querySelector('#form-sort > input[name="list-of-values"]').value;
    let regex = /\d+/g
    let matches = listOfValues.match(regex);
    if (matches != null) {
        let items = matches.map(Number);
        console.log('List:');
        console.log(items.slice());
        console.log('Sorted list:')
        console.log(quickSort(items, 0, items.length - 1));
    }
    else
        console.log("Error: no numbers in a list");
}

function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], 
        i = left, 
        j = right; 
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); 
            i++;
            j--;
        }
    }
    return i;
}
function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); 
        if (left < index - 1) { 
            quickSort(items, left, index - 1);
        }
        if (index < right) { 
            quickSort(items, index, right);
        }
    }
    return items;
}
