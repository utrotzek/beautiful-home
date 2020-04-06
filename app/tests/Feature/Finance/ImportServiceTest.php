<?php


namespace Tests\Feature\Finance;


use App\Exceptions\CsvValidationException;
use App\Finance\Accounting;
use App\Finance\Period;
use App\Services\Finance\ImportService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ImportServiceTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var Period
     */
    protected $currentPeriod;

    /**
     * @var string
     */
    private $defaultCsvFixturePath;

    public function setUp(): void
    {
        parent::setUp();

        $this->initializeFixtures();
        $this->defaultCsvFixturePath = __DIR__ . '/Fixtures/import_fixtures.CSV';
    }

    /**
     * @test
     */
    public function accountingsCanBeImported(): void
    {
        $importService = new ImportService();
        $importService->importAccountingForPeriod($this->defaultCsvFixturePath, $this->currentPeriod);

        //assert import count
        $allAccountings = $this->currentPeriod->accountings()->get();
        $exptectedCount = 10;
        $actualCount = $allAccountings->count();
        $this->assertSame($exptectedCount, $actualCount);

        $date = new \DateTime('01.03.2099');
        $this->assertEntry(
            'Gehalt' . PHP_EOL . 'Arbeitsstelle',
             $date,
            1000.0
        );
    }

    /**
     * @test
     */
    public function canImportFilesWithDifferentColumnOrder()
    {
        $csvPath = __DIR__ . '/Fixtures/import_fixtures_different_column_order.CSV';
        $importService = new ImportService();
        $importService->importAccountingForPeriod($csvPath, $this->currentPeriod);

        //assert import count
        $allAccountings = $this->currentPeriod->accountings()->get();
        $exptectedCount = 2;
        $actualCount = $allAccountings->count();
        $this->assertSame($exptectedCount, $actualCount);

        //assert specific entries
        $date = new \DateTime('01.03.2099');
        $this->assertEntry(
            'Gehalt' . PHP_EOL . 'Arbeitgeber',
            $date,
            1000.0
        );

        $date = new \DateTime('02.03.2099');
        $this->assertEntry(
            'Kartenzahlung' . PHP_EOL . 'Rewe',
            $date,
            -20.20
        );
    }

    /**
     * @test
     */
    public function alreadyImportedAccountingsWontBeOverriden(): void
    {
        $importService = new ImportService();
        $importService->importAccountingForPeriod($this->defaultCsvFixturePath, $this->currentPeriod);

        //this file contains the exact same data as import_fixtures.CSV but with 3 new rows
        $newDataDataFixtures = __DIR__ . '/Fixtures/import_fixtures_new_data.CSV';
        $importService->importAccountingForPeriod($newDataDataFixtures, $this->currentPeriod);

        //assert import count
        $allAccountings = $this->currentPeriod->accountings()->get();
        $exptectedCount = 13;
        $actualCount = $allAccountings->count();

        $date = new \DateTime('02.03.2099');
        $this->assertEntry(
            'Noch mehr Gehalt' . PHP_EOL . 'Arbeitsstelle2',
            $date,
            1234.44
        );
        $this->assertSame($exptectedCount, $actualCount);
    }

    /**
     * @test
     */
    public function missingColumnsInFileProducesException()
    {
        $this->expectException(CsvValidationException::class);

        //this file contains the exact same data as import_fixtures.CSV but with 3 new rows
        $newDataDataFixtures = __DIR__ . '/Fixtures/import_fixtures_missing_column.CSV';
        $importService = new ImportService();

        try {
            $importService->importAccountingForPeriod($newDataDataFixtures, $this->currentPeriod);
        } catch (CsvValidationException $ex){
            $validationErrors = $ex->getValidationErrors();
            $expectedValidationError = "Headline for property 'title' and column 'Buchungstext' could not be found";
            $this->assertCount(1, $validationErrors);
            $this->assertSame($expectedValidationError, $validationErrors[0]);
            throw $ex;
        }
    }

    protected function assertEntry(string $title, \DateTime $date, float $totalAmount)
    {
        $accounting = Accounting::where('period_id', '=', $this->currentPeriod->id)
            ->where('title', '=', $title)
            ->where('date', '=', $date)
            ->where('totalAmount', '=', $totalAmount)
            ->get()
            ->first();

        $title = str_replace(PHP_EOL, ' PHP_EOL ', $title);
        $dateString = $date->format('d.m.Y');
        $this->assertNotNull(
            $accounting,
            "accounting with title '$title' date '$dateString' and totalAmount '$totalAmount' does not exists"
        );
    }

    /**
     * @test
     */
    public function previewModeDoesntStoreAnything(): void
    {
        $importService = new ImportService();
        $previewAccountings = $importService->importAccountingForPeriod($this->defaultCsvFixturePath, $this->currentPeriod, true);

        //assert nothing has been stored to the database
        $allAccountings = $this->currentPeriod->accountings()->get();
        $expectedCount = 0;
        $this->assertCount($expectedCount, $allAccountings);

        //assert only the preview objects have been retrieved
        $expectedCount = 10;
        $this->assertCount($expectedCount, $previewAccountings);
    }

    /**
     * @test
     */
    public function onlyDataPeriodWillBeImported(): void
    {
        $csvPath = __DIR__ . '/Fixtures/import_multiple_periods.CSV';
        $importService = new ImportService();

        $importService->importAccountingForPeriod($csvPath, $this->currentPeriod, false);

        $allAccountings = $this->currentPeriod->accountings()->get();
        $expectedCount = 2;
        $this->assertCount($expectedCount, $allAccountings);
    }

    protected function initializeFixtures(): void
    {
        $this->currentPeriod = Period::make([
            'month' => 3,
            'year' => 2099
        ]);
        $this->currentPeriod->save();
        $this->currentPeriod->refresh();
    }
}
