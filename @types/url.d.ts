/** URL type that allows only HTTP or HTTPS strings */
export type Https = `https://${string}`
export type Http = `http://${string}`

/** A URL can be either an HTTPS or HTTP string */
export type Url = Https | Http
