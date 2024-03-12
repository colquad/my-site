// Colin Quade
// February 22, 2024
// CPSC 3750
// Program Exam 1
// A


function isPrime(input) {
    let i = 2;
    
    if(input == 0 || input == 1) {
        return false;
    }
    
    for(i; i <= Math.sqrt(input); i++) {
        if(input % i == 0) {
            return false;
        }
    }
    
    return true;
}

function findNums() {
    let i = 1;
    const input = document.getElementById('input').value;
    const primes = [];
    const regs = [];
    
    for(i; i <= input; i++) {
        if(isPrime(i)) {
            primes.push(i);
        }
        else {
            regs.push(i);
        }
    }
    
    document.getElementById('primeNums').innerHTML = "These <b>ARE</b> prime numbers:<br>" + primes.join(", ");
    document.getElementById('regNums').innerHTML = "These <b>ARE NOT</b> prime numbers:<br> " + regs.join(", ");
    
    setInterval(function() {
        document.getElementById('primeNums').style.backgroundColor = changeColor();
        document.getElementById('regNums').style.backgroundColor = changeColor();
    }, 5000)
}

function changeColor() {
    let i = 0;
    let n = 0;
    for(i; i < 6; i++) {
        n = (Math.random() * 0xfffff * 1000000).toString(16);
    }
    return '#' + n.slice(0, 6);
}

function getSum(id) {
    const temp = document.getElementById(id).innerHTML;
    var numbers = temp.split(":<br>")[1].split(", ").map(Number);
    
    var sum = numbers.reduce(function (a, b) {
        return a + b;
    }, 0)
    
    if(id == "primeNums") {
        document.getElementById("sumPrimeNums").innerHTML = "Sum of Prime Numbers: " + sum; 
    }
    else {
        document.getElementById("sumRegNums").innerHTML = "Sum of Non Prime Numbers: " + sum;
    }
}



