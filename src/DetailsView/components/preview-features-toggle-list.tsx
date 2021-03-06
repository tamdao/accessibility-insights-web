// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as React from 'react';

import { IDisplayableFeatureFlag } from '../../common/types/store-data/idisplayable-feature-flag';
import { DetailsViewActionMessageCreator } from '../actions/details-view-action-message-creator';
import { GenericToggle } from './generic-toggle';

export interface PreviewFeaturesToggleListProps {
    displayedFeatureFlags: IDisplayableFeatureFlag[];
    actionMessageCreator: DetailsViewActionMessageCreator;
}

export class PreviewFeaturesToggleList extends React.Component<PreviewFeaturesToggleListProps> {
    public render(): JSX.Element {
        return <div className="preview-feature-toggle-list">{this.generateToggleList()}</div>;
    }

    private generateToggleList(): JSX.Element[] {
        const flags = this.props.displayedFeatureFlags;
        const toggleList = flags.map((displayableFlag: IDisplayableFeatureFlag) => (
            <GenericToggle
                name={displayableFlag.displayableName}
                description={displayableFlag.displayableDescription}
                enabled={displayableFlag.enabled}
                onClick={this.props.actionMessageCreator.setFeatureFlag}
                key={this.getToggleKey(displayableFlag.id)}
                id={displayableFlag.id}
            />
        ));

        return toggleList;
    }

    private getToggleKey(flagId: string): string {
        return `preview_feature_toggle${flagId}`;
    }
}
