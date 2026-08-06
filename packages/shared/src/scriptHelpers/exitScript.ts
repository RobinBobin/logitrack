export const exitScript = (message: string, code = 1): never => {
  console.error(message)

  process.exit(code)
}
