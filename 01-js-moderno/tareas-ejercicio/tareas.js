// Módulo de tareas usando ES6+
// Provee funciones para obtener, agregar y eliminar tareas usando localStorage

const STORAGE_KEY = 'tasks'; // Clave para localStorage

// Guarda la lista en localStorage
function saveTasks(tasks) 
{
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Devuelve la lista de tareas almacenadas en localStorage
export function getTasks() 
{
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Agrega una tarea como objeto con estado
export function addTask(text) 
{
  const tasks = getTasks();
  tasks.push({ text, completed: false });
  saveTasks(tasks);
}

// Edita una tarea por índice
export function editTask(index, newText) 
{
  const tasks = getTasks();
  tasks[index].text = newText;
  saveTasks(tasks);
}

// Cambia el estado de la tarea
export function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
}

// Elimina una tarea por índice
export function removeTask(index) 
{
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
}