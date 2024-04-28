<!DOCTYPE html>
<html lang="en">

<head>
    <title>PHP Form Example</title>
    <link rel="stylesheet" href="form.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>

<body>
    <div id="nav-placeholder">
    </div>
    
    <?php 
        move_uploaded_file($_FILES["fileupload"]["tmp_name"], 'uploads/'.$_FILES['fileupload']['name']);
    ?>
    <section id="body">
        <div id="bigdiv">
            <div id="maindiv">
                <h1 id="title">Your Info</h1><br />
                <form action="form.php" method="post" id="form">
                    <div id="formentry">
                        <p>
                            <label for="nameinput">
                                <span class="question">Your Name:</span>
                            </label>
                            <?php echo $_POST['nameinput']  ?>
                        </p>
                        <p>
                            <label for="password">
                                <span class="question">Your CUID: </span>
                            </label>
                            <?php echo $_POST['cuid']; ?>
                        </p>
                        <p>
                            <span class="question">Your selected checkboxes:</span><br>
                            <?php 
                                if (array_key_exists('some_statements', $_POST)) {
                                    for ($i = 0; $i < count($_POST['some_statements']); ++$i)
                                        echo $_POST['some_statements'][$i].'<br>';
                                } else echo 'No statements selected.';
                            ?>
                        </p>
                        <p>
                            <span class="question">Your favorite thing about my site:</span><br>
                            <?php if (array_key_exists('some_statements', $_POST)) {
                                    echo $_POST['best_thing'];
                                } else echo 'No selection.'; ?>
                        </p>
                        <p>
                            <label for="message">
                                <span class="question">Your text area entry:</span>
                            </label><br>
                            <?php echo $_POST['message']; ?>
                        </p>
                        <p>
                            <label for="cars"><span class="question">Your Rating: </span></label>
                            <?php echo $_POST['stars']; ?>
                        </p>
                        <p>
                            <label for="file"><span class="question">Your Image:</span></label>
                            <img id="imgupload" src="<?php echo 'uploads/'.$_FILES['fileupload']['name'];?>" alt="your image" />
                        </p>
                        <p>
                            <label for="url"><span class="question">Link to your site:</span></label>
                            <a href="<?php echo $_POST['url']; ?>" ><?php echo $_POST['url']; ?></a>
                        </p>
                    </div>
                    <input style="font-size: large;" type="submit" value="SUBMIT">
                    <hr>
                    <p id="credits">Created By: Dillon Brown, Anthony Morales, Colin Quade</p>
                </form>
            </div>
        </div>
    </section>
    <footer>
        <p style="font-size: large;">Form Example</p>
    </footer>
    <script>
        $(function(){
          $("#nav-placeholder").load("/src/nav3.html");
        });
    </script>
</body>

</html>