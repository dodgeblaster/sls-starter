export default AWS => async (event, data) => {
    const SNS = new AWS.SNS({
        region: process.env.REGION || 'us-east-1'
    })

    /**
     * SNS.createTopic is only necessary to get the ARN of an already created topic. Alternativly, you 
     * can determine the arn by using:
     *   - aws region
     *   - aws account id
     *
     * Which allow you to skip this additional call  
     */
    const alreadyCreatedTopic = await SNS.createTopic({ Name: event }).promise()

    return SNS.publish({
        Subject: event,
        Message: JSON.stringify(data),
        TopicArn: alreadyCreatedTopic.TopicArn
    }).promise()
}
