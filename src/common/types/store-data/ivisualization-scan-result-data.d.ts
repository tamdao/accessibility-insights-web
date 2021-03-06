// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { DecoratedAxeNodeResult, HtmlElementAxeResults } from '../../../injected/scanner-utils';
import { TabOrderPropertyBag } from '../../../injected/tab-order-property-bag';
import { TabStopEvent } from '../../../injected/tab-stops-listener';

// tslint:disable-next-line:interface-name
interface IScanResultData<TSelector> {
    fullAxeResultsMap: DictionaryStringTo<TSelector>;
    scanResult?: ScanResults;
}

// tslint:disable-next-line:interface-name
export interface IIssuesScanResultData extends IScanResultData<HtmlElementAxeResults> {
    selectedAxeResultsMap: DictionaryStringTo<HtmlElementAxeResults>;
    selectedIdToRuleResultMap: DictionaryStringTo<DecoratedAxeNodeResult>;
    fullIdToRuleResultMap: DictionaryStringTo<DecoratedAxeNodeResult>;
}

// tslint:disable-next-line:interface-name
export interface ITabbedElementData extends TabStopEvent {
    tabOrder: number;
    propertyBag?: TabOrderPropertyBag;
}

// tslint:disable-next-line:interface-name
export interface ITabStopsScanResultData {
    tabbedElements: ITabbedElementData[];
}

// tslint:disable-next-line:interface-name
export interface IVisualizationScanResultData {
    issues: IIssuesScanResultData;
    landmarks: IIssuesScanResultData;
    headings: IIssuesScanResultData;
    color: IIssuesScanResultData;
    tabStops: ITabStopsScanResultData;
}
