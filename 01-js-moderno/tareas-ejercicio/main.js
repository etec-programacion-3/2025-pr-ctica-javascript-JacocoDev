// Importa las funciones del módulo de tareas
import { getTasks, addTask, editTask, removeTask } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Agrega el selector de filtro
const filterSelect = document.createElement('select');
filterSelect.innerHTML = `
  <option value="all">Todas</option>
  <option value="completed">Completadas</option>
  <option value="pending">Pendientes</option>
`;
form.appendChild(filterSelect);

// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  const filter = filterSelect.value;
  getTasks().forEach((task, idx) => {
    if (
      (filter === 'completed' && !task.completed) ||
      (filter === 'pending' && task.completed)
    ) {
      return;
    }

    const li = document.createElement('li');

    // Checkbox para completar
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      toggleTask(idx);
      renderTasks();
    };

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
      span.style.textDecoration = 'line-through';
    }

    // Botón para editar la tarea
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const newTask = prompt('Editar tarea:', task);
      if (newTask !== null && newTask.trim() !== '') {
        editTask(idx, newTask.trim());
        renderTasks();
      }
    };

    // Botón para eliminar la tarea
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
      removeTask(idx);
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Maneja el evento submit del formulario para agregar una tarea
form.onsubmit = e => {
  e.preventDefault();
  addTask(input.value);
  input.value = '';
  renderTasks();
};

filterSelect.onchange = () => {
  renderTasks();
};

// Render inicial de las tareas
renderTasks(); 