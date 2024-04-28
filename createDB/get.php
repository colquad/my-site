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
            $sql = "SELECT * FROM Person";
            $res = mysqli_query($conn, $sql);
            
            if ($res) {
                while ($newArray = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                    $firstName = $newArray['firstName'];
                    $lastName = $newArray['lastName'];
                    $email = $newArray['email'];
                    $testField = $newArray['testField'];
                    echo "First Name: ".$firstName." <br> Last Name: ".$lastName." <br> Email: ".$email." <br>";
                }
            }
            mysqli_free_result($res);
            mysqli_close($conn);
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