<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Planning extends JsonResource
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
            'description' => $this->description,
            'totalAmount' => $this->totalAmount,
            'date' => $this->date,
            'costCenter' => new CostCenter($this->costCenter),
            'period' => new Period($this->period),
            'display' => true,
            'editMode' => false,
            'isNew' => false,
        ];
    }
}
