import { Hono,type Context } from 'hono';

const app = new Hono();

app.post(
  '/time-table/upload',
  async (c: Context) => {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (file instanceof File) {
      // You have a File object, you can now:
      console.log(`File Name: ${file.name}`);
      console.log(`File Size: ${file.size} bytes`);
      console.log(`File Type: ${file.type}`);

      // Process the file, e.g., save it to storage or upload to S3/R2
      // For large files, consider using file.stream() for memory efficiency

      return c.json({ message: `File "${file.name}" uploaded successfully!` });
    } else {
      return c.json({ message: 'No file uploaded or an unexpected field type.' }, 400);
    }
  }
);

export { app };