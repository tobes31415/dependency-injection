



Context for resolving dependencies

## Hierarchy

* **DIContext**

## Index

### Methods

* [resolve](dicontext.md#resolve)
* [useClass](dicontext.md#useclass)
* [useFactory](dicontext.md#usefactory)
* [useObject](dicontext.md#useobject)

## Methods

###  resolve

▸ **resolve**(`token`: any): *any*

Defined in di.ts:33

Resolves a token into an instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | any | the token to be looked up  |

**Returns:** *any*

___

###  useClass

▸ **useClass**(`token`: any, `substitute`: any): *void*

Defined in di.ts:46

Overrides the function used to provide the specified token

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | any | The token to register the substitution for |
`substitute` | any | A class that will be resovled instead of the token  |

**Returns:** *void*

___

###  useFactory

▸ **useFactory**(`token`: any, `factory`: function): *void*

Defined in di.ts:39

Overrides the function used to provide the specified token

**Parameters:**

▪ **token**: *any*

The token to register the substitution for

▪ **factory**: *function*

A function that will be invoked when resolving the token

▸ (): *any*

**Returns:** *void*

___

###  useObject

▸ **useObject**(`token`: any, `substitute`: any): *void*

Defined in di.ts:53

Overrides the function used to provide the specified token

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`token` | any | The token to register the substitution for |
`substitute` | any | This specific object will be used without changes or being invoked  |

**Returns:** *void*
