<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Database Demo</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>

<body>
    <div id="nav-placeholder">
    </div>
    
    <h1>Database Demo</h1>
    
    <form action="/createDB">
        <input type="submit" value="Go back" />
    </form> <br>
    
    <?php
        $conn = new mysqli('191.101.13.154', 'u530835628_cquade', '#[RqucWZz1nL', 'u530835628_cquade_DB');
        
        if (mysqli_connect_errno()) {
            printf("Connection failed: %s\n", mysqli_connect_error());
            exit();
        }
        else {
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $email = $_POST['email'];
            
            $sql = $conn->prepare("INSERT INTO Person (firstName, lastName, email) VALUES (?, ?, ?)");
            $sql->bind_param("sss", $firstName, $lastName, $email);
            $sql->execute();
            echo "Registration successful";
            
            $sql->close();
            $conn->close();
        }
    ?>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    
    <footer>
        <p>Colin Quade | <a href="mailto:colinquade@cjquade.com">colinquade@cjquade.com</a></p>
    </footer>
    
    <script>
        $(function(){
          $("#nav-placeholder").load("/src/nav2.html");
        });
    </script>
</body>
</html>