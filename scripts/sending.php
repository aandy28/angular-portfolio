<?php
$errors = array();  	// array to hold validation errors
$data = array(); 		// array to pass back data
// validate the variables ======================================================
	if (empty($_POST['name']))
		$errors['name'] = 'Name is required.';
	if (empty($_POST['superheroAlias']))
		$errors['superheroAlias'] = 'E-mail is required.';
	if (empty($_POST['content']))
		$errors['content'] = 'Message is required.';
// return a response ===========================================================
	// response if there are errors
	if ( ! empty($errors)) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
		
	} else {
		$name = $_POST['name'];
		$emailAddress = $_POST['superheroAlias'];	
		$body = $_POST['content'];

			
		// create email body and send it	
		$to = 'info@andysmithdev.co.uk'; // put your email
		$email_subject = "Contact from portfolio by:  $name";
		$email_body = "You have received a new message. \n\n".
						  
						  "Name: name\n".
						  "Email Address: $emailAddress\n".
						  "Message: $content\n";
		$headers = "From: info@andysmithdev.co.uk\n";
		$headers .= "Reply-To: $emailAddress";	
		mail($to,$email_subject,$email_body,$headers);
		$data['success'] = true;
		$data['message'] = 'Thank you for sending e-mail.';

		return true;			
		
	}
	echo json_encode($data);