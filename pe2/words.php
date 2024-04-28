<?php
    // Set the file to a variable for readability
    $filePath = 'words.txt';
    
    // This function counts vowels using the preg_match_all function
    function countVowels($word) {
        return preg_match_all('/[aeiou]/i', $word);
    }
    
    // Opens file, reads words, and counts the vowels using the countVowels helper function
    $wordsByVowelCount = [];
    $handle = fopen($filePath, "r");
    if ($handle) {
        while (($line = fgets($handle)) !== false) {
            $word = trim($line);
            $vowelCount = countVowels($word);
            $wordsByVowelCount[$vowelCount][] = $word;
        }
        fclose($handle);
    }
    
    // Sorting words by length so that it sorts shortest to longest
    foreach ($wordsByVowelCount as &$words) {
        usort($words, function($a, $b) {
            return strlen($a) - strlen($b);
        });
    }
    
    // Had to add this to make the buttons go in numerical order
    ksort($wordsByVowelCount);
    
    // Handle AJAX request for words by vowel count
    if (isset($_GET['vowel_count'])) {
        $vowelCount = (int)$_GET['vowel_count'];
        $words = $wordsByVowelCount[$vowelCount] ?? [];
        echo json_encode($words);
        exit;
    }
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Programming Exam 2</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="words.js"></script>
</head>
<body>
    <div id="nav-placeholder">
    </div>
    
    <h1>Programming Exam #2</h1>
    
    <?php foreach (array_keys($wordsByVowelCount) as $count): ?>
        <button id="vowelButton" onclick="loadWords(<?= $count ?>)"><?= $count ?></button>
    <?php endforeach; ?>
    
    <div class="container">
        <div id="wordList">
            <!-- Words will be displayed here -->
        </div>
    
        <div id="dropArea" ondrop="drop(event)" ondragover="allowDrop(event)">
            Drop words here
        </div>
    </div>
    
    <div id="countLabel">0 words dropped</div>
    
</body>
</html>