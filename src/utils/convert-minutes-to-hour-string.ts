/**
 * 
 * @param hourString 
 * Converte string no formato hh:mm para minutos
 */
const convertMinutesToHoursString = (minutesAmount: number) => {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export default convertMinutesToHoursString;
