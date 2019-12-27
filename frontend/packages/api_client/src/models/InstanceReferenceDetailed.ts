/* tslint:disable */
/* eslint-disable */
/**
 * OpenCraft Instance Manager
 * API for OpenCraft Instance Manager
 *
 * The version of the OpenAPI document: api
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InstanceReferenceDetailed
 */
export interface InstanceReferenceDetailed {
    /**
     * 
     * @type {number}
     * @memberof InstanceReferenceDetailed
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof InstanceReferenceDetailed
     */
    readonly apiUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof InstanceReferenceDetailed
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof InstanceReferenceDetailed
     */
    readonly created?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InstanceReferenceDetailed
     */
    readonly modified?: Date;
    /**
     * When this Instance is no longer needed, it is shut down and marked as archived. Archived instances do not appear in the list of instances, but their data, logs, and settings are preserved (including e.g. all MySQL and MongoDB data).<br/><strong>Note: You currently cannot archive an instance from the admin panel. You can however un-archive an instance that was already archived.</strong>
     * @type {boolean}
     * @memberof InstanceReferenceDetailed
     */
    isArchived?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InstanceReferenceDetailed
     */
    readonly logsUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof InstanceReferenceDetailed
     */
    readonly appserversFullListUrl?: string;
}

export function InstanceReferenceDetailedFromJSON(json: any): InstanceReferenceDetailed {
    return InstanceReferenceDetailedFromJSONTyped(json, false);
}

export function InstanceReferenceDetailedFromJSONTyped(json: any, ignoreDiscriminator: boolean): InstanceReferenceDetailed {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'apiUrl': !exists(json, 'api_url') ? undefined : json['api_url'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'created': !exists(json, 'created') ? undefined : (new Date(json['created'])),
        'modified': !exists(json, 'modified') ? undefined : (new Date(json['modified'])),
        'isArchived': !exists(json, 'is_archived') ? undefined : json['is_archived'],
        'logsUrl': !exists(json, 'logs_url') ? undefined : json['logs_url'],
        'appserversFullListUrl': !exists(json, 'appservers_full_list_url') ? undefined : json['appservers_full_list_url'],
    };
}

export function InstanceReferenceDetailedToJSON(value?: InstanceReferenceDetailed | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'is_archived': value.isArchived,
    };
}


