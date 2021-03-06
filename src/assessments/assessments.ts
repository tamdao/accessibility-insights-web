// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AssessmentsProviderImpl } from './assessments-provider';
import { AudioVideoOnlyAssessment } from './audio-video-only/assessment';
import { AutomatedChecks } from './automated-checks/assessment';
import { ColorSensoryAssessment } from './color/assessment';
import { CustomWidgets } from './custom-widgets/assessment';
import { ErrorsAssessment } from './errors/assessment';
import { HeadingsAssessment } from './headings/assessment';
import { ImagesAssessment } from './images/assessment';
import { KeyboardInteraction } from './keyboard-interaction/assessment';
import { LandmarksAssessment } from './landmarks/assessment';
import { LanguageAssessment } from './language/assessment';
import { LinksAssessment } from './links/assessments';
import { LiveMultimediaAssessment } from './live-multimedia/assessment';
import { NativeWidgetsAssessment } from './native-widgets/assessment';
import { PageAssessment } from './page/assessment';
import { ParsingAssessment } from './parsing/assessment';
import { PrerecordedMultimediaAssessment } from './prerecorded-multimedia/assessment';
import { RepetitiveContentAssessment } from './repetitive-content/assessment';
import { SemanticsAssessment } from './semantics/assessment';
import { SequenceAssessment } from './sequence/assessment';
import { TextLegibilityAssessment } from './text-legibility/assessment';
import { TimedEventsAssessment } from './timed-events/assessment';
import { AssessmentsProvider } from './types/iassessments-provider';
import { VisibleFocusOrderAssessment } from './visible-focus-order/assessment';

export const Assessments: AssessmentsProvider = AssessmentsProviderImpl.Create([
    AutomatedChecks,
    KeyboardInteraction,
    VisibleFocusOrderAssessment,
    LandmarksAssessment,
    HeadingsAssessment,
    RepetitiveContentAssessment,
    LinksAssessment,
    NativeWidgetsAssessment,
    CustomWidgets,
    TimedEventsAssessment,
    ErrorsAssessment,
    PageAssessment,
    ParsingAssessment,
    ImagesAssessment,
    LanguageAssessment,
    ColorSensoryAssessment,
    TextLegibilityAssessment,
    AudioVideoOnlyAssessment,
    PrerecordedMultimediaAssessment,
    LiveMultimediaAssessment,
    SequenceAssessment,
    SemanticsAssessment,
]);
