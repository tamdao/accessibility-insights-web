// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { It, Mock, MockBehavior } from 'typemoq';

import { AssessmentToggleActionPayload } from '../../../../background/actions/action-payloads';
import { Interpreter } from '../../../../background/interpreter';
import { ScannerUtility } from '../../../../background/scanner-utility';
import { Messages } from '../../../../common/messages';
import { WindowUtils } from '../../../../common/window-utils';

describe('ScannerUtility', () => {
    it('constructor', () => {
        expect(new ScannerUtility(null, null)).toBeDefined();
    });

    describe('executeScan', () => {
        const interpreterMock = Mock.ofType(Interpreter, MockBehavior.Strict);
        const testStub = -1;
        const requirement = 'test step';
        const tabId = -2;
        const windowUtilsMock = Mock.ofType(WindowUtils, MockBehavior.Strict);
        let callback;

        const expectedPayload: AssessmentToggleActionPayload = {
            test: testStub,
            requirement: requirement,
            telemetry: null,
        };

        const expectedMessage = {
            type: Messages.Assessment.EnableVisualHelper,
            tabId: tabId,
            payload: expectedPayload,
        };

        interpreterMock.setup(im => im.interpret(It.isValue(expectedMessage))).verifiable();

        windowUtilsMock
            .setup(wum => wum.setTimeout(It.isAny(), ScannerUtility.scanTimeoutMilliSeconds))
            .callback(timeoutCallback => {
                callback = timeoutCallback;
            });

        const testSubject = new ScannerUtility(interpreterMock.object, windowUtilsMock.object);
        testSubject.executeScan(testStub, requirement, tabId);
        callback();

        interpreterMock.verifyAll();
    });
});
