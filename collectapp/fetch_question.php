<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Book Collection</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
    <div id="nav-placeholder"></div>
    
    <h1>Reset Password</h1>
    
    <nav>
        <ul>
            <li><a href="index.html">HOME</a></li>
            <li>|</li>
            <li><a href="show_books.php">MY FAVORITES</a></li>
            <li>|</li>
            <li><a href="about.html">ABOUT</a></li>
            <li>|</li>
            <li><a href="stats.html">STATS</a></li>
            <li>|</li>
            <li><a href="userlist.php">USERS LIST</a></li>
            <li>|</li>
            <li><a href="masteritems.php">ITEMS LIST</a></li>
            <li>|</li>
            <li><a href="logout.php">LOGOUT</a></li>
        </ul>
    </nav> <br><br>
    
 
    <script>
    $(function(){
          $("#nav-placeholder").load("/src/nav2.html");
        });
    </script>
</body>
</html>

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
    
    $sql = "SELECT security_question FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        $question = $row['security_question'];
        // Show the form for resetting the password
        echo '
              <form action="reset_password.php" method="POST">
                  <input type="hidden" name="email" value="'.$email.'">
                  <label>'.$question.'</label>
                  <input type="text" name="security_answer" required placeholder="Your answer">
                  <input type="password" name="new_password" required placeholder="New password">
                  <button type="submit">Reset Password</button>
              </form>';
    } else {
        echo "No user found with that email.";
    }
    $stmt->close();
    $conn->close();
?>