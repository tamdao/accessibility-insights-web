// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as _ from 'lodash';

import { AssessmentsProvider } from '../assessments/types/iassessments-provider';
import { IBaseStore } from '../common/istore';
import { ManualTestStatus } from '../common/types/manual-test-status';
import { IAssessmentStoreData, IGeneratedAssessmentInstance } from '../common/types/store-data/iassessment-result-data';
import { IVisualizationScanResultData } from '../common/types/store-data/ivisualization-scan-result-data';
import { VisualizationType } from '../common/types/visualization-type';
import { DictionaryStringTo } from '../types/common-types';
import { IAssessmentVisualizationInstance } from './frameCommunicators/html-element-axe-results-helper';

export class SelectorMapHelper {
    private scanResultStore: IBaseStore<IVisualizationScanResultData>;
    private assessmentStore: IBaseStore<IAssessmentStoreData>;
    private assessmentsProvider: AssessmentsProvider;

    constructor(
        scanResultStore: IBaseStore<IVisualizationScanResultData>,
        assessmentStore: IBaseStore<IAssessmentStoreData>,
        assessmentsProvider: AssessmentsProvider,
    ) {
        this.scanResultStore = scanResultStore;
        this.assessmentStore = assessmentStore;
        this.assessmentsProvider = assessmentsProvider;
    }

    public getSelectorMap(visualizationType: VisualizationType): DictionaryStringTo<IAssessmentVisualizationInstance> {
        let selectorMap = {};

        if (this.isAdHocVisualization(visualizationType)) {
            selectorMap = this.getAdHocVisualizationSelectorMap(visualizationType);
        }

        if (this.assessmentsProvider.isValidType(visualizationType)) {
            const key = this.assessmentsProvider.forType(visualizationType).key;
            const assessmentState = this.assessmentStore.getState();
            selectorMap = this.getFilteredSelectorMap(
                assessmentState.assessments[key].generatedAssessmentInstancesMap,
                assessmentState.assessmentNavState.selectedTestStep,
            );
        }

        return selectorMap;
    }

    private isAdHocVisualization(type: VisualizationType): boolean {
        return _.includes(
            [
                VisualizationType.Issues,
                VisualizationType.Headings,
                VisualizationType.Landmarks,
                VisualizationType.TabStops,
                VisualizationType.Color,
            ],
            type,
        );
    }

    private getAdHocVisualizationSelectorMap(type: VisualizationType): DictionaryStringTo<IAssessmentVisualizationInstance> {
        let selectorMap = {};
        const visulizaitonScanResultState = this.scanResultStore.getState();

        switch (type) {
            case VisualizationType.Issues:
                selectorMap = visulizaitonScanResultState.issues.selectedAxeResultsMap;
                break;
            case VisualizationType.Headings:
                selectorMap = visulizaitonScanResultState.headings.fullAxeResultsMap;
                break;
            case VisualizationType.Landmarks:
                selectorMap = visulizaitonScanResultState.landmarks.fullAxeResultsMap;
                break;
            case VisualizationType.TabStops:
                selectorMap = visulizaitonScanResultState.tabStops.tabbedElements;
                break;
            default:
                selectorMap = visulizaitonScanResultState.color.fullAxeResultsMap;
                break;
        }

        return selectorMap;
    }

    private getFilteredSelectorMap<T, K>(
        generatedAssessmentInstancesMap: DictionaryStringTo<IGeneratedAssessmentInstance<T, K>>,
        testStep: string,
    ): DictionaryStringTo<IAssessmentVisualizationInstance> {
        if (generatedAssessmentInstancesMap == null) {
            return null;
        }

        const selectorMap: DictionaryStringTo<IAssessmentVisualizationInstance> = {};
        Object.keys(generatedAssessmentInstancesMap).forEach(identifier => {
            const instance = generatedAssessmentInstancesMap[identifier];
            const stepResult = instance.testStepResults[testStep as keyof K];
            if (stepResult != null) {
                selectorMap[identifier] = {
                    target: instance.target,
                    isFailure: stepResult.status === ManualTestStatus.FAIL,
                    isVisualizationEnabled: stepResult.isVisualizationEnabled,
                    isVisible: stepResult.isVisible,
                    html: instance.html,
                    propertyBag: instance.propertyBag,
                    identifier: identifier,
                    ruleResults: null,
                };
            }
        });

        return selectorMap;
    }
}
