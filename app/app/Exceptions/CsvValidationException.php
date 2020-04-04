<?php
namespace App\Exceptions;

use Exception;
use Throwable;

class CsvValidationException extends Exception
{
    protected $validationErrors;

    public function __construct($message, $validationErrors, $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->validationErrors = $validationErrors;
    }

    public function getValidationErrors()
    {
        return $this->validationErrors;
    }
}
