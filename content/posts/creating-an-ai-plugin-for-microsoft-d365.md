---
title: Creating an AI Plugin for Microsoft D365
date: 2023-05-29T07:16:44
slug: creating-an-ai-plugin-for-microsoft-d365
categories: ["development"]
tags: ["azure", "customer engagement", "dynamics 365", "en", "software development"]
---
This guide provides an overview of how to create an AI plugin for Microsoft Dynamics 365 and Azure, following the same standard as OpenAI's ChatGPT plugins. This plugin enables users to interact with your product's APIs through Copilot, access a knowledge base, and perform actions on behalf of the user.

## Pre-requisites

To create the plugin, your API's domain must contain a folder named `.well-known`. For example, `contoso.com/.well-known/`. Without this folder, you cannot install the plugin.

## Components of the Plugin

There are two essential components required to create a plugin:

- `ai-plugin.json`

- OpenAPI specification

These components are stored in the `.well-known` folder of your domain.

### Creating `ai-plugin.json`

The `ai-plugin.json` file contains basic information about the plugin and the APIs you expose to Copilot. It should look something like this:

```
{
  "schema_version": "v1",
  "name_for_human": "Contoso Dynamics 365 CE Stats",
  "name_for_model": "contosoD365CEStats",
  "description_for_human": "Get current and historical stats for Contoso Dynamics 365 CE entities.",
  "description_for_model": "Retrieve and display current and historical stats for Contoso Dynamics 365 CE entities in markdown tables.",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "openapi",
    "url": "contoso.com/.well-known/openapi.yaml",
    "is_user_authenticated": false
  },
  "logo_url": "contoso.com/.well-known/logo.png",
  "contact_email": "support@contoso.com",
  "legal_info_url": "https://contoso.com/legal"
}

```
The `description_for_model` attribute instructs the model on how to use your plugin. Use natural language in a concise yet descriptive and objective tone to detail what your plugin does and how the model should use it properly.

### Creating OpenAPI Specification

The OpenAPI specification documents your API and dictates what the model in ChatGPT knows about your API. You can choose which endpoints to expose to the model. The OpenAPI specification is the wrapper that sits on top of your API.

The OpenAPI Specification (OAS) provides a standard, language-agnostic interface to HTTP APIs. It allows both humans and computers to discover and understand the service's capabilities without needing access to source code, documentation, or network traffic inspection. There are several tools available to automatically generate the OAS for your API, such as Swagger. An OpenAPI definition can be used by documentation generation tools, code generation tools, testing tools, and many others.

When a user queries in ChatGPT relevant to the plugin, the model checks the plugin's manifest file for `description_for_model` and checks the descriptions of the endpoints in the OpenAPI specification. Therefore, it is crucial to prepare the OpenAPI specification accurately so that the model can call the API for the correct user queries.

## Final Steps

Once these components are in place, your AI plugin for Microsoft Dynamics 365 and Azure will be ready for use. Users can now interact with your product's APIs via the plugin, access a knowledge base, and perform actions on their behalf.
