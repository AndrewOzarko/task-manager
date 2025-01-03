<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request): UserResource
    {
        $data = $request->validated();
        $user = User::query()->where('email', $data['email'])->first();
        if (!Hash::check($data['password'], $user['password'])) {
            throw ValidationException::withMessages(
                ['email' => 'Username or password is incorrect.']
            );
        }
        $user->access_token = $user->createToken('token', ['*'], now()->addDay())->plainTextToken;
        Cookie::queue(
            Cookie::make(
                'access_token',
                $user->access_token,
                1440,
                '/',
                null,
                false,
                true,
                false,
            )
        );
        return new UserResource($user);
    }

    public function registration(RegistrationRequest $request): USerResource
    {
        $data = $request->validated();
        $user = user::query()->create($data);
        $user->access_token = $user->createToken('token', ['*'], now()->addDay())->plainTextToken;
        Cookie::queue(
            Cookie::make(
                'access_token',
                $user->access_token,
                1440,
                '/',
                null,
                true,
                false,
                false,
            )
        );
        return new UserResource($user);
    }
}
