<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Session</title>
</head>
<body>
<h1>Car Selection Page</h1>
<?php
if (isset($_POST['form_products'])) {
    if (!empty($_SESSION['products'])) {
        $products = array_unique(
            array_merge(unserialize($_SESSION['products']),
                $_POST['form_products']));
        $_SESSION['products'] = serialize($products);
    } else {
        $_SESSION['products'] = serialize($_POST['form_products']);
    }
    echo "<p>Your products have been registered!</p>";
}
?>
<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <p><label for="form_products">Select some products:</label><br>
        <select id="form_products" name="form_products[]" multiple="multiple" size="3">
            <option value="Honda Civic">Honda Civic</option>
            <option value="Jeep Wrangler">Jeep Wrangler</option>
            <option value="Chevrolet Corvette">Chevrolet Corvette</option>
            <option value="Nissan Skyline">Nissan Skyline</option>
            <option value="Dodge Viper">Dodge Viper</option>
            <option value="Toyota Tundra">Toyota Tundra</option>
            <option value="Jaguar F-Type">Jaguar F-Type</option>
        </select></p>
    <button type="submit" name="submit" value="choose">Submit Form</button>
</form>
<p><a href="session1.php">Car Display Page</a></p>
</body>
</html>
