import * as React from 'react';
import { buildStatusContext } from './util';

interface Props {
  redeploymentStatus?: string | null;
  deploymentType?: string | null;
}

export const DeploymentIndicator: React.FC<Props> = (props: Props) => {
  const { redeploymentStatus, deploymentType } = props;
  const { dotColor } = buildStatusContext(redeploymentStatus, deploymentType);
  const style = {
    color: dotColor,
    fontSize: '12px'
  };
  return <i className="fa fa-circle" style={style} />;
};
