<?php

namespace App\Http\Requests;

use App\Enums\Task\PriorityEnum;
use App\Enums\Task\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CreateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'description' => 'nullable|string',
            'status' => ['required', 'integer', new Enum(StatusEnum::class)],
            'priority' => ['required', 'integer', new Enum(PriorityEnum::class)],
        ];
    }
}
