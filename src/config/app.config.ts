export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  max_file_size: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880,
});
