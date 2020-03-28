<?php

namespace Tests\Unit;

use App\Finance\Accounting;
use App\Finance\CostCenterAccounting;
use PHPUnit\Framework\MockObject\MockObject;
use Tests\TestCase;

class AccountingTest extends TestCase
{
    /**
     * @test
     */
    public function amountWillBeUpdatedOnNegativeAmountsProperly()
    {
        $accounting = new Accounting([
            'totalAmount' => -200,
            'remainingAmount' => -200
        ]);

        $accounting->costCenterAccounting = [
            new CostCenterAccounting(['totalAmount' => -20]),
            new CostCenterAccounting(['totalAmount' => -30])
        ];

        $accounting->updateAmount(-150);

        $expectedRemainingAmount = -100;
        $actualRemainingAmount = $accounting->remainingAmount;
        $this->assertSame($expectedRemainingAmount, $actualRemainingAmount);
    }

    /**
     * @test
     */
    public function amountWillBeUpdatedOnPositiveAmountsProperly()
    {
        $accounting = new Accounting([
            'totalAmount' => 200,
            'remainingAmount' => 200
        ]);

        $accounting->costCenterAccounting = [
            new CostCenterAccounting(['totalAmount' => 20]),
            new CostCenterAccounting(['totalAmount' => 30])
        ];

        $accounting->updateAmount(150);

        $expectedRemainingAmount = 100;
        $actualRemainingAmount = $accounting->remainingAmount;
        $this->assertSame($expectedRemainingAmount, $actualRemainingAmount);
    }
}
