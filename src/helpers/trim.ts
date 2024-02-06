export const trim = (str: string, chars: string = '\\s'): string => {
  const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
  return str.replace(pattern, '');
};
