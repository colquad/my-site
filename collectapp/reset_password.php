<?php
    $servername = "191.101.13.154";
    $username = "u530835628_cquadecollect";
    $password = "!8~1*nEA+vXd";
    $dbname = "u530835628_collectappDB";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $email = $_POST['email'];
    $security_answer = $_POST['security_answer'];
    $new_password = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
    
    // First, check the security answer
    $sql = "SELECT security_answer FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        if ($security_answer === $row['security_answer']) { // Direct comparison of the plaintext answers
            // Security answer is correct, update password
            $updateSql = "UPDATE users SET password = ? WHERE email = ?";
            $updateStmt = $conn->prepare($updateSql);
            $updateStmt->bind_param("ss", $new_password, $email);
            $updateStmt->execute();
            header("Location: login.html");
            exit();
        } else {
            echo "<script>alert('Incorrect answer to the security question.'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('No such email found.'); window.location.href='login.html';</script>";
    }
    
    $stmt->close();
    $conn->close();
?>
