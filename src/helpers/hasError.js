export const hasError = (errors, field, type,) => {
    if (errors.param === field) {
      if (type === "helper") {
          return errors.msg
      } else {
          return true;
      }
    }
}
