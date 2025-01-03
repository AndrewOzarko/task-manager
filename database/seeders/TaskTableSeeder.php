<?php

namespace Database\Seeders;

use App\Enums\Task\PriorityEnum;
use App\Enums\Task\StatusEnum;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $tasks = [
            'Prepare presentation',
            'Update project documentation',
            'Fix bug #123',
            'Write unit tests',
            'Refactor legacy code',
            'Deploy to production',
            'Research new technology',
            'Create user stories',
            'Optimize database queries',
            'Implement new feature',
            'Setup CI/CD pipeline',
            'Review pull requests',
            'Plan sprint backlog',
            'Conduct team meeting',
            'Write blog post',
            'Perform security audit',
            'Generate sales report',
            'Organize team-building event',
            'Develop marketing strategy',
            'Prepare quarterly report',
        ];

        foreach ($tasks as $title) {
            usleep(100000);
            Task::create([
                'title' => $title,
                'description' => $this->generateDescription($title),
                'status' => $this->randomStatus(),
                'priority' => $this->randomPriority(),
            ]);
        }
    }

    /**
     * Generate a random description based on the title.
     *
     * @param string $title
     * @return string
     */
    private function generateDescription(string $title): string
    {
        return "This task involves: " . strtolower($title) . '. Ensure all requirements are met.';
    }

    /**
     * Get a random status from TaskStatus enum.
     *
     * @return int
     */
    private function randomStatus(): int
    {
        $statuses = StatusEnum::cases();
        return $statuses[array_rand($statuses)]->value;
    }

    /**
     * Get a random priority from TaskPriority enum.
     *
     * @return int
     */
    private function randomPriority(): int
    {
        $priorities = PriorityEnum::cases();
        return $priorities[array_rand($priorities)]->value;
    }
}
