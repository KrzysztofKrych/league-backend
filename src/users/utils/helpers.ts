import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashText = async (text: string): Promise<string> =>
  await bcrypt.hash(text, saltOrRounds);

export const compareText = async (
  text: string,
  hash: string,
): Promise<boolean> => await bcrypt.compare(text, hash);
