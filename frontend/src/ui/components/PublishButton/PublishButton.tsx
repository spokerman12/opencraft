import * as React from 'react';
import { WrappedMessage } from 'utils/intl';
import { Button } from 'react-bootstrap';
import { OpenEdXInstanceDeploymentStatusStatusEnum as DeploymentStatus } from 'ocim-client';
import { DeploymentInfoModel } from 'console/models';

import messages from './displayMessages';
import './styles.scss';

interface Props {
  deployment?: DeploymentInfoModel;
  loading: boolean;
  onClickWrapper: Function;
}

export const PublishButton: React.FC<Props> = ({
  deployment,
  loading,
  onClickWrapper
}: Props) => {
  let deploymentDisabled: boolean = true;
  let undeployedChanges: number = 0;
  let deploymentStatus: DeploymentStatus | null = null;
  if (deployment) {
    deploymentStatus = deployment.status;
    undeployedChanges = deployment.undeployedChanges.length;

    deploymentDisabled =
      loading ||
      !undeployedChanges ||
      deploymentStatus === DeploymentStatus.Preparing;
  }

  // Notifications red blip
  const notificationNumber = undeployedChanges <= 9 ? undeployedChanges : '9+';

  return (
    <Button
      className={
        deploymentDisabled
          ? 'float-right disabledBtn'
          : 'float-right enabledBtn'
      }
      variant="primary"
      size="lg"
      disabled={deploymentDisabled}
      onClick={() => {
        onClickWrapper();
      }}
    >
      {undeployedChanges !== 0 && (
        <div className="notificationLayer">
          <p>
            <WrappedMessage
              id="notificationText"
              messages={messages}
              values={{ notificationNumber }}
            />
          </p>
        </div>
      )}
      <div className="textLayer">
        <WrappedMessage id="deploy" messages={messages} />
      </div>
    </Button>
  );
};
