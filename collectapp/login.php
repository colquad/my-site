<?php
    session_start();
    $servername = "191.101.13.154";
    $username = "u530835628_cquadecollect";
    $password = "!8~1*nEA+vXd";
    $dbname = "u530835628_collectappDB";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Check if form data is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST['email'];
        $password = $_POST['password'];
    
        // Prepare and bind
        $stmt = $conn->prepare("SELECT user_id, password, login_count FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row['password'])) {
                // Set session variables
                $_SESSION['user_id'] = $row['user_id'];
                
                // Update the login count
                $newLoginCount = $row['login_count'] + 1;
                $updateStmt = $conn->prepare("UPDATE users SET login_count = ?, last_login = NOW() WHERE user_id = ?");
                $updateStmt->bind_param("ii", $newLoginCount, $row['user_id']);
                $updateStmt->execute();
                $updateStmt->close();

                // Redirect to homepage
                header("Location: index.html");
                exit();
            } else {
                echo "Invalid password!";
            }
        } else {
            echo "No user found with that email!";
        }
        $stmt->close();
    }
    $conn->close();
?>
