<?php
require('masking_helper.php');

$rows = array(
    array(
        'id'=>1000,
        'name'=>'아',
        'tel'=>'010-1234-5678',
        'email'=>'test-m@mail.com',
        'memo'=>'메모메모'
    ),
    array(
        'id'=>2000,
        'name'=>'아무',
        'tel'=>'01012345678',
        'email'=>'test-mmail.com',
        'memo'=>'메모메모'
    ),
    array(
        'id'=>1,
        'name'=>'아무개',
        'tel'=>'010-1234-5678',
        'email'=>'test-m@mail.com',
        'memo'=>'메모메모'
    ),
    array(
        'id'=>2,
        'name'=>'아무개',
        'tel'=>'01012345678',
        'email'=>'test-mmail.com',
        'memo'=>'메모메모'
    ),
    array(
        'id'=>3,
        'name'=>'아무개아무개',
        'tel'=>'02-123499-5678',
        'email'=>'test-m@mail.com',
        'memo'=>''
    )
    ,
    array(
        'id'=>3,
        'name'=>'아무개아무개',
        'tel'=>'021234995678',
        'email'=>'test-mmailtest-mmail.com',
        'memo'=>''
    )
);


masking_rows($rows,array('name'=>array('masking_string'),'tel'=>array('masking_phone'),'email'=>array('masking_email')));
print_r($rows);