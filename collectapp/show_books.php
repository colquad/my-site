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
    
    $user_id = $_SESSION['user_id'];
    $sql = "SELECT * FROM favorites WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
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
                echo "<div id='search-section' class='book-item'>";
                echo "<h3>" . htmlspecialchars($row['item_name']) . "</h3>";
                echo "<p>Book Details: " . htmlspecialchars($row['item_details']) . "</p>";
                echo "<p>Favorited At: " . htmlspecialchars($row['favorited_at']) . "</p>";
                echo "<button onclick='removeBook(" . $row['favorite_id'] . ")'>Remove from Favorites</button>";
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
        
    function removeBook(favoriteId) {
        if (confirm('Are you sure you want to remove this book from your favorites?')) {
            fetch('remove_favorite.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favoriteId: favoriteId })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                location.reload(); // Reload the page to update the list of books
            })
            .catch(error => console.error('Error:', error));
        }
    }
    </script>
</body>
</html>

<?php
$stmt->close();
$conn->close();
?>
