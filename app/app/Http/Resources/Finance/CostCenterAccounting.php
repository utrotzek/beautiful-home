<?php

namespace App\Http\Resources\Finance;

use App\Http\Resources\CostCenter;
use Illuminate\Http\Resources\Json\JsonResource;

class CostCenterAccounting extends JsonResource
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
            'totalAmount' => $this->totalAmount,
            'description' => $this->description,
            'editMode' => false,
            'display' => true,
            'costCenter' => new CostCenter($this->costCenter)
        ];
    }
}
