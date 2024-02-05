export const clearForm = (id: string) => {
  // Получаем форму по её id
  const form = document.getElementById(`${id}`);
  if (!form) {
    console.log(`Ошибка! Форма с id: ${id} не найдена`);
    return;
  }
  const formElements = form.querySelectorAll('input');
  formElements.forEach((element) => {
    element.value = '';
  });
};
