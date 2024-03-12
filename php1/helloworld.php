<!DOCTYPE php>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>PHP Hello World</title>
        <link rel="stylesheet" href="../src/styles.css">
        <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
    </head>
    
    <body>
        <div id="nav-placeholder">
    	</div>
        
        </br></br></br></br></br>
        
        <?php
            echo "Hello World!<br><br>";
            
            function addition($num1, $num2) {
                return $num1 + $num2;
            }
            
            $number1 = 50;
            $number2 = 27;
            
            $sum = addition($number1, $number2);
            
            echo "$number1 + $number2 = $sum";
        ?>
        
        </br></br></br></br></br>
        
        <script>
        	$(function(){
        		$("#nav-placeholder").load("/src/nav2.html");
        	});
        </script>
    </body>
</html>