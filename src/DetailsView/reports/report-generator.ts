// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AssessmentsProvider } from '../../assessments/types/iassessments-provider';
import { FeatureFlagStoreData } from '../../common/types/store-data/feature-flag-store-data';
import { IAssessmentStoreData } from '../../common/types/store-data/iassessment-result-data';
import { ITabStoreData } from '../../common/types/store-data/itab-store-data';
import { ScanResults } from '../../scanner/iruleresults';
import { AssessmentReportHtmlGenerator, AssessmentReportHtmlGeneratorDeps } from './assessment-report-html-generator';
import { ReportHtmlGenerator } from './report-html-generator';
import { ReportNameGenerator } from './report-name-generator';

export type ReportGeneratorDeps = AssessmentReportHtmlGeneratorDeps;

export class ReportGenerator {
    constructor(
        private reportNameGenerator: ReportNameGenerator,
        private reportHtmlGenerator: ReportHtmlGenerator,
        private assessmentReportHtmlGenerator: AssessmentReportHtmlGenerator,
    ) {}

    public generateName(baseName: string, scanDate: Date, pageTitle: string): string {
        return this.reportNameGenerator.generateName(baseName, scanDate, pageTitle);
    }

    public generateHtml(scanResult: ScanResults, scanDate: Date, pageTitle: string, pageUrl: string, description: string): string {
        return this.reportHtmlGenerator.generateHtml(scanResult, scanDate, pageTitle, pageUrl, description);
    }

    public generateAssessmentHtml(
        assessmentStoreData: IAssessmentStoreData,
        assessmentsProvider: AssessmentsProvider,
        featureFlagStoreData: FeatureFlagStoreData,
        tabStoreData: ITabStoreData,
        description: string,
    ): string {
        return this.assessmentReportHtmlGenerator.generateHtml(
            assessmentStoreData,
            assessmentsProvider,
            featureFlagStoreData,
            tabStoreData,
            description,
        );
    }
}
