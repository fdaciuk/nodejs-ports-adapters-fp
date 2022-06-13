declare global {
  /* eslint-disable no-unused-vars */
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string | undefined
      JWT_SECRET: string | undefined
    }
  }
}
export {}
