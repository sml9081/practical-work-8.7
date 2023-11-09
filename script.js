let minValue;
let maxValue;
let answerNumber;
let sign = '';
let orderNumber = 1;
let gameRun = true;
let defaultMinValue = 0;
let defaultMaxValue = 100;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

function checkInterval(){
    minValue = (!isNaN(minValue) && minValue > -1000) ? minValue : defaultMinValue;
    maxValue = (!isNaN(maxValue) && maxValue < 1000) ? maxValue : defaultMaxValue;
    if (minValue >= maxValue){
        minValue = 0;
        maxValue = 100;
    }
}

function runGame(message){
    orderNumber = 1;
    gameRun = true;
    answerField.innerText = message;
    orderNumberField.innerText = orderNumber;
    minValue = parseInt(prompt('Минимальное знание числа для игры', defaultMinValue));
    maxValue = parseInt(prompt('Максимальное знание числа для игры', defaultMaxValue));
    checkInterval();
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    if (searchNumber()){
        putText();
    }
}

function wrongNumber(){
    let phraseRandom = Math.round( Math.random());
    let answerPhrase = (phraseRandom === 1) ?
        `Вы загадали неправильное число!\n\u{1F914}` :
        `Я сдаюсь..\n\u{1F92F}`;

    answerField.innerText = answerPhrase;
    gameRun = false;
}

function guessAnotherNumber(condition){
    if (gameRun){
        let result = searchNumber(condition);
        if (result){
            orderNumber++;
            orderNumberField.innerText = orderNumber; 
            putText();
        }
    }
}

// разделение числа на разряды: сотни, десятки, единицы
function numberToUnits(n){
    if (n == 0){
        sign = '';
        return [0];
    }
    if (n < 0){
        sign = '-';
        n = Math.abs(n);
    }
    else{
        sign = '';
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

    str += (units_arr.length == 1 && units_arr[0] == 0) ? '0' : '';
    str += (sign == '-') ? ' минус ' : '';

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
            if (units_arr[1] == 0){
                str += 'десять';
            }
            else{
                if (units_arr[1] == 1){
                    str += 'одиннадцать';
                }
                else if (units_arr[1] == 2){
                    str += 'двенадцать';
                }
                else if (units_arr[1] == 3){
                    str += 'тринадцать';
                }
                else if (units_arr[1] == 4){
                    str += 'четырнадцать';
                }
                else if (units_arr[1] == 5){
                    str += 'пятнадцать';
                }
                else if (units_arr[1] == 6){
                    str += 'шестнадцать';
                }
                else if (units_arr[1] == 7){
                    str += 'семнадцать';
                }
                else if (units_arr[1] == 8){
                    str += 'восемнадцать';
                }
                else if (units_arr[1] == 9){
                    str += 'девятнадцать';
                }
            }
            units_arr.shift();
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
        if ((answerNumber - 1) < minValue){
            wrongNumber();
            return false;
        }
        maxValue = answerNumber - 1;
    }

    if (condition == '>'){
        if ((answerNumber + 1) > maxValue){
            wrongNumber();
            return false;
        }
        minValue = answerNumber + 1;
    }

    answerNumber = Math.floor((minValue + maxValue) / 2);
    return true;
}

function putText(){
    let t = numberToStr(answerNumber);
    answerField.innerText = `Вы загадали число ${t}?`;
}

document.getElementById('btnOver').addEventListener('click', function () {
    guessAnotherNumber('>');
});

document.getElementById('btnLess').addEventListener('click', function () {
    guessAnotherNumber('<');
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        let phraseRandom = Math.round(Math.random() * 3);
        let answerPhrase;
        if (phraseRandom === 1) {
            answerPhrase = 'Я всегда угадываю!\n\u{1F44C}';
        }
        else if (phraseRandom === 2) {
            answerPhrase = 'Угадал!\n\u{1F60E}';
        }
        else {
            answerPhrase = 'Это было просто\n\u{1F525}';
        };
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
});

document.getElementById('btnRetry').addEventListener('click', function () {
    runGame(`Давай сыграем снова\n\u{1F60E}`);
});

