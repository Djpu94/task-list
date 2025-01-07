import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should add a task and emit the updated list', () => {
    const task = {
      id: 0,
      name: 'Test',
      description: 'Test description',
      status: 'Pendiente',
    };
    service.addTask(task);
    service.tasks$.subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].name).toBe('Test');
    });
  });
});
