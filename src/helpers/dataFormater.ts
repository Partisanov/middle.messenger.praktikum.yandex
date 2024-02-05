export function getFormatTime(dateTimeString: string): string {
  const dateObject = new Date(dateTimeString);

  // Извлекаем часы и минуты
  const hours: number = dateObject.getHours();
  const minutes: number = dateObject.getMinutes();

  // Форматируем время в виде строки (добавляем ведущий ноль при необходимости)
  const formattedTime: string = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedTime;
}

export function formatDateTime(dateTimeString: string): string {
  const dateObject = new Date(dateTimeString);

  const today = new Date();
  const isToday =
    dateObject.getDate() === today.getDate() &&
    dateObject.getMonth() === today.getMonth() &&
    dateObject.getFullYear() === today.getFullYear();

  if (isToday) {
    // Если дата сегодня, форматируем как hh:mm
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    // Иначе форматируем как день недели (Пн, Вт, ..., Вс)
    const daysOfWeek: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayOfWeek: string = daysOfWeek[dateObject.getDay()];
    return dayOfWeek;
  }
}
