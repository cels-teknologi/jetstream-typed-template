interface Constants {
  withdrawals: {
    min: string;
    max: string;
  };
}

declare const constants: Constants;

export default { ...constants } as Constants;
