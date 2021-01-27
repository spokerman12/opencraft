import React from 'react';
import { setupComponentForTesting } from "utils/testing";
import { RedeploymentToolbar } from 'console/components/RedeploymentToolbar';
import {
    OpenEdXInstanceDeploymentStatusDeploymentTypeEnum,
    OpenEdXInstanceDeploymentStatusStatusEnum
} from 'ocim-client';
import { PublishButton } from "./PublishButton"
/**
 * Returns the PublishButton's test props.
 *
 * @param {Object}  component - The root component.
 * @return {Array<String>} The specified props as an array of strings
 */
function getTestProps(publishBtn: Object): Array<String> {
  const disabled = publishBtn.props["disabled"]
  const notificationCount = publishBtn.children[0].props.className === "notificationLayer"
    ? publishBtn.children[0].children[0].children[0]
    : null
  return [disabled, notificationCount]
}

const singleDigitChanges = Array.from('x'.repeat(5))
console.log(singleDigitChanges)
const doubleDigitChanges = Array.from('x'.repeat(15))

it('renders without crashing', () => {
    const tree = setupComponentForTesting(<PublishButton />).toJSON();
    expect(tree).toMatchSnapshot();
});

describe("PublishButton renders as disabled when", function() {
  it('loading, pending changes', () => {
      const publishBtn = setupComponentForTesting(
      <PublishButton
        deployment={{
            status: OpenEdXInstanceDeploymentStatusStatusEnum.Preparing,
            undeployedChanges: singleDigitChanges,
            type: OpenEdXInstanceDeploymentStatusDeploymentTypeEnum.Admin,
        }}
        loading={true}
      />
      ).toJSON();
      expect(getTestProps(publishBtn)).toEqual([true, "5"])
  });

  it('not loading, no pending changes', () => {
    const publishBtn = setupComponentForTesting(
    <PublishButton
      deployment={{
          status: OpenEdXInstanceDeploymentStatusStatusEnum.Preparing,
          undeployedChanges: [],
          type: OpenEdXInstanceDeploymentStatusDeploymentTypeEnum.Admin,
      }}
      loading={false}
    />
    ).toJSON();
    expect(getTestProps(publishBtn)).toEqual([true, null])
  });
});

describe("PublishButton renders as enabled when", function() {
  it('not loading, single-digit pending changes', () => {
    const publishBtn = setupComponentForTesting(
    <PublishButton
      deployment={{
          status: OpenEdXInstanceDeploymentStatusStatusEnum.Healthy,
          undeployedChanges: singleDigitChanges,
          type: OpenEdXInstanceDeploymentStatusDeploymentTypeEnum.Admin,
      }}
      loading={false}
    />
    ).toJSON();
    expect(getTestProps(publishBtn)).toEqual([false, "5"])
  });
  it('not loading, double-digit pending changes', () => {
    const publishBtn = setupComponentForTesting(
    <PublishButton
      deployment={{
          status: OpenEdXInstanceDeploymentStatusStatusEnum.Healthy,
          undeployedChanges: doubleDigitChanges,
          type: OpenEdXInstanceDeploymentStatusDeploymentTypeEnum.Admin,
      }}
      loading={false}
    />
    ).toJSON();
    expect(getTestProps(publishBtn)).toEqual([false, "9+"])
  });
})
