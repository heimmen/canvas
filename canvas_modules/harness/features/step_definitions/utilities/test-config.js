/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

var nconf = require("nconf");

// Should be called first to setup nconf
function initialize() {
	nconf.use("memory");
	nconf.argv();
	nconf.env("__");
	var defaultConfigFile = "./config/app.json";
	nconf.file("default", defaultConfigFile);
}

function getURL() {
	var configHost = nconf.get("host");
	var testHost = (typeof configHost === "undefined") ? "localhost" : configHost;

	var configPort = nconf.get("port:http");
	var testPort = (typeof configPort === "undefined") ? "3001" : configPort;
	return "http://" + testHost + ":" + testPort;
}

function getBaseDir() {
	var configDir = nconf.get("test_base_dir");
	return (typeof configDir === "undefined") ? process.env.PWD : configDir;
}

module.exports = {
	getURL: getURL,
	getBaseDir: getBaseDir,
	initialize: initialize
};
