const db = (AWS, test) => async (method, params) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: process.env.REGION || 'us-east-1'
    })

    try {
        const x = await dynamoDb[method](params).promise()
        return {
            state: 'success',
            data: x
        }
    } catch (e) {
        return {
            state: 'error',
            data: e
        }
    }
}

const dynamoService = db => table => ({
    get: async keys => {
        const params = {
            TableName: table,
            Key: keys
        }

        const x = await db('get', params)
        return x.data.Item || false
    },

    put: async data => {
        const params = {
            TableName: table,
            Item: data
        }

        const x = await db('put', params)
        return x.data
    },

    querySkBeginsWith: async keys => {
        const params2 = {
            TableName: table,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': keys.PK,
                ':sk': keys.SK
            }
        }

        const x = await db('query', params2)
        return x.data.Items
    },

    querySkAbove: async keys => {
        const params = {
            TableName: table,
            KeyConditionExpression: 'PK = :pk AND SK >= :sk',
            ExpressionAttributeValues: {
                ':pk': keys.PK,
                ':sk': keys.SK
            }
        }

        const x = await db('query', params)
        return x.data.Items
    },

    queryOnGSI1: async x => {
        const params = {
            TableName: table,
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1 = :gsi',
            ExpressionAttributeValues: {
                ':gsi': x
            }
        }

        const x = await db('query', params)
        return x.data.Items
    },

    queryOnGSI1AndSk: async x => {
        const params = {
            TableName: table,
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1 = :gsi AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':gsi': x.GSI1,
                ':sk': x.SK
            }
        }

        const x = await db('query', params)
        return x.data.Items
    },

    queryOnGSI2: async x => {
        const params = {
            TableName: table,
            IndexName: 'GSI2',
            KeyConditionExpression: 'GSI2 = :org_id',
            ExpressionAttributeValues: {
                ':org_id': x
            }
        }

        const x = await db('query', params)
        return x.data.Items
    },

    remove: async keys => {
        const params = {
            TableName: table,
            Key: keys,
            ReturnValues: 'ALL_OLD'
        }

        const x = await db('delete', params)
        return x.data
    }
})

export default (AWS, test = false) => dynamoService(db(AWS, test))

