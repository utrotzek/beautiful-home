<?php

namespace App\Http\Resources\Finance;

use Illuminate\Http\Resources\Json\JsonResource;

class AccountingResource extends JsonResource
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
            'title' => $this->title,
            'totalAmount' => $this->totalAmount,
            'remainingAmount' => $this->remainingAmount,
            'date' => $this->date,
            'connectedPlanning' => new CostCenterAccountingCollection($this->costCenterAccounting),
            'isNew' => false,
            'display' => true,
            'editMode' => false,
        ];
    }
}
