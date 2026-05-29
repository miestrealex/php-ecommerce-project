<?php
include "db.php";

if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $sql = "DELETE FROM products WHERE id = '$id'";
    $conn->query($sql);
}

$categories = $conn -> query("SELECT * FROM categories");

if (isset($_POST["add-product"])){
    $name = $_POST["name"];
    $price = $_POST["price"];
    $image = $_POST["image"];
    $badge = $_POST["badge"];
    $category_id = $_POST["category_id"];
    $stock = $_POST["stock"];
    
    $sql = "INSERT INTO products (name, price, image, badge, category_id, stock) VALUES ('$name', '$price', '$image', '$badge', '$category_id', '$stock')";

    $conn -> query($sql);
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Velora Admin</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="admin-container">
            <h1>Velora Admin Panel</h1>
            <form action="" method="POST">
                <input type="text" name="name" placeholder="Product Name" required>
                <select name="category_id" required>
                    <option value="">
                        Select Category
                    </option>
                    <?php 
                    while ($category = $categories -> fetch_assoc()) {
                    ?>
                    <option value="<?php echo $category['id'];?>">
                        <?php echo $category['name'];?>
                    </option>
                    <?php } ?>
                </select>
                <input type="number" name="price" placeholder="Price" required>
                <input type="text" name="image" placeholder="Image Path" required>
                <select name="badge" required>
                    <option value="">Select Badge</option>
                    <option value="NEW">NEW</option>
                    <option value="SALE">SALE</option>
                    <option value="HOT">HOT</option>
                    <option value="LIMITED">LIMITED</option>
                </select>
                <input type="number" name="stock" placeholder="Stock" required>
                <button type="submit" name="add-product">
                    Add Product
                </button>
            </form>
            <div class="admin-categories">
                <a href="admin.php">All Products</a>
                <?php $categories->data_seek(0);
                while ($category = $categories -> fetch_assoc()) {
                ?>
                    <a href="admin.php?category=<?php echo $category['id']; ?>">
                        <?php echo $category['name'];?>
                    </a>
                <?php } ?>
            </div>
            <h2>Products</h2>
            <div class="admin-products">
                <?php
                if (isset($_GET['category'])) {
                    $category_id = $_GET['category'];
                    $products = $conn -> query("SELECT * FROM products WHERE category_id = '$category_id'");
                }else{
                    $products = $conn -> query("SELECT * FROM products");
                }
                while ($product = $products -> fetch_assoc()) {?>
                <div class="admin-product">
                    <img src="<?php echo $product['image']; ?>" width="100">
                    <h3><?php echo $product['name']; ?></h3>
                    <p>CHF <?php echo $product['price'];?></p>
                    <p><?php echo $product['badge'];?></p>
                    <p>Stock: <?php echo $product['stock'];?></p>
                    <a href="edit.php?id=<?php echo $product['id']; ?>">
                        Edit
                    </a>
                    <a href="admin.php?delete=<?php echo $product['id']; ?>" onclick="return confirm('Tem a certeza que quer apagar este produto?')">
                        Delete
                    </a>
                    
                        
                </div>
                <?php } ?>
            </div>
        </div>
    </body>
</html>
