<?php

namespace App\Http\Resources;

use App\Utility\MonthUtility;
use Illuminate\Http\Resources\Json\JsonResource;

class Period extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'month' => $this->month,
            'monthName' => $this->monthIdToName($this->month),
            'year' => $this->year,
            'completed' => $this->completed,
        ];
    }

    private function monthIdToName($number){
        $mapping = MonthUtility::getMonthList();
        return $mapping[$number];
    }
}
