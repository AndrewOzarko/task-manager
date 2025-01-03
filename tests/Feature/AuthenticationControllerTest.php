<?php

use Database\Seeders\UserTableSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(UserTableSeeder::class);

    }

    public function test_it_can_login()
    {
        $loginData = [
            'email' => 'test@example.com',
            'password' => 'secret',
        ];

        $response = $this->postJson('/api/login', $loginData);

        $response->assertStatus(200);
    }
}
