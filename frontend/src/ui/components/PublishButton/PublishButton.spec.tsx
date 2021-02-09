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

const singleDigitChanges = Array.from('x'.repeat(5)).length
const doubleDigitChanges = Array.from('x'.repeat(15)).length

it('renders without crashing', () => {
    const tree = setupComponentForTesting(<PublishButton />).toJSON();
    expect(tree).toMatchSnapshot();
});

describe("PublishButton renders as disabled when", function() {
  it('pending changes', () => {
      const publishBtn = setupComponentForTesting(
      <PublishButton
        undeployedChanges={singleDigitChanges}
        deploymentDisabled={true}
      />
      ).toJSON();
      expect(getTestProps(publishBtn)).toEqual([true, "5"])
  });

  it('no pending changes', () => {
    const publishBtn = setupComponentForTesting(
    <PublishButton
    undeployedChanges={[].length}
    deploymentDisabled={true}
    />
    ).toJSON();
    expect(getTestProps(publishBtn)).toEqual([true, null])
  });
});

describe("PublishButton renders as enabled when", function() {
  it('single-digit pending changes', () => {
    const publishBtn = setupComponentForTesting(
    <PublishButton
      undeployedChanges={singleDigitChanges}
      deploymentDisabled={false}
    />
    ).toJSON();
    expect(getTestProps(publishBtn)).toEqual([false, "5"])
  });
  it('double-digit pending changes', () => {
    const publishBtn = setupComponentForTesting(
    <PublishButton
      undeployedChanges={doubleDigitChanges}
      deploymentDisabled={false}
    />
    ).toJSON();
    expect(getTestProps(publishBtn)).toEqual([false, "9+"])
  });
})
