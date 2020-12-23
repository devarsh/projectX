import { UserFlowType } from "components/dyanmicForm";

const flowComponentPathMapping = {
  OTP: "/otp",
  ThankyouAndContinue: "/thankyou",
  Aadhar: "/aadhar",
};

export const navigationFlowDecisionMaker = (
  flow: UserFlowType[] = [],
  currentSequence: number
) => {
  const result = flow.find((one) => one.sequence === currentSequence);

  if (result !== undefined) {
    const finalResult = {
      ...result,
      url: flowComponentPathMapping[result?.componentName ?? ""],
    };
    return finalResult;
  }
  return {
    url: flowComponentPathMapping["ThankyouAndContinue"],
  };
};
