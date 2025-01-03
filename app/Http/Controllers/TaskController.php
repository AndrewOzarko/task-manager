<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\TransferTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    public function list(): AnonymousResourceCollection
    {
        $tasks = Task::query()->paginate(10);

        return TaskResource::collection($tasks);
    }

    public function getTaskById(Task $task): TaskResource
    {
        return new TaskResource($task);
    }

    public function create(CreateTaskRequest $request): TaskResource
    {
        $data = $request->validated();
        $task = Task::query()->create($data);

        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task): TaskResource
    {
        $data = $request->validated();
        $task->update($data);

        return new TaskResource($task);
    }

    public function delete(Task $task): TaskResource
    {
        $task->delete();
        return new TaskResource($task);
    }

    public function transfer(TransferTaskRequest $request, Task $task): TaskResource
    {
        $task->update($request->validated());
        return new TaskResource($task);
    }
}
