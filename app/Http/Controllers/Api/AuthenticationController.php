<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Resources\UserResource;
use App\Services\Api\AuthenticationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function login(LoginRequest $request, AuthenticationService $service): UserResource
    {
        $data = $request->validated();
        $user = $service->login($data);

        return new UserResource($user);
    }

    public function registration(RegistrationRequest $request, AuthenticationService $service): USerResource
    {
        $data = $request->validated();
        $user = $service->registration($data);

        return new UserResource($user);
    }

    /**
     * @throws ValidationException
     */
    public function forgotPassword(ForgotPasswordRequest $request, AuthenticationService $service): JsonResponse
    {
        $data = $request->validated();
        $service->forgotPassword($data);

        return response()->json();
    }

    /**
     * @throws ValidationException
     */
    public function resetPassword(ResetPasswordRequest $request, AuthenticationService $service): JsonResponse
    {
        $data = $request->validated();
        $service->resetPassword($data);

        return response()->json();
    }
}
