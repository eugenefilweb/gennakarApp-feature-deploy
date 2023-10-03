export type ReadFile = {
  data: string,
}

export type WriteFile = {
  uri: string,
}

export type ToBlob = {
  blob: Blob, 
  filepath: string
}