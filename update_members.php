<?php
include "db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No JSON data received"]);
    exit;
}

$sql = "UPDATE members SET 
ApplicationID='{$data['ApplicationID']}',
TrainorID='{$data['TrainorID']}',
FirstName='{$data['FirstName']}',
LastName='{$data['LastName']}',
Age='{$data['Age']}',
PlanID='{$data['PlanID']}',
Phone='{$data['Phone']}',
Status='{$data['Status']}'
WHERE MemberID='{$data['MemberID']}'";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success", "message" => "Updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>