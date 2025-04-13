import { useState } from 'react'
import { useAppStore, Task } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TaskTable } from '@/components/tasks/task-table'
import { TaskModal } from '@/components/tasks/task-modal'

export function DashboardPage() {
  const { user } = useAppStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

  const handleAddTask = () => {
    setSelectedTask(undefined)
    setIsModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome{user?.username ? `, ${user.username}` : ''}! Manage your tasks below.
          </p>
        </div>
        <Button onClick={handleAddTask}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-medium mb-4">Task Management</h3>
            <TaskTable onEdit={handleEditTask} />
          </div>
        </div>
      </div>
      
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        task={selectedTask} 
      />
    </div>
  )
} 