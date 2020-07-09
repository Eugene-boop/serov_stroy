<?php 
/* 	
If you see this text in your browser, PHP is not configured correctly on this webhost. 
Contact your hosting provider regarding PHP configuration for your site.
*/

require_once('form_throttle.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
	if (formthrottle_too_many_submissions($_SERVER["REMOTE_ADDR"]))
	{
		echo '{"MusePHPFormResponse": { "success": false,"error": "Too many recent submissions from this IP"}}';
	} 
	else 
	{
		emailFormSubmission();
	}
} 


function emailFormSubmission()
{
	
	$to = 'serov-stroy@mail.ru, heyalyosha@yandex.ru';
	$subject = 'Заявка с сайта ' . htmlentities($_SERVER["SERVER_NAME"],ENT_COMPAT,'UTF-8') . '| Калькулятор ремонта';
	
	$message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/><title>' . htmlentities($subject,ENT_COMPAT,'UTF-8') . '</title></head>';
	$message .= '<body style="background-color: #ffffff; color: #000000; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: 18px; font-family: helvetica, arial, verdana, sans-serif;">';
	$message .= '<h2 style="background-color: #eeeeee;">Посланы новые данные</h2><table cellspacing="0" cellpadding="0" width="100%" style="background-color: #ffffff;">'; 
	$message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Форма:</b></td><td> Калькулятор</td></tr>';
	$message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Телефон:</b></td><td>' . htmlentities($_REQUEST["phone"],ENT_COMPAT,'UTF-8') . '</td></tr>';
    


    if ($_REQUEST['resultValRoomRemont']) {
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип жилья:</b></td><td>Комната</td></tr>';
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип комнаты:</b></td><td>' . htmlentities($_REQUEST["resultValRoomType"],ENT_COMPAT,'UTF-8') . '</td></tr>';
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValRoomRemont"],ENT_COMPAT,'UTF-8') . '</td></tr>';
        
        if (!$_REQUEST["resultValRoomMeter"]) {
            switch($_REQUEST["selectTypeRoom"]) {
                case 1: 
                $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>12 м<sup>2</sup></td></tr><br>'; 
                break;
                case 2: 
                $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>6 м<sup>2</sup></td></tr><br>'; 
                break;
                case 3:
                case 4:
                case 5: 
                $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>2 м<sup>2</sup></td></tr><br>'; 
                break;
            }
        } else {
            $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>' . htmlentities($_REQUEST["resultValRoomMeter"],ENT_COMPAT,'UTF-8') . 'м<sup>2</sup></td></tr><br>';  
        }
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Стоимость ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValSum"],ENT_COMPAT,'UTF-8') . ' р.</td></tr><br>';  
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Стоимость черновых материалов:</b></td><td>' . htmlentities($_REQUEST["resultValSumMaterial"],ENT_COMPAT,'UTF-8') . ' р.</td></tr><br>';  
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Примерные сроки ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValDays"],ENT_COMPAT,'UTF-8') . ' дн.</td></tr><br>';  
        
    }


    if ($_REQUEST['resultValFlatRemont']) {
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип жилья:</b></td><td>Квартира</td></tr><br>';
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип комнаты:</b></td><td>' . htmlentities($_REQUEST["resultValFlatType"],ENT_COMPAT,'UTF-8') . '</td></tr><br>';
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValFlatRemont"],ENT_COMPAT,'UTF-8') . '</td></tr><br>';

        if (!$_REQUEST["resultValFlatMeter"]) {
            $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>' . htmlentities($_REQUEST["resultValFlatMeterPlaceholder"],ENT_COMPAT,'UTF-8') . 'м<sup>2</sup></td></tr><br>';  
        } else {
            $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>' . htmlentities($_REQUEST["resultValFlatMeter"],ENT_COMPAT,'UTF-8') . 'м<sup>2</sup></td></tr><br>';  
        }
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Стоимость ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValSumFlat"],ENT_COMPAT,'UTF-8') . ' р.</td></tr><br>';  
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Стоимость черновых материалов:</b></td><td>' . htmlentities($_REQUEST["resultValSumFlatMaterial"],ENT_COMPAT,'UTF-8') . ' р.</td></tr><br>';  
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Примерные сроки ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValDaysFlat"],ENT_COMPAT,'UTF-8') . ' дн.</td></tr><br>';  
    }


    if ($_REQUEST['resultValNewRemont']) {
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип жилья:</b></td><td>Квартира</td></tr><br>';
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип комнаты:</b></td><td>' . htmlentities($_REQUEST["resultValNewType"],ENT_COMPAT,'UTF-8') . '</td></tr><br>';
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Тип ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValNewRemont"],ENT_COMPAT,'UTF-8') . '</td></tr><br>';

        if (!$_REQUEST["resultValFlatMeter"]) {
            $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>' . htmlentities($_REQUEST["resultValNewMeterPlaceholder"],ENT_COMPAT,'UTF-8') . 'м<sup>2</sup></td></tr><br>';  
        } else {
            $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Площадь жилья:</b></td><td>' . htmlentities($_REQUEST["resultValNewMeter"],ENT_COMPAT,'UTF-8') . 'м<sup>2</sup></td></tr><br>';  
        }
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Стоимость ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValSumNew"],ENT_COMPAT,'UTF-8') . ' р.</td></tr><br>';  
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Стоимость черновых материалов:</b></td><td>' . htmlentities($_REQUEST["resultValSumNewMaterial"],ENT_COMPAT,'UTF-8') . ' р.</td></tr><br>';  
        $message .= '<tr><td valign="top" style="background-color: #ffffff;"><b>Примерные сроки ремонта:</b></td><td>' . htmlentities($_REQUEST["resultValDaysNew"],ENT_COMPAT,'UTF-8') . ' дн.</td></tr><br>';  
    }




	$message .= '</table><br/><br/>';
	$message .= '<div style="background-color: #eeeeee; font-size: 10px; line-height: 11px;">Форма прислана с сайта: ' . htmlentities($_SERVER["SERVER_NAME"],ENT_COMPAT,'UTF-8') . '</div>';
	$message .= '<div style="background-color: #eeeeee; font-size: 10px; line-height: 11px;">Visitor IP address: ' . htmlentities($_SERVER["REMOTE_ADDR"],ENT_COMPAT,'UTF-8') . '</div>';
	$message .= '</body></html>';
	$message = cleanupMessage($message);
	
	$formEmail = cleanupEmail($_REQUEST['Email']);
	$headers = 'From:  info@landing-page-templates.net' . "\r\n" . 'Reply-To: ' . $formEmail .  "\r\n" .'X-Mailer: Adobe Muse 7.0.314 with PHP/' . phpversion() . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n";
	if ($_REQUEST['full-name'] =='') {
		$sent = @mail($to, $subject, $message, $headers);
	}
	
	
	if($sent)
	{
	   
	    header('Refresh: 0; URL=thanks.html');
		//echo '{"FormResponse": {"success": true, "redirect": "thanks.html"}}';
		
		
	   
	   exit;
		

	}
	else
	{
		echo '{"MusePHPFormResponse": { "success": false,"error": "Failed to send email"}}';
	}
}

function cleanupEmail($email)
{
	$email = htmlentities($email,ENT_COMPAT,'UTF-8');
	$email = preg_replace('=((<CR>|<LF>|0x0A/%0A|0x0D/%0D|\\n|\\r)\S).*=i', null, $email);
	return $email;
}

function cleanupMessage($message)
{
	$message = wordwrap($message, 70, "\r\n");
	return $message;
}
?>
