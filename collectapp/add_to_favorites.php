<?php
    session_start();
    
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['message' => 'You are not logged in.']);
        exit();
    }
    
    $servername = "191.101.13.154";
    $username = "u530835628_cquadecollect";
    $password = "!8~1*nEA+vXd";
    $dbname = "u530835628_collectappDB";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    $user_id = $_SESSION['user_id'];
    $title = $conn->real_escape_string($data['title']);
    $author = $conn->real_escape_string($data['author']);
    $cover_id = $conn->real_escape_string($data['cover_id']);
    $publish_year = $conn->real_escape_string($data['publish_year']);
    
    $sql = "INSERT INTO favorites (user_id, item_name, item_details) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $book_details = "Author: {$author}, Year: {$publish_year}, Cover ID: {$cover_id}";
    $stmt->bind_param("iss", $user_id, $title, $book_details);
    
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Book added to favorites successfully!']);
    } else {
        echo json_encode(['message' => 'Failed to add book to favorites.']);
    }
    
    $stmt->close();
    $conn->close();
?>
