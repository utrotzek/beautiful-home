<?php

use App\Finance\Planning;
use App\Finance\Template;
use Illuminate\Database\Seeder;

class PlanningSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        //january
        $incomingPlanningJanuary = factory(Planning::class, 3)
            ->states('income')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.01.2020'), new DateTime('04.01.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(1)->id
            ]);

        $outgoingPlanningsJanuary = factory(Planning::class, 20)
            ->states('outgoing')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.01.2020'), new DateTime('31.01.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(1)->id
            ]);

        $merged = $incomingPlanningJanuary->union($outgoingPlanningsJanuary);
        foreach ($merged as $planning){
            $planning->save();
        }

        //february
        $incomingPlanningFebruary = factory(Planning::class, 3)
            ->states('income')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.02.2020'), new DateTime('04.02.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(2)->id
            ]);

        $outgoingPlanningsFebruary = factory(Planning::class, 15)
            ->states('outgoing')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.02.2020'), new DateTime('29.02.2020')),
                'totalAmount' => 0,
                'period_id' => \App\Finance\Period::find(2)->id
            ]);

        $merged = $incomingPlanningFebruary->union($outgoingPlanningsFebruary);
        foreach ($merged as $planning){
            $planning->save();
        }

        //march
        $incomingPlanningMarch = factory(Planning::class, 3)
            ->states('income')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.03.2020'), new DateTime('04.03.2020')),
                'period_id' => \App\Finance\Period::find(3)->id
            ]);

        $outgoingPlanningsMarch = factory(Planning::class, 15)
            ->states('outgoing')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.03.2020'), new DateTime('29.03.2020')),
                'period_id' => \App\Finance\Period::find(3)->id
            ]);

        $merged = $incomingPlanningMarch->union($outgoingPlanningsMarch);
        foreach ($merged as $planning){
            $planning->save();
        }


        //default template
        $incomingPlanningTemplate = factory(Planning::class, 2)
            ->states('income')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.01.3000'), new DateTime('04.01.3000')),
                'template_id' => Template::find(1)->id
            ]);

        $outgoingPlanningsTemplate = factory(Planning::class, 15)
            ->states('outgoing')
            ->make([
                'date' => $faker->dateTimeBetween(new DateTime('01.03.3000'), new DateTime('31.03.3000')),
                'template_id' => Template::find(1)->id
            ]);

        $merged = $incomingPlanningTemplate->union($outgoingPlanningsTemplate);
        foreach ($merged as $planning){
            $planning->save();
        }
    }
}
