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
    $favoriteId = $data['favoriteId'];
    
    $sql = "DELETE FROM favorites WHERE favorite_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $favoriteId);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Book removed from favorites successfully!']);
    } else {
        echo json_encode(['message' => 'Failed to remove book from favorites.']);
    }
    
    $stmt->close();
    $conn->close();
?>
