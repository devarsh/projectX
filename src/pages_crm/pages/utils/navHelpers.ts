import { UserFlowType } from "components/dyanmicForm";

const flowComponentPathMapping = {
  OTP: { url: "./otp" },
  Aadhar: { url: "./aadhar" },
  Equifax: { url: "./equifax" },
  ThankyouAndContinue: { url: "./thankyou", continue: true },
  Thankyou: { url: "./thankyou" },
};

export const navigationFlowDecisionMaker = (
  flow: UserFlowType[] = [],
  currentSequence: number,
  fallbackPath: string
) => {
  const result = flow.find((one) => one.sequence === currentSequence);
  console.log(flow);
  if (result !== undefined) {
    let myResult = flowComponentPathMapping[result?.componentName ?? ""] ?? {};
    const finalResult = {
      ...result,
      ...myResult,
    };
    return finalResult;
  } else {
    return {
      url: fallbackPath,
    };
  }
};

export const getCurrentFlow = (
  flow: UserFlowType[] = [],
  currentSequence: number
) => {
  const result = flow.find((one) => one.sequence === currentSequence);
  if (result !== undefined) {
    return flowComponentPathMapping[result?.componentName ?? ""];
  }
};

export const useNavigationFlow = (location, fallbackPath) => {
  const { state: navigationState } = location;
  //@ts-ignore
  const { refID, prevSeq = -1, flow } = navigationState ?? {};
  const currentSeq = prevSeq + 1;
  let nextFlow = navigationFlowDecisionMaker(flow, currentSeq, fallbackPath);

  const myGetCurrentFlow = () => {
    return getCurrentFlow(flow, prevSeq);
  };

  const flowExist =
    Array.isArray(flow) &&
    flow.length > 0 &&
    refID !== undefined &&
    currentSeq > 0 &&
    currentSeq <= flow.length;
  return [
    flowExist,
    refID,
    nextFlow.url,
    {
      state: {
        ...navigationState,
        prevSeq: currentSeq,
      },
    },
    fallbackPath,
    myGetCurrentFlow,
  ];
};
