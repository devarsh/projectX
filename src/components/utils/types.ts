import { TopLevelCondition } from "json-rules-engine";
export interface CustomRuleType {
  conditions: TopLevelCondition;
  success: any;
  failure: any;
}
