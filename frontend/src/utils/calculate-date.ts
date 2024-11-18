export function calculateAge(dateOfBirth: string): number {
  const [day, month, year] = dateOfBirth.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age;
}
