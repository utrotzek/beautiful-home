<?php
namespace App\Services\Finance;

use App\Exceptions\CsvValidationException;
use App\Finance\Accounting;
use App\Finance\Period;

class ImportService
{
    /**
     * @var Period
     */
    protected $period;

    /**
     * @var array
     */
    protected $propertyMapping = [
        'date' => ['Buchungstag'],
        'title' => ['Buchungstext', 'Beguenstigter/Zahlungspflichtiger'],
        'totalAmount' => ['Betrag']
    ];

    /**
     * @var array
     */
    protected $arrayIndexes = [
        'date' => [0],
        'title' => [1],
        'totalAmount' => [2],
    ];

    /**
     * Imports the given accounting data
     */
    public function importAccountingForPeriod(string $csvPath, Period $period, bool $preview = false): array
    {
        $this->period = $period;

        $contentArray = $this->getRowsAsArray(file($csvPath));
        //the headline will be stripped here. Content Array contains only the body after this call
        $this->initializeColumnIndexes($contentArray);
        return $this->importData($contentArray, $preview);
    }

    private function importData(array $dataArray, bool $preview = false): array
    {
        $accountings = [];
        foreach ($dataArray as $data) {
            $accounting = $this->getMappedAccounting($data);

            $dateWithinPeriod = $accounting->date->format('m.Y') == $this->period->month.'.'.$this->period->year;
            if ($dateWithinPeriod && !$accounting->isDuplicate()){
                if (!$preview) {
                    $accounting->save();
                }
                $accountings[] = $accounting;
            }

        }
        return $accountings;
    }

    private function initializeColumnIndexes(&$contentArray)
    {
        $headlineRow = array_shift($contentArray);
        $validationErrors = [];

        foreach ($this->propertyMapping as $property => $mappingConfig) {
            $this->arrayIndexes[$property] = [];

            //one property can be mapped to multiple columns. We'll store the fields as an array
            foreach ($mappingConfig as $configItem) {
                $foundIndex = array_search($configItem, $headlineRow);

                if ($foundIndex !== false) {
                    $this->arrayIndexes[$property][] = $foundIndex;
                } else {
                    $validationErrors[] = "Headline for property '$property' and column '$configItem' could not be found";
                }
            }
        }

        if (count($validationErrors) > 0) {
            throw new CsvValidationException('Error while validating csv file', $validationErrors);
        }
    }

    private function getMappedAccounting($data): Accounting
    {
        $sanitizedTotalAmount = floatval(str_replace(',', '.', $this->getValue($data, 'totalAmount')));

        /** @var Accounting $accounting */
        $accounting = Accounting::make();
        $accounting->updateAmount($sanitizedTotalAmount);
        $accounting->title = $this->getValue($data, 'title');
        $accounting->date = new \DateTime($this->getValue($data, 'date'));
        $accounting->period()->associate($this->period);

        return $accounting;
    }

    private function getValue($data, $property)
    {
        $allData = [];
        foreach ($this->arrayIndexes[$property] as $index) {
            $allData[] = trim($data[$index]);
        }
        return implode(PHP_EOL, $allData);
    }

    private function getRowsAsArray($csvRows)
    {
        $contentArray = [];
        foreach ($csvRows as $row) {
            $contentArray[] = str_getcsv($row, ';', '');
        }
        return $contentArray;
    }
}
