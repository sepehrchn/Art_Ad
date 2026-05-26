/// <reference types="vite/client" />

declare module '*.module.css' {
  const content: { [key: string]: string }
  export default content
}
