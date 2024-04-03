<?php

// File names
$files = ['prime', 'armstrong', 'fibonacci', 'none'];

// Check if it's the user's first time and create files
if (!isset($_COOKIE['visited'])) {
    setcookie('visited', '1', time() + 3600); // 1 hour cookie
    foreach ($files as $file) {
        file_put_contents("$file.txt", "");
    }
}

// Function to check if a number is prime
function isPrime($number) {
    if ($number <= 1) {
        return false;
    }
    for ($i = 2; $i <= sqrt($number); $i++) {
        if ($number % $i == 0) {
            return false;
        }
    }
    return true;
}

// Function to check if a number is Armstrong
function isArmstrong($number) {
    $sum = 0;
    $numberStr = (string)$number;
    $length = strlen($numberStr);
    for ($i = 0; $i < $length; $i++) {
        $sum += pow((int)$numberStr[$i], $length);
    }
    return $sum == $number;
}

// Function to check if a number is Fibonacci
function isFibonacci($number) {
    $fib0 = 0;
    $fib1 = 1;
    if ($number == $fib0 || $number == $fib1) {
        return true;
    }
    while ($fib1 < $number) {
        $temp = $fib1 + $fib0;
        $fib0 = $fib1;
        $fib1 = $temp;
        if ($fib1 == $number) {
            return true;
        }
    }
    return false;
}

$action = $_POST['action'] ?? '';

if ($action == 'check') {
    $numbers = explode(',', $_POST['numbers']);
    foreach ($numbers as $number) {
        $number = trim($number);
        if (is_numeric($number)) {
            $number = (int)$number;
            if (isPrime($number)) {
                file_put_contents('prime.txt', "$number\n", FILE_APPEND);
            } elseif (isArmstrong($number)) {
                file_put_contents('armstrong.txt', "$number\n", FILE_APPEND);
            } elseif (isFibonacci($number)) {
                file_put_contents('fibonacci.txt', "$number\n", FILE_APPEND);
            } else {
                file_put_contents('none.txt', "$number\n", FILE_APPEND);
            }
        }
    }
} elseif ($action == 'view') {
    $type = $_POST['type'] ?? '';
    if (in_array($type, $files)) {
        echo nl2br(file_get_contents("$type.txt"));
    }
} elseif ($action == 'reset') {
    foreach ($files as $file) {
        unlink("$file.txt");
    }
    setcookie('visited', '', time() - 3600); // Expire the cookie
}

?>
