import * as aws from 'aws-sdk'
aws.config.update({ region: process.env.REGION || 'us-east-1' })
import layer from './layer'

export default () => {
    return {
        lambda: layer.lambda(aws),
        emit: layer.emit(aws),
        dynamo: layer.dynamo(aws),
        input: layer.input,
        error400: x => ({
            statusCode: 400,
            body: JSON.stringify({ message: x })
        }),
        error500: x => ({
            statusCode: 500,
            body: JSON.stringify({ message: x })
        }),
        httpOut: x => ({
            statusCode: 200,
            body: JSON.stringify(x)
        })
    }
}
