// Vista: Se encarga de la presentación y la interacción con el usuario
export class TaskView {
  constructor() {
    // Referencias a los elementos del DOM
    this.list = document.getElementById('task-list');
    this.form = document.getElementById('task-form');
    this.input = document.getElementById('task-input');
  }

  // Renderiza la lista de tareas en el DOM
  render(tasks) {
    this.list.innerHTML = '';
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      
      const span = document.createElement('span');
      span.textContent = task;

      // TODO: Agrega aquí el botón y la lógica para eliminar la tarea
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Eliminar';
      removeBtn.className = 'remove';
      removeBtn.dataset.idx = idx;

      
      // TODO: Agrega aquí el botón y la lógica para editar la tarea
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'edit';
      editBtn.dataset.idx = idx;
      
      li.appendChild(span);
      li.appendChild(removeBtn);
      li.appendChild(editBtn);
      this.list.appendChild(li);    
    });
  }

  // Asocia el evento de agregar tarea al formulario
  bindAddTask(handler) {
    this.form.onsubmit = e => {
      e.preventDefault();
      handler(this.input.value); // Llama al controlador con el valor ingresado
      this.input.value = '';
    };
  }

  // TODO: Asocia el evento de eliminar tarea a la lista
  // TODO: Asocia el evento de editar tarea a la lista
  bindTaskEvents(removeHandler, editHandler) {
    this.list.onclick = e => {
      const target = e.target;

      if (target.classList.contains('remove')) {
          handler(Number(e.target.dataset.idx));
      }
      
      if (target.classList.contains('edit')) {
        const idx = Number(e.target.dataset.idx);
        const nuevoTexto = prompt('Editar tarea:', e.target.parentElement.querySelector('span').textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
          handler(idx, nuevoTexto.trim());
        }
      }
    };
  }
}

/*
Tuve que unificar en una sola función los eventos de eliminar y editar tareas, porque al hacerlos por separado se sobreescribía el this.list.onclick. Antes de corregirlo tenía esto:

bindRemoveTask(handler) {
  this.list.onclick = e => {
    if (e.target.classList.contains('remove')) {
      handler(Number(e.target.dataset.idx));
    }
  };
}

bindEditTask(handler) {
  this.list.onclick = e => {
    if (e.target.classList.contains('edit')) {
      const idx = Number(e.target.dataset.idx);
      const nuevoTexto = prompt('Editar tarea:', e.target.parentElement.querySelector('span').textContent);
      if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
        handler(idx, nuevoTexto.trim());
      }
    }
  };
}

El problema es que el segundo this.list.onclick sobreescribe al primero, entonces para evitarlo, los combiné en un solo método que maneja ambos casos dentro de una misma función.
*/