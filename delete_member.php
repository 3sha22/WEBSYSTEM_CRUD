<?php
include "db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$sql = "DELETE FROM members WHERE MemberID=".$data['MemberID'];

if ($conn->query($sql)) {
    echo json_encode([
        "status" => "success",
        "message" => "Member deleted successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
}
?>