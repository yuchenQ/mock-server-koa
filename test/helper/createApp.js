import path from 'path';
import createMockServer from '../../src';

const PORT = 9999;

export default async () => {
  const servicesDir = path.resolve(__dirname, '../services');
  const server = await createMockServer(servicesDir);
  const app = server.listen(PORT, () => console.log(`Starting server on port ${PORT}`));

  return app;
};
