<?php
    session_start();
    
    if (!isset($_SESSION['user_id'])) {
        // Not logged in
        header("Location: login.html");
        exit();
    }
    
    // Database connection settings
    $servername = "191.101.13.154";
    $username = "u530835628_cquadecollect";
    $password = "!8~1*nEA+vXd";
    $dbname = "u530835628_collectappDB";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "SELECT f.item_name, f.item_details, f.favorited_at, u.name FROM favorites f JOIN users u ON f.user_id = u.user_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
?>

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
    
    <h1>My Book Collection</h1>
    
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
    
    <div class="books-grid">
        <?php
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<div class='book-item'>";
                echo "<h3>" . htmlspecialchars($row['item_name']) . "</h3>";
                echo "<h4>" . htmlspecialchars($row['name']) . "</h4>";
                echo "<p>Book details: " . htmlspecialchars($row['item_details']) . "</p>";
                echo "<p>Favorited at: " . htmlspecialchars($row['favorited_at']) . "</p>";
                echo "<hr>";
                echo "</div>";
            }
        } else {
            echo "<p>No books found in your collection.</p>";
        }
        ?>
    </div>

    <script>
    $(function(){
          $("#nav-placeholder").load("/src/nav2.html");
        });
    </script>
</body>
</html>

<?php
$stmt->close();
$conn->close();
?>
