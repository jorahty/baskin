/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @format uuid
 */
export type UUID = string;

/**
 * EMail Address
 * See [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322#section-3.4)
 * @pattern \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b
 * @format email
 */
export type EMAIL = string;

export interface Account {
  id: UUID,
  username: string,
  email: EMAIL,
  name: string,
  role: string
}

export interface Credentials {
  username: string,
  password: string
}
