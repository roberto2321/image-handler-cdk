import { TestResult } from "../entities";
import { BaseGenericService } from "./base-generic.service";

class TestResultServiceClass extends BaseGenericService<TestResult> {

}

export const TestResultService = new TestResultServiceClass(TestResult);