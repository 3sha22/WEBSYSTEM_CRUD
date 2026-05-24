<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO members 
(ApplicationID, TrainorID, FirstName, LastName, Age, PlanID, Phone, Status)
VALUES 
(
'{$data['ApplicationID']}',
'{$data['TrainorID']}',
'{$data['FirstName']}',
'{$data['LastName']}',
'{$data['Age']}',
'{$data['PlanID']}',
'{$data['Phone']}',
'{$data['Status']}'
)";

if ($conn->query($sql)) {
    echo "Inserted";
} else {
    echo $conn->error;
}
?>