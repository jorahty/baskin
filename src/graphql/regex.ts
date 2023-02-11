export const regexUUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// export const regexEmail =
//   /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const regexUsername =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/;

export const regexSlug =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const regexISODate =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;
