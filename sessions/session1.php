<?php
session_start();

if (isset($_GET['clear']) && $_GET['clear'] == '1') {
    unset($_SESSION['products']);
    header('Location: session1.php');
    exit;
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Accessing Session Variables</title>
</head>
<body>
<h1>Car Display Page</h1>
<?php
if (isset($_SESSION['products'])) {
    echo "<strong>Cars you selected:</strong><ol>";
    foreach (unserialize($_SESSION['products']) as $p) {
        echo "<li>".$p."</li>";
    }
    echo "</ol>";
    echo "<p><a href='?clear=1'>Clear All Selections</a></p>";
} else {
    echo "<p>No cars selected.</p>";
}
?>
<p><a href="arraysession.php">Car Selection Page</a></p>
</body>
</html>
