// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { autobind } from '@uifabric/utilities';
import * as Q from 'q';
import { VisualizationType } from '../../common/types/visualization-type';
import { Analyzer, AnalyzerConfiguration, AxeAnalyzerResult, ScanCompletedPayload } from './analyzer';

export type MessageType = {
    type: string;
    payload: ScanCompletedPayload<any>;
};

export class BaseAnalyzer implements Analyzer {
    protected sendMessage: (message) => void;
    protected type: VisualizationType;
    protected config: AnalyzerConfiguration;
    protected emptyResults: AxeAnalyzerResult = {
        results: {},
        originalResult: null,
    };

    constructor(config: AnalyzerConfiguration, sendMessageDelegate: (message) => void) {
        this.config = config;
        this.sendMessage = sendMessageDelegate;
        this.type = config.testType;
    }

    public analyze(): void {
        const results = this.getResults();

        // We intentionally float this promise; the current analyzer API is that analyze starts the
        // analysis and it's allowed to continue running for arbitrarily long until teardown() is called.
        //
        // tslint:disable-next-line:no-floating-promises
        results.then(this.onResolve);
    }

    public teardown(): void {}

    @autobind
    protected getResults(): Q.Promise<AxeAnalyzerResult> {
        return Q(this.emptyResults);
    }

    @autobind
    protected onResolve(analyzerResult: AxeAnalyzerResult): void {
        this.sendMessage(this.createBaseMessage(analyzerResult, this.config));
    }

    protected createBaseMessage(analyzerResult: AxeAnalyzerResult, config: AnalyzerConfiguration): MessageType {
        const messageType = config.analyzerMessageType;
        const originalAxeResult = analyzerResult.originalResult;
        const payload: ScanCompletedPayload<any> = {
            key: config.key,
            selectorMap: analyzerResult.results,
            scanResult: originalAxeResult,
            testType: config.testType,
        };
        return {
            type: messageType,
            payload,
        };
    }
}
