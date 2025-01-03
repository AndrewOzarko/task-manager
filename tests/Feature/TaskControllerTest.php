<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Database\Seeders\TaskTableSeeder;
use Database\Seeders\UserTableSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(UserTableSeeder::class);
        $this->seed(TaskTableSeeder::class);

        $this->actingAs(User::query()->first());
    }

    public function test_it_can_create_a_task()
    {
        $taskData = [
            'title' => 'Test Task',
            'description' => 'This is a test task.',
            'status' => 0,
            'priority' => 1,
        ];

        $response = $this->postJson('/api/tasks', $taskData);
        $response->assertStatus(201);
        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
            'description' => 'This is a test task.',
            'status' => 0,
            'priority' => 1,
        ]);

        $response->assertJsonFragment([
            'title' => 'Test Task',
            'description' => 'This is a test task.',
            'status' => 0,
            'priority' => 1,
        ]);
    }

    public function test_it_can_list_tasks()
    {
        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id', 'title', 'description', 'status', 'priority', 'created_at',
                ]
            ]
        ]);
    }

    public function test_it_can_show_a_task()
    {
        $task = Task::query()->first();

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $task->id,
            'title' => $task->title,
            'description' => $task->description,
            'status' => $task->status,
            'priority' => $task->priority,
        ]);
    }

    public function test_it_can_update_a_task()
    {
        $task = Task::query()->first();

        $updateData = [
            'title' => 'Updated Task',
            'description' => 'This task has been updated.',
            'status' => 1,
            'priority' => 2,
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updateData);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'title' => 'Updated Task',
            'description' => 'This task has been updated.',
            'status' => 1,
            'priority' => 2,
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task',
            'description' => 'This task has been updated.',
            'status' => 1,
            'priority' => 2,
        ]);
    }

    public function test_it_can_delete_a_task()
    {
        $task = Task::query()->first();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id
        ]);
    }
}
