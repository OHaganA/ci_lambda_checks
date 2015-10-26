/*
 * This should probably support all known asset types using a dictionary.
 */
var api               = require('./api.js'),
        getAssetKey = function(awsRegion, resourceType, resourceId) {
        "use strict";
        var assetType;
        switch (resourceType) {
            case "AWS::EC2::Instance":
                assetType = "host";
                break;
            case "AWS::EC2::SecurityGroup":
                assetType = "sg";
                break;
            case "AWS::EC2::Subnet":
                assetType = "subnet";
                break;
            case "AWS::EC2::VPC":
                assetType = "vpc";
                break;
            default:
                assetType = null;
                break;
        }
        if (assetType) {
            return "/aws/" + awsRegion + "/" + assetType +"/" + resourceId;
        } else {
            return null;
        }
    },

    getRegionsInScope = function(token, environmentId, callback) {
        "use strict";
        var query = {
            "asset_types": "region",
            "scope": "true"
        };
        api.getMany(token, 'assets', 'environments', environmentId, query, callback);
    },

    getVpcsInScope = function(token, environmentId, region, callback) {
        "use strict";
        var query = {
            "asset_types": "region,vpc",
            "key": "/aws/" + region,
            "return_types": "vpc",
            "scope": "true"
        };
        api.getMany(token, 'assets', 'environments', environmentId, query, callback);
    };

module.exports = {
    getAssetKey: getAssetKey,
    getRegionsInScope: getRegionsInScope,
    getVpcsInScope: getVpcsInScope
};
