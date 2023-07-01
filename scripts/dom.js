const input = document.getElementById('chapter-input');
const addButton = document.getElementById('add-button');
const chapterList = document.getElementById('chapter-list');

addButton.addEventListener('click', function() {
  const chapter = input.value.trim();

  if (chapter !== '') {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = chapter;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');

    deleteButton.addEventListener('click', function() {
      li.remove();
      input.focus();
    });

    li.appendChild(deleteButton);
    chapterList.appendChild(li);

    input.value = '';
    input.focus();
  }
});