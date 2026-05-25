<?php 
session_start();
?>

<html>
    <meta charset="utf-8">
   
    <head>
        <title>
            Velora 
        </title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
    </head>                          
    <body>
        <header>
            <div id="logo">
                <img src="images/logo.png" alt="Velora Logo">
            </div>
            

            <input type="text" id="search" placeholder="Pesquisar produtos...">
            <div id="icons">
                <?php if (isset($_SESSION["user"])){ ?>
                    <div id="user-menu">
                        <?php echo $_SESSION["user"]; ?>
                        <div id="user-dropdown">
                            <a href="logout.php">Logout</a>
                        </div>
                    </div>
                <?php } else { ?>
                    <div id="user-icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                <?php }?>
                <div id="cart-icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span id="cart-count">0</span>
                </div>
            </div>
        </header>
        <div id="login-dropdown">
            <div class="login-top"></div>
                <div class="login-content">
                    <h2>Bem-vindo!</h2>
                    <p>Entra na tua conta para continuar</p>
                    <form action="login.php" method="POST">
                        <input type="email" name="email" placeholder="Email" required>
                        <input type="password" name="password" placeholder="Password" required>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
        </div>
        <div id="layout">
            <div id="shop">
                
                <div id="products"></div>

               
            </div>
        </div>
        <div id="sidebar">
            <h2>Carrinho</h2>
            <div id="cart-items"></div>
            <div id="cart-total"></div>
        </div>
          <div id="overlay"></div>

        <script src="script.js"></script>
    </body>
</html>