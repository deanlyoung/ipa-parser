<?php
$filename = 

$this->load->library('IPAExtractor', array('file_path' => 'files/' . '$filename', 'destination' => 'plists/'));

$IPAInfo = $this->ipaextractor->init();

?>