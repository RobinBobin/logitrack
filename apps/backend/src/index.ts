import http from 'http'

const PORT = 3000

const server = http.createServer((req, res) => {
  // Проверяем, что метод GET и путь /
  if (req.method === 'GET' && req.url === '/') {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Hello from Logitrack with Docker!')
  } else {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`)
})
