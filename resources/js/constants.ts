interface Constants {
  // @todo: implement this
  [k: string]: unknown;
}

declare const constants: Constants;

export default { ...constants } as Constants;
