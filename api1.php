<?php


header('Content-Type: application/json');


$users = array(
    array(
        "name" => "Dave Punk",
        "mob" => "5689741523",
        "email" => "davepunk@gmail.com",
    ),
    array(
        "name" => "Monty Smith",
        "mob" => "2584369721",
        "email" => "montysmith@gmail.com",
    ),
    array(
        "name" => "John Flinch",
        "mob" => "9875147536",
        "email" => "johnflinch@gmail.com",
    )
);

if($_SERVER['REQUEST_METHOD']=='GET'){
    echo json_encode($users, JSON_PRETTY_PRINT);
}
else if($_SERVER['REQUEST_METHOD']==='POST')
{
   if(isset($_POST['name'])&&isset($_POST['mob'])&&isset($_POST['email']))
   {
        $response=['status'=>'success','data'=>['name'=>$_POST['name'],'mob'=>$_POST['mob'],'email'=>$_POST['email']]];
        echo json_encode($response);
   }
   else{
        $response=['status'=>'false','message'=>'invalid data'];
        echo json_encode($response);
   }
}
else if($_SERVER['REQUEST_METHOD']==='DELETE')
{
    
    $input = file_get_contents('php://input');

  // Decode the JSON data
    $data = json_decode($input, true);

    ### to complete the traitement
    echo json_encode($data);
    #print_r($data);


}


?>
