<?php
// Database connection
$db = new mysqli('localhost', 'your_username', 'your_password', 'football_boots');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$city = $_POST['city'];
$order_details = $_POST['order_details'];
$total_amount = $_POST['total_amount'];

// Save order to database
$sql = "INSERT INTO orders (name, email, phone, address, city, order_details, total_amount, order_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";

$stmt = $db->prepare($sql);
$stmt->bind_param("ssssssd", $name, $email, $phone, $address, $city, $order_details, $total_amount);

if ($stmt->execute()) {
    // Send confirmation email
    $to = $email;
    $subject = "Order Confirmation - Elite Football Boots";
    $message = "Dear $name,\n\nThank you for your order!\n\nOrder Details:\n$order_details\n\nTotal: $$total_amount\n\nWe will process your order shortly.\n\nBest regards,\nElite Football Boots";
    $headers = "From: aghaaliakbar@gmail.com";

    mail($to, $subject, $message, $headers);

    // Send notification to admin
    mail("aghaaliakbar@gmail.com", "New Order Received", "New order from $name\n\n$order_details", $headers);

    echo json_encode(["success" => true, "message" => "Order placed successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error processing order"]);
}

$stmt->close();
$db->close();
?> 