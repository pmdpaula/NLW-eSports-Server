/**
 * 
 * @param hourString 
 * Converte string no formato hh:mm para minutos
 */
const convertHoursStringToMinutes = (hourString: string) => {
  const [hours, minutes] = hourString.split(':').map(Number);

  const minutesAmount = (hours * 60) + minutes;

  return minutesAmount;
}

export default convertHoursStringToMinutes;
