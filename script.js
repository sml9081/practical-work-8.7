let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

let answerNumber;
searchNumber();

let orderNumber = 1;
let gameRun = true;


const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
putText();

// Проверка через операцию  дизъюнкции при вводе текста который не интерпритируется как число(NaN)
if (isNaN(minValue) || isNaN(maxValue)) {
    minValue = 0;
    maxValue = 100;
}

// Тенарный оператор установливает ближайшую границу для минимальных и максимальных чисел 
if (!isNaN(minValue)){
    minValue = (minValue <=-1000) ? -999 : minValue;
} else {
    minValue = 0;
}

if (!isNaN(maxValue)){
    maxValue = (maxValue >= 1000) ? 999 : maxValue;
} else {
    maxValue = 100;
}

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
})

document.getElementById('btnOver').addEventListener('click', function () {

    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            searchNumber('>');
            orderNumber++;
            orderNumberField.innerText = orderNumber; 
            putText();
        }
    }
    
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            searchNumber('<');
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            putText();
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        let phraseRandom = Math.round(Math.random() * 3);
        let answerPhrase;
        if (phraseRandom === 1) {
                answerPhrase = 'Я всегда угадываю!\n\u{1F44C}';
        } else if (phraseRandom === 2) {
               answerPhrase = 'Угадал!\n\u{1F60E}';
            } else {
               answerPhrase = 'Это было просто\n\u{1F525}';
            };
        answerField.innerText = answerPhrase;
        gameRun = true;
    }
})

document.getElementById('btnRetry').addEventListener('click', function () {

    if (gameRun)
    
    minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
    maxValue = parseInt(prompt('Максимальное знание числа для игры','1000'));
    
    if (isNaN(minValue) || isNaN(maxValue)) {
        minValue = 0;
        maxValue = 100;
    }
    
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Давай сыграем снова\n\u{1F60E}`;
    searchNumber();
    putText();
}) 


// разделение числа на разряды: сотни, десятки, единицы
function numberToUnits(n){
    if (n == 0){
        return [0];
    }
    let arr = [];
    let i = 1;
    while (n > 0) {
        arr.unshift((n % 10) * i);
        n = Math.floor(n / 10);
        i *= 10
    }
    return arr;
}

// Преобразования числа в строковое представление с учетом длины строки в 20 символов
function numberToStr(number){
    let units_arr = numberToUnits(number);
    let str = '';

    if (units_arr.length == 3){
        if (units_arr[0] == 100){
            str += 'сто';
        }
        else if (units_arr[0] == 200){
            str += 'двести';
        }
        else if (units_arr[0] == 300){
            str += 'триста';
        }
        else if (units_arr[0] == 400){
            str += 'четыреста';
        }
        else if (units_arr[0] == 500){
            str += 'пятьсот';
        }
        else if (units_arr[0] == 600){
            str += 'шестьсот';
        }
        else if (units_arr[0] == 700){
            str += 'семьсот';
        }
        else if (units_arr[0] == 800){
            str += 'восемьсот';
        }
        else if (units_arr[0] == 900){
            str += 'девятьсот';
        }
        units_arr.shift(); // Удаляем первый элемент для дальнейшей обработки
    }

    if (units_arr.length == 2){
        if (str != ''){
            str += ' ';
        }
        if (units_arr[0] == 10){
            str += 'десять';
        }
        else if (units_arr[0] == 20){
            str += 'двадцать';
        }
        else if (units_arr[0] == 30){
            str += 'тридцать';
        }
        else if (units_arr[0] == 40){
            str += 'сорок';
        }
        else if (units_arr[0] == 50){
            str += 'пятьдесят';
        }
        else if (units_arr[0] == 60){
            str += 'шестьдесят';
        }
        else if (units_arr[0] == 70){
            str += 'семьдесят';
        }
        else if (units_arr[0] == 80){
            str += 'восемьдесят';
        }
        else if (units_arr[0] == 90){
            str += 'девяносто';
        }
        units_arr.shift(); // Удаляем первый элемент для дальнейшей обработки
    }

    if (units_arr.length == 1){
        if (str != ''){
            str += ' ';
        }
        if (units_arr[0] == 1){
            str += 'один';
        }
        else if (units_arr[0] == 2){
            str += 'два';
        }
        else if (units_arr[0] == 3){
            str += 'три';
        }
        else if (units_arr[0] == 4){
            str += 'четыре';
        }
        else if (units_arr[0] == 5){
            str += 'пять';
        }
        else if (units_arr[0] == 6){
            str += 'шесть';
        }
        else if (units_arr[0] == 7){
            str += 'семь';
        }
        else if (units_arr[0] == 8){
            str += 'восемь';
        }
        else if (units_arr[0] == 9){
            str += 'девять';
        }
    } 
    return (str.length <= 20) ? str : number;
}

function searchNumber(condition){
    if (condition == '<'){
        maxValue = answerNumber - 1;
    }

    if (condition == '>'){
        minValue = answerNumber + 1;
    }

    answerNumber = Math.floor((minValue + maxValue) / 2);
}

function putText(){
    let t = numberToStr(answerNumber);
    answerField.innerText = `Вы загадали число ${t}?`;
}

